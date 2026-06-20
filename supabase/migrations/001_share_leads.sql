-- Run in Supabase SQL editor to enable share lead capture.

create table if not exists public.share_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  bubble_results jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists share_leads_created_at_idx
  on public.share_leads (created_at desc);

create index if not exists share_leads_email_idx
  on public.share_leads (email);

alter table public.share_leads enable row level security;

-- Inserts happen via service role from the API route only.
