import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og';
import { formatPostDate, getPost, getPostSlugs } from '@/lib/posts';

export const alt = 'Article by Olabode Ogunfuye';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getPostSlugs().map(slug => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgCard({
    eyebrow: post?.tags[0] ?? 'Writing',
    title: post?.title ?? 'Writing',
    footer: post ? `${formatPostDate(post.date, 'short')} · ${post.readingTime}` : undefined,
    section: 'Writing',
  });
}
