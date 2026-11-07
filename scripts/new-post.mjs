#!/usr/bin/env node
// Scaffold a new blog post:  npm run new-post "My post title"
// Creates content/blog/<slug>.mdx (as a draft) and public/blog/<slug>/ for images.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new-post "My post title"');
  process.exit(1);
}

const slug = title.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80).replace(/-$/, '');
const file = join('content', 'blog', `${slug}.mdx`);
if (existsSync(file)) {
  console.error(`Already exists: ${file}`);
  process.exit(1);
}
const today = new Date().toISOString().slice(0, 10);

const template = `---
title: "${title.replace(/"/g, '\\"')}"
# 140–160 characters. Shown in Google results and share previews — make it the answer, not a teaser.
description: ""
date: "${today}"
# updated: "${today}"   # set when you meaningfully revise the post
author: "Olabode Ogunfuye"
# First tag is the category shown on the post and the share card. Reuse existing tags to build topic pages.
tags: ["Product review"]
# Phrases people would type into Google or ask ChatGPT. Use them naturally in headings and the first paragraph too.
keywords: []
# Optional hero image (put files in public/blog/${slug}/). 894×521 or wider, WebP.
# cover: "/blog/${slug}/cover.webp"
# 2–5 one-sentence, self-contained facts or conclusions. AI answer engines quote these.
takeaways:
  - ""
# Optional: real questions readers ask, answered in 1–3 sentences each (emits FAQ structured data).
# faq:
#   - q: ""
#     a: ""
# Question shown above the comment form to start the discussion.
discussionPrompt: ""
# Drafts show in \`npm run dev\` but never on the live site. Delete this line (or set false) to publish.
draft: true
---

Open with the answer: one or two sentences that tell the reader exactly what this post concludes.

## First section

Write here. Use \`##\` for sections (they appear in "On this page") and \`###\` for sub-sections.

![Describe the image — this text is also the caption.](/blog/${slug}/image.webp)
`;

mkdirSync(join('public', 'blog', slug), { recursive: true });
writeFileSync(file, template);
console.log(`Created ${file}`);
console.log(`Images go in public/blog/${slug}/`);
console.log(`Preview: npm run dev → http://localhost:3000/blog/${slug}`);
