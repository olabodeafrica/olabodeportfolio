import { commentsConfigured as dbConfigured, commentsDb as db } from '@/lib/comments';

export const metadata = { title: 'Subscribers — Admin' };

type Sub = { id: string; email: string; source: string | null; created_at: string; unsubscribed_at: string | null };

export default async function SubscribersPage() {
  if (!dbConfigured()) {
    return <div className="admin-page"><div className="admin-card admin-card--padded">Supabase service key not configured.</div></div>;
  }
  const { data, error } = await db()
    .from('blog_subscribers')
    .select('id, email, source, created_at, unsubscribed_at')
    .order('created_at', { ascending: false })
    .limit(2000);
  const subs = (data as Sub[] | null) ?? [];
  const active = subs.filter(s => !s.unsubscribed_at);
  const last30 = active.filter(s => Date.now() - new Date(s.created_at).getTime() < 30 * 864e5).length;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Subscribers</h1>
          <p>People who asked to hear about new posts. Export the list to send with your email tool.</p>
        </div>
        <a className="btn btn-primary" href="/admin/dashboard/subscribers/export" download>Export CSV</a>
      </div>

      {error && <div className="cm-error">Could not load subscribers. Has the blog_subscribers migration been run in Supabase?</div>}

      <div className="admin-stats">
        <div className="admin-stat"><div className="admin-stat__value">{active.length}</div><div className="admin-stat__label">Active</div></div>
        <div className="admin-stat"><div className="admin-stat__value" style={{ color: 'var(--a-green)' }}>{last30}</div><div className="admin-stat__label">New (30 days)</div></div>
        <div className="admin-stat"><div className="admin-stat__value" style={{ color: 'var(--a-text3)' }}>{subs.length - active.length}</div><div className="admin-stat__label">Unsubscribed</div></div>
      </div>

      {subs.length === 0 && !error ? (
        <div className="empty-state">
          <div className="empty-state__icon">✉️</div>
          <div className="empty-state__text">No subscribers yet</div>
          <div className="empty-state__sub">The subscribe box sits under every post and on the blog page.</div>
        </div>
      ) : (
        <ul className="cm-list">
          {subs.map(s => (
            <li key={s.id} className={`admin-card cm-card${s.unsubscribed_at ? ' cm-card--hidden' : ''}`}>
              <div className="cm-card__top">
                <div className="cm-card__who">
                  <strong>{s.email}</strong>
                  {s.unsubscribed_at && <span className="cm-pill cm-pill--hidden">Unsubscribed</span>}
                </div>
                <time className="cm-card__time">
                  {new Date(s.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </time>
              </div>
              {s.source && <div className="cm-card__context">from {s.source}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
