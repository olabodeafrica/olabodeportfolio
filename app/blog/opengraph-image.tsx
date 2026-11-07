import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og';

export const alt = 'Writing by Olabode Ogunfuye';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: 'Writing',
    title: 'Notes on products, payments and African tech.',
    section: 'Blog',
  });
}
