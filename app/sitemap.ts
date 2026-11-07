import type { MetadataRoute } from 'next';
import { CASE_STUDIES } from '@/data/caseStudies';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { abs } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts.reduce<string | undefined>((max, p) => {
    const d = p.updated ?? p.date;
    return !max || d > max ? d : max;
  }, undefined);

  return [
    { url: abs('/'), lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    { url: abs('/blog'), lastModified: latest, changeFrequency: 'weekly', priority: 0.9 },
    ...posts.map(p => ({
      url: abs(`/blog/${p.slug}`),
      lastModified: p.updated ?? p.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [abs(`/blog/${p.slug}/opengraph-image`), ...(p.cover ? [abs(p.cover)] : [])],
    })),
    // Only topics with real depth; single-post tag pages are noindex (see the tag page).
    ...getAllTags()
      .filter(t => t.count >= 2)
      .map(t => ({ url: abs(`/blog/tag/${t.slug}`), changeFrequency: 'weekly' as const, priority: 0.5 })),
    ...CASE_STUDIES.map(cs => ({
      url: abs(`/work/${cs.slug}`),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
      images: [abs(`/work/${cs.slug}/opengraph-image`)],
    })),
  ];
}
