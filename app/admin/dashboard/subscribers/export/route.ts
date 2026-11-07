import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { commentsConfigured as dbConfigured, commentsDb as db } from '@/lib/comments';
import { SITE } from '@/lib/site';

// CSV of active subscribers with a per-person unsubscribe link (paste into Resend, Mailchimp, etc.).
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse('Unauthorized', { status: 401 });
  if (!dbConfigured()) return new NextResponse('Not configured', { status: 503 });

  const { data, error } = await db()
    .from('blog_subscribers')
    .select('email, source, created_at, unsubscribe_token')
    .is('unsubscribed_at', null)
    .order('created_at', { ascending: true });
  if (error) return new NextResponse('Could not load subscribers', { status: 500 });

  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = [
    ['email', 'source', 'subscribed_at', 'unsubscribe_url'],
    ...(data ?? []).map(s => [s.email, s.source, s.created_at, `${SITE.url}/api/unsubscribe?token=${s.unsubscribe_token}`]),
  ];
  const csv = rows.map(r => r.map(esc).join(',')).join('\n');
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
