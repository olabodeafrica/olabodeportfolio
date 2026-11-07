// Plain-text / markdown renderings of site content for feeds and AI crawlers (llms-full.txt).
import type { CaseStudy, ContentBlock } from '@/data/caseStudies';
import type { Post } from './posts';
import { abs } from './site';

const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ');

export const stripHtml = (html: string) => decode(html.replace(/<[^>]+>/g, ''));

export const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

function blockToMarkdown(b: ContentBlock): string {
  switch (b.type) {
    case 'paragraph': return stripHtml(b.html);
    case 'callout': return `> ${b.text}`;
    case 'insightList': return b.items.map(i => `- ${i.strong ? `**${i.strong}** ` : ''}${i.text}`).join('\n');
    case 'outcomeGrid': return b.items.map(i => `- **${i.stat}** — ${i.label}`).join('\n');
    case 'image': return b.caption ? `[Image: ${b.caption}]` : '';
    default: return '';
  }
}

export function caseStudyMarkdown(cs: CaseStudy): string {
  const meta = cs.meta.map(m => `- ${m.label}: ${m.value}`).join('\n');
  const steps = cs.steps
    .map(s => `### ${s.number} — ${s.heading}\n\n${s.body.map(blockToMarkdown).filter(Boolean).join('\n\n')}`)
    .join('\n\n');
  return `## ${cs.title}\n\nURL: ${abs(`/work/${cs.slug}`)}\nTopics: ${cs.tag}\n\n${cs.summary}\n\n${meta}\n\n${steps}`;
}

export function postMarkdown(p: Post): string {
  const head = [
    `## ${p.title}`,
    '',
    `URL: ${abs(`/blog/${p.slug}`)}`,
    `Author: ${p.author} · Published: ${p.date}${p.updated ? ` · Updated: ${p.updated}` : ''}`,
    `Topics: ${p.tags.join(', ')}`,
    '',
    p.description,
  ];
  if (p.takeaways.length) head.push('', 'Key takeaways:', ...p.takeaways.map(t => `- ${t}`));
  const body = p.content.replace(/!\[([^\]]*)\]\([^)]*\)/g, '[Image: $1]').trim();
  const faq = p.faq.length ? `\n\n### FAQ\n\n${p.faq.map(f => `**${f.q}**\n${f.a}`).join('\n\n')}` : '';
  return `${head.join('\n')}\n\n${body}${faq}`;
}
