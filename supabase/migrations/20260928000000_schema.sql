-- Run once in the Supabase SQL Editor.
-- Names/surnames live on the auth user (raw_user_meta_data), visible under Authentication > Users.
-- Content (questions, galaxies, avatars, disruptions) lives in src/content.ts, not the DB.

-- 1. Every answer a student gives, one row per step (avatar, customize, future, q1..q20, disruption-questions, group).
create table public.responses (
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  step text not null,
  answer jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, step) -- re-answering a step overwrites it
);

alter table public.responses enable row level security;
create policy "Students manage their own responses" on public.responses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 2. Disruptions: a fixed stack of slots. Seeded round-robin, handed out in id order,
--    so assignment is always even (d1,d2,d3,d4,d1,...) and a used slot is never reused.
create table public.disruption_slots (
  id bigint generated always as identity primary key,
  disruption text not null,                                  -- key from src/content.ts (d1..d4)
  user_id uuid unique references auth.users on delete cascade -- null = unused
);

alter table public.disruption_slots enable row level security;
create policy "Students see their own slot" on public.disruption_slots
  for select using (auth.uid() = user_id);

-- 100 students max → 100 slots. Change 99 / the key list if that changes.
insert into public.disruption_slots (disruption)
select (array['d1','d2','d3','d4'])[(g % 4) + 1] from generate_series(0, 99) g;

-- Pops the next unused slot for the current user. Idempotent: calling again returns the same disruption.
create function public.assign_disruption() returns text
language plpgsql security definer set search_path = public as $$
declare d text;
begin
  select disruption into d from disruption_slots where user_id = auth.uid();
  if d is not null then return d; end if;

  update disruption_slots set user_id = auth.uid()
  where id = (select id from disruption_slots where user_id is null order by id limit 1 for update skip locked)
  returning disruption into d;

  return d; -- null means the stack is empty
end $$;

revoke execute on function public.assign_disruption() from public, anon;
grant execute on function public.assign_disruption() to authenticated;
