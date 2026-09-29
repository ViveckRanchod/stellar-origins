-- Stellar Origins: data export queries
-- How to use: Supabase dashboard -> SQL Editor -> New query -> paste ONE query -> Run
--             -> Export (CSV) above the results. These only READ data.

-- 1. Every answer, one row per student per step
select
  u.email,
  u.raw_user_meta_data->>'first_name' as first_name,
  u.raw_user_meta_data->>'last_name'  as last_name,
  r.step,
  r.answer,
  r.updated_at
from public.responses r
join auth.users u on u.id = r.user_id
order by u.email, r.updated_at;

-- 2. Galaxy results: how many quiz answers each student gave per galaxy (A-D)
select
  u.email,
  u.raw_user_meta_data->>'first_name' as first_name,
  u.raw_user_meta_data->>'last_name'  as last_name,
  r.answer->>'galaxy' as galaxy,
  count(*) as answers,
  round(100.0 * count(*) / sum(count(*)) over (partition by u.id)) as percent
from public.responses r
join auth.users u on u.id = r.user_id
where r.step like 'q%'
group by u.id, u.email, first_name, last_name, galaxy
order by u.email, answers desc;

-- 3. Which disruption each student was given
select
  u.email,
  u.raw_user_meta_data->>'first_name' as first_name,
  u.raw_user_meta_data->>'last_name'  as last_name,
  s.disruption
from public.disruption_slots s
join auth.users u on u.id = s.user_id
order by s.id;

-- 4. Everyone who signed up (including people who have not answered yet)
select
  email,
  raw_user_meta_data->>'first_name' as first_name,
  raw_user_meta_data->>'last_name'  as last_name,
  created_at
from auth.users
order by created_at;
