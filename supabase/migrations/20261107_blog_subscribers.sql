-- Newsletter subscribers for olabode.africa/blog (email capture for new-post notifications).
-- Same security model as blog_comments: RLS on, no public policies; only the Next.js server
-- (service-role key) reads or writes.

create table if not exists public.blog_subscribers (
  id               uuid primary key default gen_random_uuid(),
  email            text not null unique check (char_length(email) between 5 and 254),
  name             text check (name is null or char_length(name) <= 80),
  source           text check (source is null or char_length(source) <= 120), -- e.g. post:lagos-life-review
  unsubscribe_token uuid not null default gen_random_uuid(),
  ip_hash          text,
  created_at       timestamptz not null default now(),
  unsubscribed_at  timestamptz
);

create index if not exists blog_subscribers_created_idx on public.blog_subscribers (created_at desc);
create index if not exists blog_subscribers_ip_idx on public.blog_subscribers (ip_hash, created_at);

alter table public.blog_subscribers enable row level security;
-- Intentionally no policies: only the service role (server-side) can access this table.
