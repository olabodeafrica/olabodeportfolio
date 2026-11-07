'use client';
import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/posts';

// A heading counts as "current" once its top passes this line (px from the viewport top).
// Matches the h2 scroll-margin-top in blog.css, plus a little slack.
const ACTIVE_LINE = 140;

export default function PostToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const headings = items
        .map(item => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);
      if (headings.length === 0) return;

      // At the very bottom, the last section may never reach the line: select it anyway.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(headings[headings.length - 1].id);
        return;
      }

      let current = headings[0].id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= ACTIVE_LINE) current = h.id;
        else break;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  return (
    <nav className="post-toc" aria-label="On this page">
      <p className="post-toc__label">On this page</p>
      <ol>
        {items.map(item => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={isActive ? 'is-active' : undefined}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setActive(item.id)}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
