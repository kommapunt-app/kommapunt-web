-- Deprecated: use profile_image_url via 007_profile_image_storage.sql instead.
-- Kept for environments that already applied this migration.
alter table public.bubble_profiles
  add column if not exists photo_url text;
