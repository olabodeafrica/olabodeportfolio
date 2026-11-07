'use client';
import { useRef, useState, type FormEvent } from 'react';

type Props = { source: string; compact?: boolean };

/** Email capture for new posts. Also points to the RSS feed for people who prefer readers. */
export default function Subscribe({ source, compact = false }: Props) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const mountedAt = useRef(Date.now());

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setState('busy');
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, website, elapsedMs: Date.now() - mountedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? 'Could not subscribe. Please try again.');
        setState('error');
        return;
      }
      setState('done');
    } catch {
      setError('Network error — please try again.');
      setState('error');
    }
  };

  return (
    <section className={`subscribe${compact ? ' subscribe--compact' : ''}`} aria-labelledby={`subscribe-${source}`}>
      <div className="subscribe__copy">
        <h2 id={`subscribe-${source}`} className="subscribe__title">Get new writing by email</h2>
        <p className="subscribe__text">
          Product reviews and lessons from building banking, payments and AI products in Africa. No spam;
          unsubscribe in one click. Prefer a reader? <a href="/blog/feed.xml">RSS feed</a>.
        </p>
      </div>
      {state === 'done' ? (
        <p className="subscribe__done" role="status">You&apos;re on the list. Thanks for subscribing.</p>
      ) : (
        <form className="subscribe__form" onSubmit={submit} noValidate>
          <label htmlFor={`sub-email-${source}`} className="sr-only">Email address</label>
          <input
            id={`sub-email-${source}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div className="subscribe__hp" aria-hidden="true">
            <input tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
          </div>
          <button type="submit" className="btn btn--primary" disabled={state === 'busy' || !email.trim()}>
            {state === 'busy' ? 'Subscribing…' : 'Subscribe'}
          </button>
          {error && <p className="subscribe__error" role="alert">{error}</p>}
        </form>
      )}
    </section>
  );
}
