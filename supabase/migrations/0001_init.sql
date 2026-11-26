-- MyPorto — schema awal
-- Jalankan seluruh file ini sekali di Supabase SQL Editor.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- PROFIL (satu baris)
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default '',
  headline text not null default '',
  bio text not null default '',
  photo_url text,
  cv_url text,
  location text default 'Bandung, Indonesia',
  email text,
  linkedin_url text,
  github_url text,
  whatsapp_url text,
  availability text default 'Terbuka untuk peluang full-time',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- PROYEK
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  problem text not null default '',
  solution text not null default '',
  outcome text not null default '',
  body text,
  role text,
  tech text[] not null default '{}',
  thumbnail_url text,
  gallery text[] not null default '{}',
  repo_url text,
  demo_url text,
  year int,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- PENGALAMAN
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  employment_type text,
  location text,
  start_date date not null,
  end_date date,
  description text,
  highlights text[] not null default '{}',
  tech text[] not null default '{}',
  logo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- KEAHLIAN
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- SERTIFIKASI
create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null,
  issued_at date,
  credential_url text,
  file_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- PESAN KONTAK
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  ip_hash text,
  created_at timestamptz not null default now()
);

-- INDEX
create index if not exists projects_published_idx on public.projects (published, sort_order);
create index if not exists experiences_sort_idx on public.experiences (sort_order);
create index if not exists skills_category_idx on public.skills (category, sort_order);
create index if not exists certifications_sort_idx on public.certifications (sort_order);
create index if not exists messages_created_idx on public.messages (created_at desc);

-- TRIGGER updated_at
drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists experiences_updated_at on public.experiences;
create trigger experiences_updated_at before update on public.experiences
for each row execute function public.set_updated_at();

drop trigger if exists certifications_updated_at on public.certifications;
create trigger certifications_updated_at before update on public.certifications
for each row execute function public.set_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.experiences enable row level security;
alter table public.skills enable row level security;
alter table public.certifications enable row level security;
alter table public.messages enable row level security;

-- profiles
drop policy if exists profiles_public_read on public.profiles;
create policy profiles_public_read on public.profiles
  for select using (true);

drop policy if exists profiles_admin_write on public.profiles;
create policy profiles_admin_write on public.profiles
  for all to authenticated using (true) with check (true);

-- projects
drop policy if exists projects_public_read on public.projects;
create policy projects_public_read on public.projects
  for select using (published = true);

drop policy if exists projects_admin_write on public.projects;
create policy projects_admin_write on public.projects
  for all to authenticated using (true) with check (true);

-- experiences
drop policy if exists experiences_public_read on public.experiences;
create policy experiences_public_read on public.experiences
  for select using (true);

drop policy if exists experiences_admin_write on public.experiences;
create policy experiences_admin_write on public.experiences
  for all to authenticated using (true) with check (true);

-- skills
drop policy if exists skills_public_read on public.skills;
create policy skills_public_read on public.skills
  for select using (true);

drop policy if exists skills_admin_write on public.skills;
create policy skills_admin_write on public.skills
  for all to authenticated using (true) with check (true);

-- certifications
drop policy if exists certifications_public_read on public.certifications;
create policy certifications_public_read on public.certifications
  for select using (true);

drop policy if exists certifications_admin_write on public.certifications;
create policy certifications_admin_write on public.certifications
  for all to authenticated using (true) with check (true);

-- messages: siapa pun boleh mengirim, hanya admin yang boleh membaca
drop policy if exists messages_public_insert on public.messages;
create policy messages_public_insert on public.messages
  for insert with check (true);

drop policy if exists messages_admin_read on public.messages;
create policy messages_admin_read on public.messages
  for select to authenticated using (true);

drop policy if exists messages_admin_update on public.messages;
create policy messages_admin_update on public.messages
  for update to authenticated using (true) with check (true);

drop policy if exists messages_admin_delete on public.messages;
create policy messages_admin_delete on public.messages
  for delete to authenticated using (true);

-- STORAGE
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists portfolio_public_read on storage.objects;
create policy portfolio_public_read on storage.objects
  for select using (bucket_id = 'portfolio');

drop policy if exists portfolio_admin_insert on storage.objects;
create policy portfolio_admin_insert on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio');

drop policy if exists portfolio_admin_update on storage.objects;
create policy portfolio_admin_update on storage.objects
  for update to authenticated using (bucket_id = 'portfolio') with check (bucket_id = 'portfolio');

drop policy if exists portfolio_admin_delete on storage.objects;
create policy portfolio_admin_delete on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio');
