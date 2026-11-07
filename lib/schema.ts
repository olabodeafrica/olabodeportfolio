// schema.org JSON-LD builders. Structured data is how search engines and AI answer engines
// understand who wrote what, so every page links back to the same Person (@id).
import { PERSON, SITE, abs } from './site';
import type { Post } from './posts';

export const PERSON_ID = `${SITE.url}/#person`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PERSON.name,
    url: SITE.url,
    image: abs(PERSON.image),
    jobTitle: PERSON.jobTitle,
    description: PERSON.description,
    email: `mailto:${PERSON.email}`,
    worksFor: { '@type': 'Organization', name: PERSON.worksFor },
    homeLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: PERSON.location.city, addressCountry: PERSON.location.country },
    },
    knowsAbout: PERSON.knowsAbout,
    sameAs: PERSON.sameAs,
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { '@id': PERSON_ID },
  };
}

export function homeGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      websiteSchema(),
      {
        '@type': 'ProfilePage',
        '@id': `${SITE.url}/#profile`,
        url: SITE.url,
        name: SITE.title,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        inLanguage: SITE.language,
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function postGraph(post: Post, wordCount: number) {
  const url = abs(`/blog/${post.slug}`);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      mainEntityOfPage: url,
      url,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      inLanguage: SITE.language,
      author: { '@id': PERSON_ID, '@type': 'Person', name: post.author, url: SITE.url },
      publisher: { '@id': PERSON_ID },
      isPartOf: { '@type': 'Blog', '@id': `${SITE.url}/blog#blog`, name: SITE.blogTitle, url: abs('/blog') },
      image: [abs(`/blog/${post.slug}/opengraph-image`), ...(post.cover ? [abs(post.cover)] : [])],
      keywords: [...post.tags, ...post.keywords].join(', '),
      articleSection: post.tags[0],
      wordCount,
      ...(post.takeaways.length ? { abstract: post.takeaways.join(' ') } : {}),
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Writing', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    personSchema(),
  ];
  if (post.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: post.faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function caseStudyGraph(cs: { slug: string; title: string; summary: string; tag: string }) {
  const url = abs(`/work/${cs.slug}`);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        url,
        mainEntityOfPage: url,
        headline: cs.title,
        description: cs.summary,
        about: cs.tag,
        inLanguage: SITE.language,
        author: { '@id': PERSON_ID, '@type': 'Person', name: PERSON.name, url: SITE.url },
        publisher: { '@id': PERSON_ID },
        image: abs(`/work/${cs.slug}/opengraph-image`),
      },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/#work' },
        { name: cs.title, path: `/work/${cs.slug}` },
      ]),
    ],
  };
}
