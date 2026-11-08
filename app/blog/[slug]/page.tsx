import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { mdxComponents } from '@/components/mdx-components';
import PostToc from '@/components/PostToc';
import ShareBar from '@/components/blog/ShareBar';
import QuoteShare from '@/components/blog/QuoteShare';
import ImageLightbox from '@/components/blog/ImageLightbox';
import Comments from '@/components/blog/Comments';
import AuthorBox from '@/components/blog/AuthorBox';
import Subscribe from '@/components/blog/Subscribe';
import {
  countWords, formatPostDate, getPost, getPostSlugs, getRelatedPosts, getToc, slugifyHeading, tagSlug,
} from '@/lib/posts';
import { postGraph } from '@/lib/schema';
import { SITE, abs, alternates } from '@/lib/site';
import '../blog.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${slug}`;
  // The share image comes from ./opengraph-image.tsx (a branded title card).
  return {
    title: post.title,
    description: post.description,
    keywords: [...post.tags, ...post.keywords],
    authors: [{ name: post.author, url: SITE.url }],
    alternates: alternates(path),
    openGraph: {
      type: 'article',
      url: path,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [SITE.url],
      section: post.tags[0],
      tags: post.tags,
    },
    twitter: { title: post.title, description: post.description },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = [...getToc(post.content), ...(post.faq.length ? [{ id: 'faq', text: 'FAQ' }] : [])];
  const url = abs(`/blog/${slug}`);
  const related = getRelatedPosts(post, 3);
  const updated = post.updated && post.updated !== post.date ? post.updated : undefined;

  return (
    <>
      <Nav />
      <main className="post">
        <header className="post-head container">
          <nav className="post-crumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/blog">Writing</Link></li>
              {post.tags[0] && (
                <li><Link href={`/blog/tag/${tagSlug(post.tags[0])}`}>{post.tags[0]}</Link></li>
              )}
            </ol>
          </nav>
          <p className="post-kicker">
            <span>{post.tags[0] ?? 'Writing'}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {updated && (
              <>
                <span aria-hidden="true">·</span>
                <span className="post-kicker__updated">
                  Updated <time dateTime={updated}>{formatPostDate(updated)}</time>
                </span>
              </>
            )}
          </p>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-standfirst">{post.description}</p>
          <div className="post-byline">
            <Link href="/#about" className="post-byline__name" rel="author">{post.author}</Link>
            <span className="post-byline__meta">{post.readingTime}</span>
          </div>
          <ShareBar url={url} title={post.title} via={SITE.twitter.slice(1)} showComments />
        </header>

        {post.cover && (
          <div className="post-cover container">
            {/* The cover is the LCP element: load it eagerly at high priority. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover} alt="" width={894} height={521} fetchPriority="high" decoding="async" />
          </div>
        )}

        <div className="post-layout container">
          {toc.length > 1 && <PostToc items={toc} />}

          <div className="post-main">
            <article className="prose">
              {post.takeaways.length > 0 && (
                <aside className="post-takeaways" aria-labelledby="takeaways-title">
                  <p id="takeaways-title" className="post-takeaways__title">Key takeaways</p>
                  <ul>
                    {post.takeaways.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </aside>
              )}

              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />

              {post.faq.length > 0 && (
                <section className="post-faq" aria-labelledby="faq">
                  <h2 id="faq">Frequently asked questions</h2>
                  {post.faq.map(f => (
                    <details key={f.q} id={`faq-${slugifyHeading(f.q)}`} className="post-faq__item">
                      <summary>{f.q}</summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </section>
              )}

              {post.tags.length > 0 && (
                <ul className="post-tags" aria-label="Topics">
                  {post.tags.map(t => (
                    <li key={t}><Link href={`/blog/tag/${tagSlug(t)}`}>{t}</Link></li>
                  ))}
                </ul>
              )}

              <AuthorBox />

              <div className="post-share-end">
                <p className="post-share-end__text">Found this useful? Share it with someone who&apos;d enjoy it.</p>
                <ShareBar url={url} title={post.title} via={SITE.twitter.slice(1)} />
              </div>
            </article>

            <Subscribe source={`post:${slug}`} />

            <Comments slug={slug} prompt={post.discussionPrompt} />
          </div>
        </div>
        <QuoteShare url={url} via={SITE.twitter.slice(1)} containerSelector=".post-main .prose" />
        <ImageLightbox selector=".post-cover img, .post-main .prose .post-figure img" />

        {related.length > 0 && (
          <section className="post-more container" aria-labelledby="related-title">
            <h2 id="related-title" className="post-more__title">Keep reading</h2>
            <div className="post-list">
              {related.map(p => (
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
      <JsonLd data={postGraph(post, countWords(post.content))} />
    </>
  );
}
