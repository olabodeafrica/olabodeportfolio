import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

// Blog posts live as MDX files in content/blog/<slug>.mdx, with images in public/blog/<slug>/.
// Front matter reference: see README.md → "Writing a post".
const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type Faq = { q: string; a: string };

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  updated?: string; // ISO yyyy-mm-dd, when meaningfully revised
  author: string;
  tags: string[];
  keywords: string[];
  cover?: string;
  readingTime: string;
  /** Optional question shown above the comment form. */
  discussionPrompt?: string;
  /** 2–5 one-sentence answers shown at the top. Answer-first summaries are what AI engines quote. */
  takeaways: string[];
  /** Optional FAQ shown at the end and emitted as FAQPage structured data. */
  faq: Faq[];
  draft: boolean;
};

export type Post = PostMeta & { content: string };

export type TocItem = { id: string; text: string };

const toDate = (v: unknown) =>
  v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v) : '';

const toList = (v: unknown) => (Array.isArray(v) ? v.map(String).filter(Boolean) : []);

function estimateReadingTime(content: string): string {
  return `${Math.max(1, Math.round(countWords(content) / 230))} min read`;
}

/** Words of prose (images, tables syntax and markup stripped). */
export function countWords(content: string): number {
  return content
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[|#>*_`[\]()-]/g, ' ')
    .split(/\s+/)
    .filter(w => /[a-z0-9]/i.test(w)).length;
}

/** Drafts and future-dated posts are visible in `npm run dev` but never in production builds. */
function isPublished(p: PostMeta): boolean {
  if (process.env.NODE_ENV !== 'production') return true;
  if (p.draft) return false;
  const today = new Date().toISOString().slice(0, 10);
  return !p.date || p.date <= today;
}

function readPost(slug: string): Post | null {
  if (!SLUG_RE.test(slug)) return null;
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return {
    slug,
    content,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: toDate(data.date),
    updated: toDate(data.updated) || undefined,
    author: String(data.author ?? 'Olabode Ogunfuye'),
    tags: toList(data.tags),
    keywords: toList(data.keywords),
    cover: data.cover ? String(data.cover) : undefined,
    readingTime: data.readingTime ? String(data.readingTime) : estimateReadingTime(content),
    discussionPrompt: data.discussionPrompt ? String(data.discussionPrompt) : undefined,
    takeaways: toList(data.takeaways),
    faq: Array.isArray(data.faq)
      ? data.faq
          .map((f: Record<string, unknown>) => ({ q: String(f?.q ?? ''), a: String(f?.a ?? '') }))
          .filter((f: Faq) => f.q && f.a)
      : [],
    draft: data.draft === true,
  };
}

function allSlugsOnDisk(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
    .filter(slug => SLUG_RE.test(slug));
}

export function getPost(slug: string): Post | null {
  const post = readPost(slug);
  return post && isPublished(post) ? post : null;
}

export function getPostSlugs(): string[] {
  return allSlugsOnDisk().filter(slug => getPost(slug) !== null);
}

export function getAllPosts(): PostMeta[] {
  return allSlugsOnDisk()
    .map(slug => getPost(slug))
    .filter((p): p is Post => p !== null)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ---------- Tags ----------

export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const map = new Map<string, { tag: string; slug: string; count: number }>();
  for (const p of getAllPosts()) {
    for (const tag of p.tags) {
      const slug = tagSlug(tag);
      const cur = map.get(slug) ?? { tag, slug, count: 0 };
      cur.count += 1;
      map.set(slug, cur);
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(slug: string): PostMeta[] {
  return getAllPosts().filter(p => p.tags.some(t => tagSlug(t) === slug));
}

/** Related posts: most shared tags first, then most recent. */
export function getRelatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  const mine = new Set(post.tags.map(tagSlug));
  return getAllPosts()
    .filter(p => p.slug !== post.slug)
    .map(p => ({ p, score: p.tags.filter(t => mine.has(tagSlug(t))).length }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map(x => x.p);
}

// ---------- Formatting & headings ----------

export function formatPostDate(date: string, month: 'long' | 'short' = 'long'): string {
  const d = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month, year: 'numeric', timeZone: 'UTC' });
}

/** Same slug rules for the table of contents and the rendered heading ids. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[*_`]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function getToc(content: string): TocItem[] {
  return content
    .split('\n')
    .filter(line => /^##\s+/.test(line))
    .map(line => {
      const text = line.replace(/^##\s+/, '').replace(/[*_`]/g, '').trim();
      return { id: slugifyHeading(text), text };
    });
}
