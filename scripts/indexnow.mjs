#!/usr/bin/env node
// Notify IndexNow search engines (Bing — which powers ChatGPT search & Copilot —, Yandex,
// Seznam, Naver…) that pages changed. Run after a deploy goes live:
//   npm run indexnow                 → submit every URL in the live sitemap
//   npm run indexnow -- /blog/my-post → submit specific paths
const SITE = 'https://www.olabode.africa';
const KEY = '30bbb77c2449cc5fe7d2fb8c9ccc513a'; // must match public/30bbb77c2449cc5fe7d2fb8c9ccc513a.txt

const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map(p => new URL(p, SITE).toString());
} else {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
}
if (!urls.length) { console.error('No URLs to submit.'); process.exit(1); }

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} — submitted ${urls.length} URL(s)`);
if (res.status >= 400) { console.log(await res.text()); process.exit(1); }
