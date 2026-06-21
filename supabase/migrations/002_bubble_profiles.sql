-- MVP profile storage for KommaPunt bubble flow.

create table if not exists public.bubble_profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  age_group text not null,
  race text not null,
  province text not null,
  ranked_values jsonb not null,
  top_5_values text[] not null,
  top_10_values text[] not null,
  scores jsonb,
  created_at timestamptz not null default now()
);

create index if not exists bubble_profiles_created_at_idx
  on public.bubble_profiles (created_at desc);

create index if not exists bubble_profiles_email_idx
  on public.bubble_profiles (email);

create index if not exists bubble_profiles_province_idx
  on public.bubble_profiles (province);

create index if not exists bubble_profiles_age_group_idx
  on public.bubble_profiles (age_group);

-- Future: Potgooi / issue participation linked to a saved profile.
create table if not exists public.issue_responses (
  id uuid primary key default gen_random_uuid(),
  bubble_profile_id uuid references public.bubble_profiles (id) on delete set null,
  issue_slug text not null,
  response jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists issue_responses_bubble_profile_id_idx
  on public.issue_responses (bubble_profile_id);

create index if not exists issue_responses_issue_slug_idx
  on public.issue_responses (issue_slug);

-- Future: premium / full feedback purchases linked to a profile.
create table if not exists public.premium_profiles (
  id uuid primary key default gen_random_uuid(),
  bubble_profile_id uuid references public.bubble_profiles (id) on delete set null,
  status text not null default 'pending',
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists premium_profiles_bubble_profile_id_idx
  on public.premium_profiles (bubble_profile_id);

create index if not exists premium_profiles_status_idx
  on public.premium_profiles (status);

alter table public.bubble_profiles enable row level security;
alter table public.issue_responses enable row level security;
alter table public.premium_profiles enable row level security;

-- Writes happen via service role from API routes only.
