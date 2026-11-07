import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Supabase falls back to the Site URL (the home page) when an email link's redirect
  // isn't on its allow-list, leaving ?code=… on "/". Hand that code to the auth callback.
  // The only email links this site sends are admin password resets.
  if (request.nextUrl.pathname === '/' && request.nextUrl.searchParams.has('code')) {
    const callback = new URL('/api/auth/callback', request.url);
    callback.searchParams.set('code', request.nextUrl.searchParams.get('code')!);
    callback.searchParams.set('next', '/admin/reset-password');
    return NextResponse.redirect(callback);
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect all /admin/dashboard routes
  if (request.nextUrl.pathname.startsWith('/admin/dashboard') && !user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Redirect logged-in users away from login page
  if (request.nextUrl.pathname === '/admin' && user) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/admin',
    '/admin/dashboard/:path*',
    // Only home-page requests carrying an auth code; normal visits skip the proxy entirely.
    { source: '/', has: [{ type: 'query', key: 'code' }] },
  ],
};
