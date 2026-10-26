import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
