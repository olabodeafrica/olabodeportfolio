-- Blog comments for olabode.africa/blog.
-- Readers comment without logging in; comments publish immediately unless the
-- spam checks hold them for review. All reads and writes go through the Next.js
-- server with the service-role key, so RLS is enabled with no public policies:
-- the anon key can neither read emails/IP hashes nor write directly.

create table if not exists public.blog_comments (
  id            uuid primary key default gen_random_uuid(),
  post_slug     text not null check (post_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  parent_id     uuid references public.blog_comments(id) on delete cascade,
  author_name   text not null check (char_length(author_name) between 1 and 80),
  author_email  text check (author_email is null or char_length(author_email) <= 254),
  body          text not null check (char_length(body) between 2 and 3000),
  is_author     boolean not null default false,
  -- published: visible · pending: held by spam checks · hidden: removed by the admin
  status        text not null default 'published' check (status in ('published', 'pending', 'hidden')),
  ip_hash       text,
  created_at    timestamptz not null default now()
);

create index if not exists blog_comments_post_idx
  on public.blog_comments (post_slug, status, created_at);

create index if not exists blog_comments_ip_idx
  on public.blog_comments (ip_hash, created_at);

create index if not exists blog_comments_created_idx
  on public.blog_comments (created_at desc);

alter table public.blog_comments enable row level security;
-- Intentionally no policies: only the service role (server-side) can access this table.
