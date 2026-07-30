-- Tidskapslen Hjemmeside – Version 06
-- Kør dette i Supabase SQL Editor for det samme projekt, som Studio bruger.

create table if not exists public.website_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  occasion text,
  event_date date,
  product_interest text,
  add_ons text[] not null default '{}',
  message text not null,
  status text not null default 'ny'
);

alter table public.website_inquiries enable row level security;

drop policy if exists "public can create website inquiries" on public.website_inquiries;
create policy "public can create website inquiries"
on public.website_inquiries
for insert
to anon
with check (true);

drop policy if exists "authenticated can read website inquiries" on public.website_inquiries;
create policy "authenticated can read website inquiries"
on public.website_inquiries
for select
to authenticated
using (true);

drop policy if exists "authenticated can update website inquiries" on public.website_inquiries;
create policy "authenticated can update website inquiries"
on public.website_inquiries
for update
to authenticated
using (true)
with check (true);
