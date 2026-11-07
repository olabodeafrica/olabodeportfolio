import Link from 'next/link';
import { formatPostDate, getAllPosts } from '@/lib/posts';

export default function LatestWriting() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="writing container fade-in">
      <div className="writing__head">
        <div>
          <p className="eyebrow">Writing</p>
          <h2 className="section-head__title">Latest writing</h2>
        </div>
        <Link href="/blog" className="link-arrow">
          All writing <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="writing__list">
        {posts.map(p => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="writing-card">
            {p.cover && (
              <div className="writing-card__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.cover} alt="" loading="lazy" />
              </div>
            )}
            <div className="writing-card__body">
              <p className="writing-card__meta">
                <span>{p.tags[0] ?? 'Writing'}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={p.date}>{formatPostDate(p.date, 'short')}</time>
              </p>
              <h3 className="writing-card__title">{p.title}</h3>
              <p className="writing-card__desc">{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
