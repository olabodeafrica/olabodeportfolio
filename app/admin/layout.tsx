import type { Metadata } from 'next';

// Admin pages: never indexed, and opt out of the public "%s — Olabode Ogunfuye" title template.
export const metadata: Metadata = {
  title: { default: 'Admin — Olabode', template: '%s' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
