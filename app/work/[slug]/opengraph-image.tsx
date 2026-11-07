import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og';
import { CASE_STUDIES } from '@/data/caseStudies';

export const alt = 'Case study by Olabode Ogunfuye';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return CASE_STUDIES.map(cs => ({ slug: cs.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find(c => c.slug === slug);
  const outcome = cs?.meta.find(m => /outcome/i.test(m.label))?.value;
  return renderOgCard({
    eyebrow: cs?.tag.split('·').slice(0, 2).join('·').trim() ?? 'Case study',
    title: cs?.title ?? 'Case study',
    footer: outcome ? `Outcome: ${outcome}` : undefined,
    section: 'Case study',
  });
}
