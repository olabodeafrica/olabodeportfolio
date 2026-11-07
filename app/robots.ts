import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

// Open to search engines AND AI assistants: being quotable by ChatGPT, Claude, Perplexity and
// Gemini is the point (GEO). Only private areas are blocked.
const PRIVATE = ['/admin', '/api/'];

const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot', 'meta-externalagent',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: PRIVATE },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
