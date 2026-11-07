'use server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { AUTHOR_NAME, LIMITS, commentsDb, type CommentStatus } from '@/lib/comments';

type Result = { ok: true } | { ok: false; error: string };

// Server Functions are reachable by direct POST, so every action re-checks the admin session.
async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  return user;
}

const UUID_RE = /^[0-9a-f-]{36}$/i;

export async function setCommentStatus(id: string, status: CommentStatus): Promise<Result> {
  await requireAdmin();
  if (!UUID_RE.test(id) || !['published', 'pending', 'hidden'].includes(status)) {
    return { ok: false, error: 'Invalid request.' };
  }
  const { error } = await commentsDb().from('blog_comments').update({ status }).eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/dashboard/comments');
  return { ok: true };
}

export async function deleteComment(id: string): Promise<Result> {
  await requireAdmin();
  if (!UUID_RE.test(id)) return { ok: false, error: 'Invalid request.' };
  // Replies are removed with their parent (ON DELETE CASCADE).
  const { error } = await commentsDb().from('blog_comments').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/dashboard/comments');
  return { ok: true };
}

export async function replyAsAuthor(parentId: string, body: string): Promise<Result> {
  const user = await requireAdmin();
  const text = body.trim();
  if (!UUID_RE.test(parentId)) return { ok: false, error: 'Invalid request.' };
  if (text.length < LIMITS.minBody || text.length > LIMITS.body) {
    return { ok: false, error: `Replies must be ${LIMITS.minBody}–${LIMITS.body} characters.` };
  }

  const db = commentsDb();
  const { data: parent, error: parentError } = await db
    .from('blog_comments').select('id, parent_id, post_slug').eq('id', parentId).maybeSingle();
  if (parentError || !parent) return { ok: false, error: 'Comment not found.' };

  const { error } = await db.from('blog_comments').insert({
    post_slug: parent.post_slug,
    parent_id: parent.parent_id ?? parent.id, // keep threads one level deep
    author_name: AUTHOR_NAME,
    author_email: user.email ?? null,
    body: text,
    is_author: true,
    status: 'published',
  });
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/dashboard/comments');
  return { ok: true };
}
