# olabode.africa

Portfolio, case studies and blog for Olabode Ogunfuye. Next.js 16 (App Router), deployed on Vercel from `master`.

```bash
npm install
npm run dev        # http://localhost:3000
```

---

## Writing a post

```bash
npm run new-post "Your post title"
```

This creates `content/blog/<slug>.mdx` as a **draft**, plus `public/blog/<slug>/` for its images. Drafts (and posts dated in the future) show in `npm run dev` but never on the live site. To publish, delete the `draft: true` line, commit and push.

### Front matter

| Field | Required | What it does |
|---|---|---|
| `title` | yes | Page title, H1 and share card. Put the main search phrase near the start. |
| `description` | yes | 140–160 characters. Google snippet and share preview. Make it the answer, not a teaser. |
| `date` | yes | `yyyy-mm-dd`. Publish date. |
| `updated` | | Set when you meaningfully revise a post. Shows "Updated …" and tells Google to re-crawl. |
| `tags` | yes | The first tag is the category. **Reuse existing tags**: each one becomes a topic page (`/blog/tag/…`), indexed once it has 2+ posts. |
| `keywords` | | Phrases people would type into Google or ask ChatGPT. |
| `cover` | | Hero image path, e.g. `/blog/<slug>/cover.webp`. |
| `takeaways` | recommended | 2–5 one-sentence, self-contained conclusions. Shown at the top as **Key takeaways**. These are what AI answer engines quote. |
| `faq` | | `- q: … / a: …` pairs. Shown at the end and emitted as FAQ structured data. Use real questions people ask. |
| `discussionPrompt` | | The question above the comment form. |
| `draft` | | `true` keeps the post off the live site. |

### Body

- `##` for sections (they appear in **On this page** and get shareable `#` links), `###` for sub-sections.
- `![Alt text](/blog/<slug>/image.webp)`: the alt text is also the caption, so write it as one. Use WebP, about 900px wide.
- Tables, lists, `> quotes` and links all work (GitHub-flavoured Markdown).

### Writing for search and AI answers (SEO + GEO)

1. **Answer first.** The first paragraph should state the conclusion. AI engines and Google's snippets lift the first clear answer they find.
2. **One question per section.** Phrase `##` headings the way people ask: "How much does X cost?", "Is X worth it?".
3. **Be specific and quotable.** Numbers, dates, names and first-hand observations ("I tapped Cook Jollof and nothing happened") are what get cited. Vague opinions don't.
4. **Show experience.** Say what you did, saw or measured. That's the "E" in Google's E-E-A-T and why reviews from practitioners rank.
5. **Link internally.** Link to related posts and case studies with descriptive anchor text.
6. **Update, don't duplicate.** Revise an existing post (and set `updated`) instead of writing a near-copy.

## After you publish

1. Push to `master`. Vercel deploys in about 40 seconds.
2. `npm run indexnow`. Pings Bing, which powers ChatGPT search and Copilot, plus Yandex and others with every URL in the sitemap. Or `npm run indexnow -- /blog/<slug>` for just the new post.
3. Google Search Console → URL inspection → **Request indexing** for the new post.
4. Share it on LinkedIn **as a native post** (key takeaways + link in the first comment tends to reach further than a bare link), on X, and in relevant WhatsApp groups.
5. Reply to every comment from the admin dashboard (💬 Comments). Early discussion signals and reader questions often become your next post.
6. Export subscribers (✉️ Subscribers → Export CSV) and send the post to your list.

## What the site does automatically

| Feature | Where |
|---|---|
| Branded share image for every page, post and case study | `app/**/opengraph-image.tsx`, `lib/og.tsx` |
| Canonical URLs, Open Graph/X cards, `max-image-preview:large` | `app/layout.tsx`, `lib/site.ts` |
| Structured data: Person, WebSite, ProfilePage, Blog, BlogPosting, FAQPage, BreadcrumbList, Article | `lib/schema.ts` |
| `robots.txt` (search engines and AI crawlers welcome; `/admin` and `/api` blocked) | `app/robots.ts` |
| `sitemap.xml` with images and last-modified dates | `app/sitemap.ts` |
| RSS feed | `/blog/feed.xml` |
| `llms.txt` (site map for AI assistants) and `llms-full.txt` (full text of every post and case study) | `app/llms.txt`, `app/llms-full.txt` |
| Topic pages, related posts, breadcrumbs, author box | `app/blog/**` |
| IndexNow key | `public/<key>.txt`, `scripts/indexnow.mjs` |

**Identity:** your name, bio, profile links and expertise live in **`lib/site.ts`**. Add new profiles (GitHub, Medium, Substack, YouTube) to `PERSON.sameAs` so search engines connect them to you.

## One-time setup (Vercel and Supabase)

- **Supabase SQL:** run each file in `supabase/migrations/` once (comments, subscribers).
- **Vercel env vars:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. Optional: `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` (verification codes from Search Console / Bing Webmaster Tools; the site adds the meta tags).
- **Google Search Console** and **Bing Webmaster Tools:** verify the domain and submit `https://www.olabode.africa/sitemap.xml`.
