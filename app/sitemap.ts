import type { MetadataRoute } from 'next';
import { CASE_STUDIES } from '@/data/caseStudies';
import { getAllPosts } from '@/lib/posts';

const SITE = 'https://www.olabode.africa';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    ...getAllPosts().map(p => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...CASE_STUDIES.map(cs => ({
      url: `${SITE}/work/${cs.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
