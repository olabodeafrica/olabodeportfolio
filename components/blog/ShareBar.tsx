'use client';
import { useEffect, useState } from 'react';

type Props = { url: string; title: string; via?: string; showComments?: boolean };

const enc = encodeURIComponent;

export function shareLinks(url: string, title: string, via?: string) {
  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    x: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}${via ? `&via=${enc(via)}` : ''}`,
    whatsapp: `https://wa.me/?text=${enc(`${title} ${url}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    email: `mailto:?subject=${enc(title)}&body=${enc(`I thought you'd find this interesting:\n\n${title}\n${url}`)}`,
  };
}

export const Icon = {
  linkedin: (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
      <path d="M9.2 8.6c.3-.4.7-.4.9 0l.6 1.3c.1.3 0 .6-.2.8l-.4.4c.5 1.1 1.4 2 2.5 2.5l.4-.4c.2-.2.5-.3.8-.2l1.3.6c.4.2.4.6 0 .9l-.6.6c-.5.5-1.3.6-1.9.3a8.4 8.4 0 0 1-4.2-4.2c-.3-.6-.2-1.4.3-1.9z" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
      <path d="M13.5 21.9v-7.2h2.4l.4-2.9h-2.8V9.9c0-.8.3-1.4 1.4-1.4h1.5V5.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.6 1.3-3.6 3.7v2.3H8.2v2.9h2.4v7.2A10 10 0 1 1 13.5 21.9z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12M7.5 7.5 12 3l4.5 4.5" />
      <path d="M5 12v6.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V12" />
    </svg>
  ),
  comment: (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-5 4v-4.2A2.5 2.5 0 0 1 4 13.5z" />
    </svg>
  ),
};

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function ShareBar({ url, title, via, showComments = false }: Props) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const links = shareLinks(url, title, via);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function'
      && window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const onCopy = async () => {
    if (await copyText(url)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const onNativeShare = async () => {
    try { await navigator.share({ title, url }); } catch { /* dismissed */ }
  };

  const item = (key: keyof typeof links, label: string) => (
    <a
      className="share-btn"
      href={links[key]}
      target={key === 'email' ? undefined : '_blank'}
      rel="noopener noreferrer"
      aria-label={`Share on ${label}`}
      title={label}
    >
      {Icon[key]}
    </a>
  );

  return (
    <div className="share-bar">
      <span className="share-bar__label">Share</span>
      <div className="share-bar__buttons">
        {canNativeShare && (
          <button type="button" className="share-btn share-btn--wide" onClick={onNativeShare}>
            {Icon.share}<span>Share</span>
          </button>
        )}
        {item('linkedin', 'LinkedIn')}
        {item('x', 'X')}
        {item('whatsapp', 'WhatsApp')}
        {item('facebook', 'Facebook')}
        {item('email', 'Email')}
        <button
          type="button"
          className={`share-btn${copied ? ' is-done' : ''}`}
          onClick={onCopy}
          aria-label={copied ? 'Link copied' : 'Copy link'}
          title={copied ? 'Copied' : 'Copy link'}
        >
          {copied ? Icon.check : Icon.link}
        </button>
        <span className="sr-only" aria-live="polite">{copied ? 'Link copied to clipboard' : ''}</span>
      </div>
      {showComments && (
        <a href="#comments" className="share-bar__comments">
          {Icon.comment}<span>Join the discussion</span>
        </a>
      )}
    </div>
  );
}
