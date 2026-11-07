import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Site mark: ivory serif "O" with a clay dot on a slate rounded square.
// Rendered at every size from one definition (favicon, PWA, Apple touch icon).
const SLATE = '#141413';
const IVORY = '#faf9f5';
const CLAY = '#d97757';

let font: Promise<Buffer> | null = null;
const loadFont = () => (font ??= readFile(join(process.cwd(), 'assets/fonts/SourceSerif4-Text-Bold.ttf')));

export async function renderBrandIcon(size: number, { rounded = true }: { rounded?: boolean } = {}) {
  const data = await loadFont();
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: SLATE,
          // iOS applies its own mask to apple-touch icons, so those are drawn square.
          borderRadius: rounded ? size * 0.22 : 0,
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Serif',
            fontSize: size * 0.86,
            lineHeight: 1,
            color: IVORY,
            marginTop: -size * 0.02,
            marginLeft: -size * 0.09,
          }}
        >
          O
        </div>
        <div
          style={{
            position: 'absolute',
            width: size * 0.16,
            height: size * 0.16,
            borderRadius: size,
            background: CLAY,
            right: size * 0.1,
            bottom: size * 0.21,
          }}
        />
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [{ name: 'Serif', data, weight: 700, style: 'normal' }],
    },
  );
}
