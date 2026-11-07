'use client';
import { useEffect, useState } from 'react';

// Read client-side so /blog stays a static page.
export default function UnsubscribedNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(new URLSearchParams(window.location.search).has('unsubscribed')); }, []);
  if (!show) return null;
  return <p className="blog-notice" role="status">You&apos;ve been unsubscribed. You won&apos;t get any more emails.</p>;
}
