import type { Metadata } from 'next';
import { DM_Sans, Inter, Playfair_Display, Source_Serif_4 } from 'next/font/google';
import { PERSON, SITE, alternates } from '@/lib/site';
import Clarity from '@/components/Clarity';
import './globals.css';

// Public site: editorial serif for display + long-form copy, geometric sans for UI.
const serif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'], // optical sizing: display cut at large sizes, text cut in body copy
  variable: '--font-serif',
  display: 'swap',
});

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Still used by the admin dashboard (app/admin/dashboard/admin.css).
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s — ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: PERSON.name, url: SITE.url }],
  creator: PERSON.name,
  publisher: PERSON.name,
  keywords: [...PERSON.knowsAbout],
  // RSS autodiscovery only; each public page sets its own canonical via alternates(path).
  alternates: { types: alternates('/').types },
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    // Let Google show large image previews and full-length snippets (Discover, AI Overviews).
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.twitter,
    creator: SITE.twitter,
    title: SITE.title,
    description: SITE.description,
  },
  // Set these in Vercel to verify ownership in Google Search Console / Bing Webmaster Tools.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } } : {}),
  },
};

// Apply the stored theme before first paint so there is no light/dark flash.
const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${serif.variable} ${sans.variable} ${inter.variable} ${playfair.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Clarity />
      </body>
    </html>
  );
}
