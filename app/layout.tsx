import type { Metadata } from 'next';
import { DM_Sans, Inter, Playfair_Display, Source_Serif_4 } from 'next/font/google';
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
  metadataBase: new URL('https://www.olabode.africa'),
  title: 'Olabode Ogunfuye — Product Leader · Banking, Payments & Agentic AI',
  description:
    '12 years building banking, payments, and government technology across six African markets. OMNI Channel banking, payment rails, KYB infrastructure, and agentic AI workflows.',
  openGraph: {
    title: 'Olabode Ogunfuye — Product Leader · Banking, Payments & Agentic AI',
    description:
      '12 years building banking, payments, and government technology across six African markets.',
    url: 'https://www.olabode.africa',
    siteName: 'Olabode Ogunfuye',
    type: 'website',
  },
};

// Apply the stored theme before first paint so there is no light/dark flash.
const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${inter.variable} ${playfair.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
