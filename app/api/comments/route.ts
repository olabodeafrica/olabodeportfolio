import { NextResponse, type NextRequest } from 'next/server';
import { getPostSlugs } from '@/lib/posts';
import {
  type CommentRow,
  commentsConfigured,
  commentsDb,
  getPublishedComments,
  hashIp,
  toPublic,
  validateComment,
} from '@/lib/comments';

const NO_STORE = { 'Cache-Control': 'no-store' };

// Rate limits per (hashed) IP address.
const BURST = { windowMs: 10 * 60 * 1000, max: 3 };
const DAILY = { windowMs: 24 * 60 * 60 * 1000, max: 20 };

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE });
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug') ?? '';
  if (!getPostSlugs().includes(slug)) return json({ error: 'Unknown article.' }, 404);
  if (!commentsConfigured()) return json({ comments: [], enabled: false });

  try {
    return json({ comments: await getPublishedComments(slug), enabled: true });
  } catch (err) {
    console.error('[comments] load failed', err);
    return json({ comments: [], enabled: false });
  }
}

export async function POST(request: NextRequest) {
  if (!commentsConfigured()) return json({ error: 'Comments are unavailable right now.' }, 503);

  // Only accept posts from this site's own pages.
  let originHost = '';
  try { originHost = new URL(request.headers.get('origin') ?? '').host; } catch {}
  if (!originHost || originHost !== request.nextUrl.host) {
    return json({ error: 'Could not post comment.' }, 403);
  }
  if (Number(request.headers.get('content-length') ?? 0) > 16_000) {
    return json({ error: 'Comment is too long.' }, 413);
  }

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return json({ error: 'Could not read comment.' }, 400);
  }

  const verdict = validateComment(raw, getPostSlugs());
  if (!verdict.ok) return json({ error: verdict.error }, verdict.status ?? 400);
  const { input, status } = verdict;

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  const ipHash = hashIp(ip);
  const db = commentsDb();

  try {
    const now = Date.now();
    const [burst, daily, duplicate] = await Promise.all([
      db.from('blog_comments').select('id', { count: 'exact', head: true })
        .eq('ip_hash', ipHash).gte('created_at', new Date(now - BURST.windowMs).toISOString()),
      db.from('blog_comments').select('id', { count: 'exact', head: true })
        .eq('ip_hash', ipHash).gte('created_at', new Date(now - DAILY.windowMs).toISOString()),
      db.from('blog_comments').select('id', { count: 'exact', head: true })
        .eq('post_slug', input.slug).eq('body', input.body)
        .gte('created_at', new Date(now - DAILY.windowMs).toISOString()),
    ]);
    if ((burst.count ?? 0) >= BURST.max || (daily.count ?? 0) >= DAILY.max) {
      return json({ error: 'You’re commenting a lot — please wait a few minutes.' }, 429);
    }
    if ((duplicate.count ?? 0) > 0) {
      return json({ error: 'This comment has already been posted.' }, 409);
    }

    // Replies are one level deep and must belong to the same article.
    let parentId = input.parentId;
    if (parentId) {
      const { data: parent } = await db.from('blog_comments')
        .select('id, parent_id, post_slug, status').eq('id', parentId).maybeSingle();
      if (!parent || parent.post_slug !== input.slug || parent.status !== 'published') {
        return json({ error: 'The comment you’re replying to is no longer available.' }, 400);
      }
      parentId = parent.parent_id ?? parent.id;
    }

    const { data, error } = await db.from('blog_comments').insert({
      post_slug: input.slug,
      parent_id: parentId,
      author_name: input.name,
      author_email: input.email,
      body: input.body,
      status,
      ip_hash: ipHash,
    }).select('*').single();
    if (error) throw error;

    return json({ comment: toPublic(data as CommentRow), status }, 201);
  } catch (err) {
    console.error('[comments] post failed', err);
    return json({ error: 'Could not post comment. Please try again.' }, 500);
  }
}
