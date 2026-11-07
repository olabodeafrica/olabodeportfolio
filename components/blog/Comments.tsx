'use client';
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { track } from '@/lib/analytics';

type Comment = {
  id: string;
  parentId: string | null;
  name: string;
  body: string;
  isAuthor: boolean;
  createdAt: string;
};

type Props = { slug: string; prompt?: string };

const MAX_BODY = 3000;
const STORE_KEY = 'comment-author';

function timeAgo(iso: string): string {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60],
  ];
  for (const [unit, secs] of steps) {
    if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
  }
  return 'just now';
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]?.toUpperCase()).join('') || '?';
}

// Deterministic, muted avatar tint per name.
const TINTS = ['#e3dacc', '#bcd1ca', '#cbcadb', '#ebdbbc', '#c2cfdb', '#e8d5c4', '#c5cdb8'];
function tint(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TINTS[h % TINTS.length];
}

function loadAuthor(): { name: string; email: string } {
  try {
    const v = JSON.parse(localStorage.getItem(STORE_KEY) ?? '{}');
    return { name: String(v.name ?? ''), email: String(v.email ?? '') };
  } catch {
    return { name: '', email: '' };
  }
}

function CommentForm({
  slug, parentId, onPosted, onCancel, autoFocus = false,
}: {
  slug: string;
  parentId?: string;
  onPosted: (c: Comment, held: boolean) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const mountedAt = useRef(Date.now());
  const idBase = parentId ? `reply-${parentId}` : 'comment';

  useEffect(() => {
    const a = loadAuthor();
    setName(a.name);
    setEmail(a.email);
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug, parentId: parentId ?? null, name, email, body, website,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? 'Could not post comment. Please try again.');
        return;
      }
      try { localStorage.setItem(STORE_KEY, JSON.stringify({ name, email })); } catch {}
      setBody('');
      track(parentId ? 'comment_reply' : 'comment_posted');
      onPosted(data.comment as Comment, data.status === 'pending');
    } catch {
      setError('Network error — please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className={`comment-form${parentId ? ' comment-form--reply' : ''}`} onSubmit={submit} noValidate>
      <label htmlFor={`${idBase}-body`} className="sr-only">{parentId ? 'Your reply' : 'Your comment'}</label>
      <textarea
        id={`${idBase}-body`}
        className="comment-form__body"
        placeholder={parentId ? 'Write a reply…' : 'Share your thoughts…'}
        value={body}
        onChange={e => setBody(e.target.value)}
        maxLength={MAX_BODY}
        rows={parentId ? 3 : 4}
        required
        autoFocus={autoFocus}
      />
      <div className="comment-form__row">
        <div className="comment-form__field">
          <label htmlFor={`${idBase}-name`}>Name</label>
          <input
            id={`${idBase}-name`}
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={80}
            autoComplete="name"
            required
          />
        </div>
        <div className="comment-form__field">
          <label htmlFor={`${idBase}-email`}>Email <span>(optional, never shown)</span></label>
          <input
            id={`${idBase}-email`}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            maxLength={254}
            autoComplete="email"
          />
        </div>
      </div>
      {/* Honeypot: hidden from people and screen readers; bots tend to fill it in. */}
      <div className="comment-form__hp" aria-hidden="true">
        <label htmlFor={`${idBase}-website`}>Website</label>
        <input
          id={`${idBase}-website`}
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={e => setWebsite(e.target.value)}
        />
      </div>
      {error && <p className="comment-form__error" role="alert">{error}</p>}
      <div className="comment-form__actions">
        <p className="comment-form__note">
          {body.length > MAX_BODY - 300 ? `${MAX_BODY - body.length} characters left` : 'Be kind and stay on topic.'}
        </p>
        <div className="comment-form__buttons">
          {onCancel && (
            <button type="button" className="btn btn--secondary btn--sm" onClick={onCancel}>Cancel</button>
          )}
          <button type="submit" className="btn btn--primary btn--sm" disabled={busy || !body.trim() || !name.trim()}>
            {busy ? 'Posting…' : parentId ? 'Reply' : 'Post comment'}
          </button>
        </div>
      </div>
    </form>
  );
}

function CommentItem({
  c, slug, replies, canReply, onPosted,
}: {
  c: Comment;
  slug: string;
  replies?: Comment[];
  canReply: boolean;
  onPosted: (c: Comment, held: boolean) => void;
}) {
  const [replying, setReplying] = useState(false);
  return (
    <li className={`comment${c.isAuthor ? ' comment--author' : ''}`} id={`comment-${c.id}`}>
      <div className="comment__avatar" style={{ background: c.isAuthor ? 'var(--accent)' : tint(c.name) }} aria-hidden="true">
        {initials(c.name)}
      </div>
      <div className="comment__main">
        <p className="comment__meta">
          <span className="comment__name">{c.name}</span>
          {c.isAuthor && <span className="comment__badge">Author</span>}
          <time dateTime={c.createdAt} title={new Date(c.createdAt).toLocaleString('en-GB')}>{timeAgo(c.createdAt)}</time>
        </p>
        <p className="comment__body">{c.body}</p>
        {canReply && !replying && (
          <button type="button" className="comment__reply" onClick={() => setReplying(true)}>Reply</button>
        )}
        {replying && (
          <CommentForm
            slug={slug}
            parentId={c.id}
            autoFocus
            onCancel={() => setReplying(false)}
            onPosted={(nc, held) => { setReplying(false); onPosted(nc, held); }}
          />
        )}
        {replies && replies.length > 0 && (
          <ol className="comment-replies">
            {replies.map(r => (
              <CommentItem key={r.id} c={r} slug={slug} canReply={false} onPosted={onPosted} />
            ))}
          </ol>
        )}
      </div>
    </li>
  );
}

export default function Comments({ slug, prompt }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'disabled'>('loading');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(d => {
        if (cancelled) return;
        setComments(d.comments ?? []);
        setState(d.enabled === false ? 'disabled' : 'ready');
      })
      .catch(() => !cancelled && setState('disabled'));
    return () => { cancelled = true; };
  }, [slug]);

  const onPosted = useCallback((c: Comment, held: boolean) => {
    if (held) {
      setNotice('Thanks — your comment is being reviewed and will appear shortly.');
      return;
    }
    setNotice('');
    setComments(prev => [...prev, c]);
    requestAnimationFrame(() =>
      document.getElementById(`comment-${c.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  }, []);

  // Top-level newest first; replies oldest first under their parent.
  const { topLevel, repliesBy } = useMemo(() => {
    const repliesBy = new Map<string, Comment[]>();
    const topLevel: Comment[] = [];
    for (const c of comments) {
      if (c.parentId) repliesBy.set(c.parentId, [...(repliesBy.get(c.parentId) ?? []), c]);
      else topLevel.push(c);
    }
    topLevel.reverse();
    return { topLevel, repliesBy };
  }, [comments]);

  const count = comments.length;

  return (
    <section id="comments" className="comments" aria-labelledby="comments-title">
      <h2 id="comments-title" className="comments__title">
        {state === 'ready' && count > 0 ? `${count} comment${count === 1 ? '' : 's'}` : 'Comments'}
      </h2>
      {prompt && <p className="comments__prompt">{prompt}</p>}

      {state === 'disabled' ? (
        <p className="comments__empty">Comments are unavailable right now.</p>
      ) : (
        <>
          <CommentForm slug={slug} onPosted={onPosted} />
          {notice && <p className="comments__notice" role="status">{notice}</p>}

          {state === 'loading' && <p className="comments__empty">Loading comments…</p>}
          {state === 'ready' && count === 0 && (
            <p className="comments__empty">No comments yet. Start the conversation.</p>
          )}
          {topLevel.length > 0 && (
            <ol className="comment-list">
              {topLevel.map(c => (
                <CommentItem
                  key={c.id}
                  c={c}
                  slug={slug}
                  replies={repliesBy.get(c.id)}
                  canReply
                  onPosted={onPosted}
                />
              ))}
            </ol>
          )}
        </>
      )}
    </section>
  );
}
