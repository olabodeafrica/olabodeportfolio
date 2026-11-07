import { renderBrandIcon } from '@/lib/brand-icon';

// PNG icons for browsers and Android home screens (favicon.ico covers legacy browsers).
export function generateImageMetadata() {
  return [
    { id: '32', size: { width: 32, height: 32 }, contentType: 'image/png' },
    { id: '192', size: { width: 192, height: 192 }, contentType: 'image/png' },
    { id: '512', size: { width: 512, height: 512 }, contentType: 'image/png' },
  ];
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  return renderBrandIcon(Number(await id));
}
