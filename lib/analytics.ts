// Thin, safe wrappers around Microsoft Clarity. No-ops when Clarity isn't loaded
// (no NEXT_PUBLIC_CLARITY_ID, ad blockers, admin pages, server render).
type ClarityFn = (...args: unknown[]) => void;

function clarity(): ClarityFn | null {
  if (typeof window === 'undefined') return null;
  const fn = (window as unknown as { clarity?: ClarityFn }).clarity;
  return typeof fn === 'function' ? fn : null;
}

/** Custom event, visible in Clarity filters (e.g. "share_linkedin", "subscribe"). */
export function track(event: string) {
  try { clarity()?.('event', event); } catch {}
}

/** Custom tag on the current session (e.g. page_type = "post"). */
export function tag(key: string, value: string) {
  try { clarity()?.('set', key, value); } catch {}
}
