import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og';

export const alt = 'Olabode Ogunfuye — Product Leader in banking, payments and agentic AI';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: 'Product leader · Banking, payments & agentic AI',
    title: 'I don’t just ship products. I make sure people actually use them.',
    footer: '12 years · six African markets',
  });
}
