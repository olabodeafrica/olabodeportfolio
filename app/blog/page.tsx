import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { formatPostDate, getAllPosts } from '@/lib/posts';
import './blog.css';

export const metadata: Metadata = {
  title: 'Writing — Olabode Ogunfuye',
  description: 'Product reviews and notes on African tech, payments and consumer products.',
  alternates: { canonical: 'https://www.olabode.africa/blog' },
};

export default function BlogIndex() {
  const [featured, ...rest] = getAllPosts();

  return (
    <>
      <Nav />
      <main className="blog-index container">
        <header className="blog-index__head">
          <p className="eyebrow">Writing</p>
          <h1 className="blog-index__title">Notes on products, payments and African tech.</h1>
          <p className="blog-index__lede">
            Hands-on product reviews, and what I&apos;m learning building banking, payments and AI
            products across African markets.
          </p>
        </header>

        {!featured && <p className="blog-empty">No posts yet.</p>}

        {featured && (
          <Link href={`/blog/${featured.slug}`} className="post-feature">
            {featured.cover && (
              <div className="post-feature__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.cover} alt="" />
              </div>
            )}
            <div className="post-feature__body">
              <p className="post-kicker">
                <span>{featured.tags[0] ?? 'Writing'}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={featured.date}>{formatPostDate(featured.date, 'short')}</time>
              </p>
              <h2 className="post-feature__title">{featured.title}</h2>
              <p className="post-feature__desc">{featured.description}</p>
              <span className="link-arrow">
                Read the article <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <section className="post-list" aria-label="More writing">
            {rest.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="post-row">
                <time className="post-row__date" dateTime={p.date}>{formatPostDate(p.date, 'short')}</time>
                <span className="post-row__title">{p.title}</span>
                <span className="post-row__tag">{p.tags[0]}</span>
              </Link>
            ))}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
