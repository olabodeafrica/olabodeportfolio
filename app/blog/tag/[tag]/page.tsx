import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Subscribe from '@/components/blog/Subscribe';
import { formatPostDate, getAllTags, getPostsByTag } from '@/lib/posts';
import { breadcrumbSchema } from '@/lib/schema';
import { abs, alternates } from '@/lib/site';
import '../../blog.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(t => ({ tag: t.slug }));
}

function findTag(slug: string) {
  return getAllTags().find(t => t.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const t = findTag(tag);
  if (!t) return {};
  const title = `Articles on ${t.tag}`;
  const description = `Articles about ${t.tag.toLowerCase()} by Olabode Ogunfuye: product reviews and analysis of African tech, payments and consumer products.`;
  const path = `/blog/tag/${t.slug}`;
  return {
    title,
    description,
    alternates: alternates(path),
    // Thin single-post tag pages stay out of the index until the topic has depth.
    robots: t.count < 2 ? { index: false, follow: true } : undefined,
    openGraph: { url: path, title, description },
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const t = findTag(tag);
  if (!t) notFound();
  const posts = getPostsByTag(tag);
  const others = getAllTags().filter(x => x.slug !== tag);

  return (
    <>
      <Nav />
      <main className="blog-index container">
        <header className="blog-index__head">
          <nav className="post-crumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/blog">Writing</Link></li>
            </ol>
          </nav>
          <p className="eyebrow">Topic</p>
          <h1 className="blog-index__title">{t.tag}</h1>
          <p className="blog-index__lede">
            {posts.length} article{posts.length === 1 ? '' : 's'} on {t.tag.toLowerCase()}.
          </p>
        </header>

        <section className="post-list" aria-label={`Articles tagged ${t.tag}`}>
          {posts.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="post-row">
              <time className="post-row__date" dateTime={p.date}>{formatPostDate(p.date, 'short')}</time>
              <span className="post-row__title">{p.title}</span>
              <span className="post-row__tag">{p.readingTime}</span>
            </Link>
          ))}
        </section>

        {others.length > 0 && (
          <nav className="tag-cloud" aria-label="Other topics">
            <p className="tag-cloud__label">Other topics</p>
            <ul>
              {others.map(o => (
                <li key={o.slug}><Link href={`/blog/tag/${o.slug}`}>{o.tag} <span>{o.count}</span></Link></li>
              ))}
            </ul>
          </nav>
        )}

        <Subscribe source={`tag:${t.slug}`} />
      </main>
      <Footer />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              url: abs(`/blog/tag/${t.slug}`),
              name: `${t.tag} — writing by Olabode Ogunfuye`,
              hasPart: posts.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: abs(`/blog/${p.slug}`) })),
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Writing', path: '/blog' },
              { name: t.tag, path: `/blog/tag/${t.slug}` },
            ]),
          ],
        }}
      />
    </>
  );
}
