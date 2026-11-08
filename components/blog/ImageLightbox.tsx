'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { track } from '@/lib/analytics';

type Item = { src: string; alt: string };
type Props = { selector: string };

/**
 * Click (or tap, or press Enter on) any article image to view it full screen.
 * Arrow keys or swipe move between images; Esc, the close button, a tap on the
 * backdrop or a swipe down closes it. Pinch-zoom still works on phones.
 */
export default function ImageLightbox({ selector }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number; t: number } | null>(null);

  // Make every matching image openable, by mouse, touch and keyboard.
  useEffect(() => {
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>(selector));

    const cleanups = imgs.map((img, i) => {
      img.classList.add('is-zoomable');
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', img.alt ? `View larger: ${img.alt}` : 'View larger image');
      const open = () => {
        returnFocus.current = img;
        setItems(imgs.map(el => ({ src: el.currentSrc || el.src, alt: el.alt })));
        setIndex(i);
        track('image_open');
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      };
      img.addEventListener('click', open);
      img.addEventListener('keydown', onKey);
      return () => {
        img.removeEventListener('click', open);
        img.removeEventListener('keydown', onKey);
      };
    });
    return () => cleanups.forEach(fn => fn());
  }, [selector]);

  const open = index !== null;
  const count = items.length;

  const close = useCallback(() => {
    setIndex(null);
    returnFocus.current?.focus({ preventScroll: true });
  }, []);
  const go = useCallback((step: number) => {
    setIndex(i => (i === null ? i : (i + step + count) % count));
  }, [count]);

  // While open: lock page scroll, handle keys, focus the close button.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        // Keep focus inside the viewer.
        const nodes = Array.from(document.querySelectorAll<HTMLElement>('.lightbox button'));
        if (nodes.length === 0) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close, go]);

  // Preload the neighbours so arrowing through feels instant.
  useEffect(() => {
    if (index === null || count < 2) return;
    [index + 1, index - 1].forEach(i => { new Image().src = items[(i + count) % count].src; });
  }, [index, items, count]);

  if (!open || typeof document === 'undefined') return null;
  const item = items[index];
  if (!item) return null;

  const zoomed = () => (window.visualViewport?.scale ?? 1) > 1.01;

  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = e.touches.length === 1 && !zoomed()
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() }
      : null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start || zoomed()) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Date.now() - start.t > 600) return;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
    else if (dy > 80 && Math.abs(dy) > Math.abs(dx) * 1.5) close();
  };

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt || 'Image viewer'}
      onClick={e => { if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('lightbox__stage')) close(); }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox__bar">
        {count > 1 && <span className="lightbox__count" aria-live="polite">{index + 1} / {count}</span>}
        <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={close} aria-label="Close image">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div className="lightbox__stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={item.src} className="lightbox__img" src={item.src} alt={item.alt} decoding="async" />
      </div>

      {item.alt && <p className="lightbox__caption">{item.alt}</p>}

      {count > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Previous image">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Next image">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}
