import { CASE_STUDIES } from '@/data/caseStudies';
import { getPost, getPostSlugs, type Post } from '@/lib/posts';
import { caseStudyMarkdown, postMarkdown } from '@/lib/plaintext';
import { PERSON, SITE } from '@/lib/site';

export const dynamic = 'force-static';

// Full plain-markdown text of the site, so AI assistants can read and cite it accurately.
export function GET() {
  const posts = getPostSlugs().map(s => getPost(s)).filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  const body = `# ${PERSON.name} — full site content

Source: ${SITE.url}
${PERSON.description}

# Articles

${posts.map(postMarkdown).join('\n\n---\n\n')}

# Case studies

${CASE_STUDIES.map(caseStudyMarkdown).join('\n\n---\n\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
