-- Bevolkingsgroep is optional; no longer collected in the quick form.
alter table public.bubble_profiles
  alter column race drop not null;
