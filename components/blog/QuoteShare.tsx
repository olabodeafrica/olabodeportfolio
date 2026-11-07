'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon, copyText } from './ShareBar';

type Props = { url: string; via?: string; containerSelector: string };
type Pos = { top: number; left: number; text: string };

const MIN = 12;
const MAX = 260;
const enc = encodeURIComponent;

/** Select text in the article (desktop) and share it as a quote. */
export default function QuoteShare({ url, via, containerSelector }: Props) {
  const [pos, setPos] = useState<Pos | null>(null);
  const [copied, setCopied] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const hide = useCallback(() => { setPos(null); setCopied(false); }, []);

  useEffect(() => {
    // Touch devices have their own selection menus; don't fight them.
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const onMouseUp = (e: MouseEvent) => {
      if (barRef.current?.contains(e.target as Node)) return;
      // Let the browser finish updating the selection first.
      requestAnimationFrame(() => {
        const sel = window.getSelection();
        const text = sel?.toString().replace(/\s+/g, ' ').trim() ?? '';
        if (!sel || sel.rangeCount === 0 || text.length < MIN) return hide();
        const range = sel.getRangeAt(0);
        if (!container.contains(range.commonAncestorContainer)) return hide();
        const rect = range.getBoundingClientRect();
        setCopied(false);
        setPos({
          top: rect.top + window.scrollY - 8,
          left: rect.left + window.scrollX + rect.width / 2,
          text: text.length > MAX ? `${text.slice(0, MAX - 1).trimEnd()}…` : text,
        });
      });
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') hide(); };
    const onSelectionChange = () => {
      if (!window.getSelection()?.toString().trim()) hide();
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keydown', onKey);
    document.addEventListener('selectionchange', onSelectionChange);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('selectionchange', onSelectionChange);
    };
  }, [containerSelector, hide]);

  if (!pos) return null;

  const quote = `“${pos.text}”`;
  const linkedin = `https://www.linkedin.com/feed/?shareActive=true&text=${enc(`${quote}\n\n${url}`)}`;
  const x = `https://twitter.com/intent/tweet?text=${enc(quote)}&url=${enc(url)}${via ? `&via=${enc(via)}` : ''}`;

  return (
    <div
      ref={barRef}
      className="quote-share"
      style={{ top: pos.top, left: pos.left }}
      role="toolbar"
      aria-label="Share selected quote"
      onMouseDown={e => e.preventDefault() /* keep the selection */}
    >
      <span className="quote-share__label">Share quote</span>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share quote on LinkedIn" title="LinkedIn">
        {Icon.linkedin}
      </a>
      <a href={x} target="_blank" rel="noopener noreferrer" aria-label="Share quote on X" title="X">
        {Icon.x}
      </a>
      <button
        type="button"
        aria-label={copied ? 'Quote copied' : 'Copy quote with link'}
        title={copied ? 'Copied' : 'Copy quote'}
        onClick={async () => { if (await copyText(`${quote}\n\n${url}`)) setCopied(true); }}
      >
        {copied ? Icon.check : Icon.link}
      </button>
    </div>
  );
}
