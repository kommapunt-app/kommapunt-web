-- Run in Supabase SQL editor if bubble_profiles inserts fail with permission denied.
grant usage on schema public to service_role;
grant select, insert on public.bubble_profiles to service_role;
grant select, insert on public.issue_responses to service_role;
grant select, insert on public.premium_profiles to service_role;
