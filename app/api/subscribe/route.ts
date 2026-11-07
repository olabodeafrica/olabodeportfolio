import { NextResponse, type NextRequest } from 'next/server';
import { commentsConfigured as dbConfigured, commentsDb as db, hashIp } from '@/lib/comments';

const NO_STORE = { 'Cache-Control': 'no-store' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: NO_STORE });

export async function POST(request: NextRequest) {
  if (!dbConfigured()) return json({ error: 'Subscriptions are unavailable right now.' }, 503);

  let originHost = '';
  try { originHost = new URL(request.headers.get('origin') ?? '').host; } catch {}
  if (!originHost || originHost !== request.nextUrl.host) return json({ error: 'Could not subscribe.' }, 403);

  let raw: Record<string, unknown>;
  try { raw = await request.json(); } catch { return json({ error: 'Could not read request.' }, 400); }

  // Honeypot + time trap, as for comments.
  if (typeof raw.website === 'string' && raw.website.trim()) return json({ ok: true }); // silently drop bots
  if (!(Number(raw.elapsedMs) >= 1500)) return json({ error: 'Please try again.' }, 400);

  const email = String(raw.email ?? '').trim().toLowerCase().slice(0, 254);
  if (!EMAIL_RE.test(email)) return json({ error: 'Please enter a valid email address.' }, 400);
  const source = String(raw.source ?? '').replace(/[^a-z0-9:/_-]/gi, '').slice(0, 120) || null;

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const ipHash = hashIp(ip);
  const client = db();

  try {
    const { count } = await client.from('blog_subscribers').select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash).gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString());
    if ((count ?? 0) >= 5) return json({ error: 'Too many attempts — please try again later.' }, 429);

    // Upsert so re-subscribing works and existing subscribers get the same friendly response
    // (never reveal whether an email was already on the list).
    const { error } = await client.from('blog_subscribers').upsert(
      { email, source, ip_hash: ipHash, unsubscribed_at: null },
      { onConflict: 'email' },
    );
    if (error) throw error;
    return json({ ok: true }, 201);
  } catch (err) {
    console.error('[subscribe] failed', err);
    return json({ error: 'Could not subscribe. Please try again.' }, 500);
  }
}
