// Single source of truth for identity and site-wide SEO. Search engines and AI assistants
// connect "who wrote this" across pages and profiles using these exact values, so keep them
// consistent and update them here only.

export const SITE = {
  url: 'https://www.olabode.africa',
  name: 'Olabode Ogunfuye',
  shortName: 'Olabode',
  locale: 'en_GB',
  language: 'en-GB',
  title: 'Olabode Ogunfuye — Product Leader · Banking, Payments & Agentic AI',
  description:
    '12 years building banking, payments, and government technology across six African markets. OMNI Channel banking, payment rails, KYB infrastructure, and agentic AI workflows.',
  blogTitle: 'Writing — Olabode Ogunfuye',
  blogDescription:
    'Hands-on product reviews and notes on African tech, payments, banking and consumer products, from a product leader building across six African markets.',
  twitter: '@olabode_africa',
} as const;

export const PERSON = {
  name: 'Olabode Ogunfuye',
  jobTitle: 'Product Leader — Banking, Payments & Agentic AI',
  description:
    'Product leader with 12 years building and commercialising banking, payments and government technology across Nigeria, Kenya, Tanzania, Liberia, Sierra Leone and São Tomé and Príncipe.',
  image: '/assets/Hero Image.png',
  email: 'olabode.africa@gmail.com',
  location: { city: 'Lagos', country: 'NG' },
  worksFor: 'Inlaks',
  alumniOf: 'Computer Science (First Class)',
  // Profiles that are the same person. Add GitHub, Medium, Substack etc. as they go live.
  sameAs: [
    'https://www.linkedin.com/in/olabodeafrica/',
    'https://x.com/olabode_africa',
  ],
  // Topics you want to be known (and cited) for. Feeds Person.knowsAbout.
  knowsAbout: [
    'Product management',
    'Omnichannel banking',
    'Digital payments',
    'Payment rails (ACH, RTGS, national switch)',
    'Core banking integration',
    'KYB and RegTech',
    'API product management',
    'Agentic AI workflows',
    'Government revenue collection',
    'Healthtech interoperability (FHIR)',
    'African fintech',
    'Product adoption and change management',
  ],
} as const;

export const abs = (path: string) => new URL(encodeURI(path), SITE.url).toString();

export const RSS_PATH = '/blog/feed.xml';

/** Canonical URL + RSS autodiscovery for a page (child `alternates` replace the parent's, so set both). */
export function alternates(path: string) {
  return {
    canonical: path,
    types: { 'application/rss+xml': [{ url: RSS_PATH, title: SITE.blogTitle }] },
  };
}
