// Server-only: blog comment storage and spam checks. Never import from a client component —
// it uses the Supabase service-role key.
import { createHmac } from 'node:crypto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type CommentStatus = 'published' | 'pending' | 'hidden';

export type CommentRow = {
  id: string;
  post_slug: string;
  parent_id: string | null;
  author_name: string;
  author_email: string | null;
  body: string;
  is_author: boolean;
  status: CommentStatus;
  ip_hash: string | null;
  created_at: string;
};

/** The shape sent to browsers: no email, no IP hash. */
export type PublicComment = {
  id: string;
  parentId: string | null;
  name: string;
  body: string;
  isAuthor: boolean;
  createdAt: string;
};

export const AUTHOR_NAME = 'Olabode Ogunfuye';
export const LIMITS = { name: 80, email: 254, body: 3000, minBody: 2 } as const;

const TABLE = 'blog_comments';

export function commentsConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// Untyped on purpose: lib/supabase/types.ts doesn't describe this table.
export function commentsDb(): SupabaseClient {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function toPublic(c: CommentRow): PublicComment {
  return {
    id: c.id,
    parentId: c.parent_id,
    name: c.author_name,
    body: c.body,
    isAuthor: c.is_author,
    createdAt: c.created_at,
  };
}

export async function getPublishedComments(slug: string): Promise<PublicComment[]> {
  const { data, error } = await commentsDb()
    .from(TABLE)
    .select('*')
    .eq('post_slug', slug)
    .eq('status', 'published')
    .order('created_at', { ascending: true })
    .limit(500);
  if (error) throw error;
  return (data as CommentRow[]).map(toPublic);
}

/** Keyed hash of the client IP: lets us rate-limit without storing the address. */
export function hashIp(ip: string): string {
  const secret = process.env.COMMENT_IP_SALT || process.env.SUPABASE_SERVICE_ROLE_KEY || 'comments';
  return createHmac('sha256', secret).update(ip).digest('hex').slice(0, 32);
}

// ---------- Validation & spam heuristics ----------

const URL_RE = /(https?:\/\/|www\.)\S+/gi; // global: for counting links
const HAS_URL = /(https?:\/\/|www\.)\S+/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Phrases that are almost always spam on a personal blog. Matches are held for review, not rejected.
const SPAM_WORDS = [
  'casino', 'viagra', 'cialis', 'loan offer', 'crypto recovery', 'recover your funds',
  'forex signal', 'binary option', 'seo service', 'backlinks', 'escort', 'porn',
  'whatsapp me on', 'telegram me', 'hack your', 'spell caster',
];

export type CommentInput = {
  slug: string;
  parentId: string | null;
  name: string;
  email: string | null;
  body: string;
};

export type Verdict =
  | { ok: true; status: 'published' | 'pending'; input: CommentInput }
  | { ok: false; error: string; status?: number };

const clean = (s: unknown, max: number) =>
  typeof s === 'string' ? s.replace(/\u0000/g, '').trim().slice(0, max + 1) : '';

export function validateComment(raw: Record<string, unknown>, knownSlugs: string[]): Verdict {
  // Honeypot: a field real people never see or fill in.
  if (clean(raw.website, 200)) return { ok: false, error: 'Could not post comment.' };

  // Bots submit instantly; people take at least a few seconds to write.
  const elapsed = Number(raw.elapsedMs);
  if (!Number.isFinite(elapsed) || elapsed < 3000) {
    return { ok: false, error: 'That was quick — please take a moment and try again.' };
  }

  const slug = clean(raw.slug, 120);
  if (!knownSlugs.includes(slug)) return { ok: false, error: 'Unknown article.', status: 404 };

  const name = clean(raw.name, LIMITS.name).replace(/\s+/g, ' ');
  const emailRaw = clean(raw.email, LIMITS.email).toLowerCase();
  const body = clean(raw.body, LIMITS.body).replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n');
  const parentId = clean(raw.parentId, 64) || null;

  if (!name) return { ok: false, error: 'Please add your name.' };
  if (name.length > LIMITS.name) return { ok: false, error: 'Name is too long.' };
  if (HAS_URL.test(name) || /[<>]/.test(name)) return { ok: false, error: 'Please use a plain name.' };
  if (emailRaw && !EMAIL_RE.test(emailRaw)) return { ok: false, error: 'That email address doesn’t look right.' };
  if (body.length < LIMITS.minBody) return { ok: false, error: 'Please write a comment.' };
  if (body.length > LIMITS.body) return { ok: false, error: `Comments are limited to ${LIMITS.body} characters.` };
  if (parentId && !/^[0-9a-f-]{36}$/i.test(parentId)) return { ok: false, error: 'Invalid reply.' };

  const links = (body.match(URL_RE) ?? []).length;
  const lower = body.toLowerCase();
  const letters = body.replace(/[^a-z]/gi, '');
  const shouting = letters.length > 40 && letters.replace(/[^A-Z]/g, '').length / letters.length > 0.7;
  const suspicious = links > 2 || SPAM_WORDS.some(w => lower.includes(w)) || shouting;

  return {
    ok: true,
    status: suspicious ? 'pending' : 'published',
    input: { slug, parentId, name, email: emailRaw || null, body },
  };
}
