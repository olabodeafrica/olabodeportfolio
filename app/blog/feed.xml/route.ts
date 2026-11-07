import { getAllPosts } from '@/lib/posts';
import { escapeXml } from '@/lib/plaintext';
import { PERSON, RSS_PATH, SITE, abs } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const posts = getAllPosts();
  const items = posts.map(p => {
    const url = abs(`/blog/${p.slug}`);
    const summary = [
      `<p>${escapeXml(p.description)}</p>`,
      p.takeaways.length ? `<ul>${p.takeaways.map(t => `<li>${escapeXml(t)}</li>`).join('')}</ul>` : '',
      `<p><a href="${url}">Read the full article →</a></p>`,
    ].join('');
    return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T08:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(p.author)}</dc:creator>
${p.tags.map(t => `      <category>${escapeXml(t)}</category>`).join('\n')}
      <description>${escapeXml(p.description)}</description>
      <content:encoded><![CDATA[${summary}]]></content:encoded>
      <media:content url="${abs(`/blog/${p.slug}/opengraph-image`)}" medium="image" type="image/png" width="1200" height="630" />
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(SITE.blogTitle)}</title>
    <link>${abs('/blog')}</link>
    <atom:link href="${abs(RSS_PATH)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE.blogDescription)}</description>
    <language>${SITE.language}</language>
    <managingEditor>${PERSON.email} (${escapeXml(PERSON.name)})</managingEditor>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image><url>${abs('/blog/opengraph-image')}</url><title>${escapeXml(SITE.blogTitle)}</title><link>${abs('/blog')}</link></image>
${items}
  </channel>
</rss>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
