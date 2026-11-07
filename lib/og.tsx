import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Branded 1200×630 social cards (LinkedIn, X, WhatsApp, Slack previews).
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const C = { bg: '#faf9f5', ink: '#141413', ink3: '#5e5d59', line: '#e3dfd3', accent: '#d97757', oat: '#f0eee6' };

let fontsPromise: Promise<{ name: string; data: Buffer; weight: 400 | 500; style: 'normal' }[]> | null = null;
function loadFonts() {
  fontsPromise ??= Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/SourceSerif4-Display-Regular.ttf')),
    readFile(join(process.cwd(), 'assets/fonts/DMSans-Medium.ttf')),
  ]).then(([serif, sans]) => [
    { name: 'Serif', data: serif, weight: 400 as const, style: 'normal' as const },
    { name: 'Sans', data: sans, weight: 500 as const, style: 'normal' as const },
  ]);
  return fontsPromise;
}

type CardProps = {
  eyebrow: string;
  title: string;
  footer?: string; // e.g. "31 Oct 2026 · 19 min read"
  section?: string; // "Writing" | "Case study" | …
};

function titleSize(title: string) {
  if (title.length > 90) return 52;
  if (title.length > 60) return 62;
  if (title.length > 36) return 72;
  return 84;
}

export async function renderOgCard({ eyebrow, title, footer, section }: CardProps) {
  const fonts = await loadFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: C.bg,
          padding: '64px 72px',
          fontFamily: 'Sans',
          color: C.ink,
          borderBottom: `14px solid ${C.accent}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontFamily: 'Serif', fontSize: 36, letterSpacing: -0.5 }}>Olabode Ogunfuye</div>
          {section && (
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                color: C.ink3,
                background: C.oat,
                padding: '10px 20px',
                borderRadius: 999,
              }}
            >
              {section}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 26, color: C.accent, marginBottom: 22 }}>{eyebrow}</div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Serif',
              fontSize: titleSize(title),
              lineHeight: 1.06,
              letterSpacing: -1.5,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 24,
            color: C.ink3,
            borderTop: `1px solid ${C.line}`,
            paddingTop: 24,
          }}
        >
          <div style={{ display: 'flex' }}>{footer ?? 'Product leader · Banking, payments & agentic AI'}</div>
          <div style={{ display: 'flex', color: C.ink }}>olabode.africa</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
