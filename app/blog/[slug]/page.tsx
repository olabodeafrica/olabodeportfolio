import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { mdxComponents } from '@/components/mdx-components';
import PostToc from '@/components/PostToc';
import { formatPostDate, getAllPosts, getPost, getPostSlugs, getToc } from '@/lib/posts';
import '../blog.css';

const SITE = 'https://www.olabode.africa';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE}/blog/${slug}`;
  const images = post.cover ? [`${SITE}${post.cover}`] : undefined;
  return {
    title: `${post.title} — Olabode Ogunfuye`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      siteName: 'Olabode Ogunfuye',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@olabode_africa',
      creator: '@olabode_africa',
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = getToc(post.content);
  const more = getAllPosts().filter(p => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author, url: SITE },
    image: post.cover ? `${SITE}${post.cover}` : undefined,
    mainEntityOfPage: `${SITE}/blog/${slug}`,
  };

  return (
    <>
      <Nav />
      <main className="post">
        <header className="post-head container">
          <Link href="/blog" className="post-back">&larr; Writing</Link>
          <p className="post-kicker">
            <span>{post.tags[0] ?? 'Writing'}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </p>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-standfirst">{post.description}</p>
          <div className="post-byline">
            <span className="post-byline__name">{post.author}</span>
            <span className="post-byline__meta">{post.readingTime}</span>
          </div>
        </header>

        {post.cover && (
          <div className="post-cover container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover} alt="" />
          </div>
        )}

        <div className="post-layout container">
          {toc.length > 1 && <PostToc items={toc} />}

          <article className="prose">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />

            {post.tags.length > 0 && (
              <ul className="post-tags" aria-label="Tags">
                {post.tags.map(t => <li key={t}>{t}</li>)}
              </ul>
            )}
          </article>
        </div>

        {more.length > 0 && (
          <section className="post-more container" aria-label="More writing">
            <h2 className="post-more__title">More writing</h2>
            <div className="post-list">
              {more.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="post-row">
                  <time className="post-row__date" dateTime={p.date}>{formatPostDate(p.date, 'short')}</time>
                  <span className="post-row__title">{p.title}</span>
                  <span className="post-row__tag">{p.tags[0]}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
