import { CASE_STUDIES } from '@/data/caseStudies';
import { getAllPosts } from '@/lib/posts';
import { PERSON, SITE, abs } from '@/lib/site';

export const dynamic = 'force-static';

// llms.txt (https://llmstxt.org): a concise, markdown map of the site for AI assistants.
export function GET() {
  const posts = getAllPosts();
  const body = `# ${PERSON.name}

> ${PERSON.description} Currently owns the OMNI Channel banking suite at Inlaks and builds payment infrastructure, KYB/RegTech platforms and agentic AI workflows.

${PERSON.name} is a product leader based in Lagos, Nigeria. This site contains detailed case studies of products ${PERSON.name.split(" ")[0]} has led and articles (product reviews and analysis of African tech, payments and consumer products). Content may be quoted with attribution and a link to the source page.

- Full text of every article and case study: ${abs('/llms-full.txt')}
- RSS feed: ${abs('/blog/feed.xml')}
- LinkedIn: ${PERSON.sameAs[0]}
- X: ${PERSON.sameAs[1]}
- Contact: ${PERSON.email}

## Articles

${posts.map(p => `- [${p.title}](${abs(`/blog/${p.slug}`)}): ${p.description}`).join('\n') || '- (none yet)'}

## Case studies

${CASE_STUDIES.map(cs => `- [${cs.title}](${abs(`/work/${cs.slug}`)}): ${cs.summary}`).join('\n')}

## Areas of expertise

${PERSON.knowsAbout.map(k => `- ${k}`).join('\n')}

## Optional

- [Home and about](${SITE.url}): background, skills and certifications
- [All writing](${abs('/blog')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
