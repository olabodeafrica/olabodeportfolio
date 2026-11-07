import { NextResponse, type NextRequest } from 'next/server';
import { commentsConfigured as dbConfigured, commentsDb as db } from '@/lib/comments';

// One-click unsubscribe: /api/unsubscribe?token=<uuid>. Include this link in every email you send.
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token') ?? '';
  const done = new URL('/blog?unsubscribed=1', request.url);
  if (!dbConfigured() || !/^[0-9a-f-]{36}$/i.test(token)) return NextResponse.redirect(done);
  await db().from('blog_subscribers')
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq('unsubscribe_token', token)
    .is('unsubscribed_at', null);
  return NextResponse.redirect(done);
}

// RFC 8058 one-click (List-Unsubscribe-Post) support for mail clients.
export const POST = GET;
