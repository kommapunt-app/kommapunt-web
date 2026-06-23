-- Premium feature tagging + profile comparison storage.

alter table public.premium_profiles
  add column if not exists feature text not null default 'profile_comparison';

alter table public.premium_profiles
  add column if not exists expires_at timestamptz;

create index if not exists premium_profiles_feature_idx
  on public.premium_profiles (feature);

-- Flexible comparison model for person/team/organisation pairings.
create table if not exists public.profile_comparisons (
  id uuid primary key default gen_random_uuid(),
  comparison_type text not null check (
    comparison_type in (
      'person_vs_person',
      'person_vs_partner',
      'parent_vs_child',
      'team_vs_team',
      'organisation_vs_person'
    )
  ),
  status text not null default 'completed' check (
    status in ('draft', 'completed', 'archived')
  ),
  initiator_profile_id uuid references public.bubble_profiles (id) on delete set null,
  left_side jsonb not null,
  right_side jsonb not null,
  similarity_score numeric(5, 2),
  result jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profile_comparisons_initiator_idx
  on public.profile_comparisons (initiator_profile_id);

create index if not exists profile_comparisons_type_idx
  on public.profile_comparisons (comparison_type);

create index if not exists profile_comparisons_created_at_idx
  on public.profile_comparisons (created_at desc);

alter table public.profile_comparisons enable row level security;

grant select, insert on public.profile_comparisons to service_role;
grant select, insert, update on public.premium_profiles to service_role;
