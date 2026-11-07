'use client';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { tag } from '@/lib/analytics';

// Microsoft Clarity: session recordings + heatmaps. Set NEXT_PUBLIC_CLARITY_ID in Vercel
// (Clarity → Settings → Overview → Project ID). Not loaded on admin pages.
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? '';
const VALID_ID = /^[a-z0-9]{6,20}$/i.test(CLARITY_ID);

function pageType(path: string): string {
  if (path === '/') return 'home';
  if (path === '/blog') return 'blog_index';
  if (path.startsWith('/blog/tag/')) return 'topic';
  if (path.startsWith('/blog/')) return 'post';
  if (path.startsWith('/work/')) return 'case_study';
  return 'other';
}

export default function Clarity() {
  const pathname = usePathname() ?? '/';
  const isAdmin = pathname.startsWith('/admin');

  // Tag each page view so recordings and heatmaps can be filtered by page type and slug.
  useEffect(() => {
    if (!VALID_ID || isAdmin) return;
    tag('page_type', pageType(pathname));
    const slug = pathname.match(/^\/(?:blog|work)\/(?!tag\/)([^/]+)/)?.[1];
    if (slug) tag('slug', slug);
  }, [pathname, isAdmin]);

  if (!VALID_ID || isAdmin) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
    </Script>
  );
}
