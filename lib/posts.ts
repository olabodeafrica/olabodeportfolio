import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

// Blog posts live as MDX files in content/blog/<slug>.mdx, with images in public/blog/<slug>/.
const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  tags: string[];
  cover?: string;
  readingTime: string;
  /** Optional question shown above the comment form. */
  discussionPrompt?: string;
};

export type Post = PostMeta & { content: string };

export type TocItem = { id: string; text: string };

function estimateReadingTime(content: string): string {
  const words = content.replace(/!\[[^\]]*\]\([^)]*\)/g, '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 230))} min read`;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
    .filter(slug => SLUG_RE.test(slug));
}

export function getPost(slug: string): Post | null {
  if (!SLUG_RE.test(slug)) return null;
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return {
    slug,
    content,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    // Unquoted YAML dates arrive as Date objects; normalise to yyyy-mm-dd.
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ''),
    author: String(data.author ?? 'Olabode Ogunfuye'),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover ? String(data.cover) : undefined,
    readingTime: data.readingTime ? String(data.readingTime) : estimateReadingTime(content),
    discussionPrompt: data.discussionPrompt ? String(data.discussionPrompt) : undefined,
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map(slug => getPost(slug))
    .filter((p): p is Post => p !== null)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatPostDate(date: string, month: 'long' | 'short' = 'long'): string {
  const d = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month, year: 'numeric', timeZone: 'UTC' });
}

/** Same slug rules for the table of contents and the rendered <h2 id>. */
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
