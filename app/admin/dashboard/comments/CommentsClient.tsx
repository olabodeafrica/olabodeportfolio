'use client';
import { useEffect, useMemo, useState, useTransition } from 'react';
import type { CommentRow, CommentStatus } from '@/lib/comments';
import { COMMENTS_SEEN_COOKIE } from '@/lib/comments-shared';
import { deleteComment, replyAsAuthor, setCommentStatus } from './actions';

type Filter = 'all' | CommentStatus;

const STATUS_LABEL: Record<CommentStatus, string> = {
  published: 'Live',
  pending: 'Held',
  hidden: 'Hidden',
};

function fmt(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}

export default function CommentsClient({
  comments, posts, loadError,
}: {
  comments: CommentRow[];
  posts: Record<string, string>;
  loadError: string;
}) {
  const [filter, setFilter] = useState<Filter>('all');
  const [replyFor, setReplyFor] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  // When the admin last opened this page (null until mounted, to keep SSR and client in sync).
  const [seenAt, setSeenAt] = useState<number | null>(null);

  // Remember the previous visit for "New" pills, then mark everything as seen.
  useEffect(() => {
    const m = document.cookie.match(new RegExp(`${COMMENTS_SEEN_COOKIE}=([^;]+)`));
    setSeenAt(m ? Number(m[1]) : 0);
    document.cookie = `${COMMENTS_SEEN_COOKIE}=${Date.now()}; path=/admin; max-age=31536000; samesite=lax`;
  }, []);

  const counts = useMemo(() => {
    const c = { all: comments.length, published: 0, pending: 0, hidden: 0 };
    for (const x of comments) c[x.status] += 1;
    return c;
  }, [comments]);

  const shown = filter === 'all' ? comments : comments.filter(c => c.status === filter);
  const byId = useMemo(() => new Map(comments.map(c => [c.id, c])), [comments]);

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>, after?: () => void) => {
    setError('');
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) setError(res.error ?? 'Something went wrong.');
      else after?.();
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Comments</h1>
          <p>Comments go live immediately unless the spam checks hold them. Hide or delete anything you don&apos;t want shown.</p>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat"><div className="admin-stat__value">{counts.published}</div><div className="admin-stat__label">Live</div></div>
        <div className="admin-stat"><div className="admin-stat__value" style={{ color: 'var(--a-amber)' }}>{counts.pending}</div><div className="admin-stat__label">Held for review</div></div>
        <div className="admin-stat"><div className="admin-stat__value" style={{ color: 'var(--a-text3)' }}>{counts.hidden}</div><div className="admin-stat__label">Hidden</div></div>
      </div>

      <div className="cm-tabs" role="tablist">
        {(['all', 'published', 'pending', 'hidden'] as Filter[]).map(f => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            className={`cm-tab${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : STATUS_LABEL[f]} <span>{counts[f]}</span>
          </button>
        ))}
      </div>

      {(loadError || error) && <div className="cm-error" role="alert">{loadError || error}</div>}

      {shown.length === 0 && !loadError && (
        <div className="empty-state">
          <div className="empty-state__icon">💬</div>
          <div className="empty-state__text">No comments here yet</div>
          <div className="empty-state__sub">When readers comment on your posts, they&apos;ll appear here.</div>
        </div>
      )}

      <ul className="cm-list">
        {shown.map(c => {
          const parent = c.parent_id ? byId.get(c.parent_id) : undefined;
          const isNew = seenAt !== null && new Date(c.created_at).getTime() > seenAt && !c.is_author;
          return (
            <li key={c.id} className={`admin-card cm-card cm-card--${c.status}`}>
              <div className="cm-card__top">
                <div className="cm-card__who">
                  <strong>{c.author_name}</strong>
                  {c.is_author && <span className="cm-pill cm-pill--author">You</span>}
                  <span className={`cm-pill cm-pill--${c.status}`}>{STATUS_LABEL[c.status]}</span>
                  {isNew && <span className="cm-pill cm-pill--new">New</span>}
                </div>
                <time className="cm-card__time">{fmt(c.created_at)}</time>
              </div>

              <div className="cm-card__context">
                on{' '}
                <a href={`/blog/${c.post_slug}#comment-${c.id}`} target="_blank" rel="noopener noreferrer">
                  {posts[c.post_slug] ?? c.post_slug}
                </a>
                {parent && <> · replying to <strong>{parent.author_name}</strong></>}
                {c.author_email && !c.is_author && (
                  <> · <a href={`mailto:${c.author_email}`}>{c.author_email}</a></>
                )}
              </div>

              <p className="cm-card__body">{c.body}</p>

              <div className="cm-card__actions">
                {c.status !== 'published' && (
                  <button className="btn btn-secondary cm-btn" disabled={isPending}
                    onClick={() => run(() => setCommentStatus(c.id, 'published'))}>Publish</button>
                )}
                {c.status === 'published' && (
                  <button className="btn btn-secondary cm-btn" disabled={isPending}
                    onClick={() => run(() => setCommentStatus(c.id, 'hidden'))}>Hide</button>
                )}
                {!c.is_author && c.status === 'published' && (
                  <button className="btn btn-secondary cm-btn" disabled={isPending}
                    onClick={() => { setReplyFor(replyFor === c.id ? null : c.id); setReplyText(''); }}>
                    Reply as author
                  </button>
                )}
                <button className="btn btn-secondary cm-btn cm-btn--danger" disabled={isPending}
                  onClick={() => {
                    const extra = c.parent_id ? '' : ' Replies to it will be deleted too.';
                    if (confirm(`Delete this comment permanently?${extra}`)) run(() => deleteComment(c.id));
                  }}>
                  Delete
                </button>
              </div>

              {replyFor === c.id && (
                <div className="cm-reply">
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    rows={3}
                    maxLength={3000}
                    placeholder={`Reply to ${c.author_name}…`}
                    autoFocus
                  />
                  <div className="cm-reply__actions">
                    <button className="btn btn-secondary cm-btn" onClick={() => setReplyFor(null)}>Cancel</button>
                    <button className="btn btn-primary cm-btn" disabled={isPending || replyText.trim().length < 2}
                      onClick={() => run(() => replyAsAuthor(c.id, replyText), () => { setReplyFor(null); setReplyText(''); })}>
                      {isPending ? 'Posting…' : 'Post reply'}
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
