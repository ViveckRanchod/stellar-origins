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

-- 5. Spreadsheet: ONE ROW PER STUDENT with every answer in its own column (easiest to read).
--    Run it, then Export -> CSV, and open the file in Excel or Google Sheets.
with r as (select user_id, step, answer from public.responses),
quiz as (
  select
    user_id,
    round(100.0 * count(*) filter (where answer->>'galaxy' = 'A') / count(*)) as a,
    round(100.0 * count(*) filter (where answer->>'galaxy' = 'B') / count(*)) as b,
    round(100.0 * count(*) filter (where answer->>'galaxy' = 'C') / count(*)) as c,
    round(100.0 * count(*) filter (where answer->>'galaxy' = 'D') / count(*)) as d
  from r
  where step like 'q%'
  group by user_id
)
select
  u.raw_user_meta_data->>'first_name' as "First name",
  u.raw_user_meta_data->>'last_name' as "Surname",
  u.email as "Email",
  to_char(u.created_at, 'YYYY-MM-DD HH24:MI') as "Signed up",
  replace(av.answer->>'avatar', 'avatar_', 'Star ') as "Forge Your Star: star chosen",
  av.answer->>'justification' as "Why this star",
  case cu.answer->>'accessory'
    when 'accessory_1' then 'Rocks'
    when 'accessory_2' then 'Shooting star'
    when 'accessory_3' then 'Skirt'
    when 'accessory_4' then 'Planets'
    when 'none' then 'No accessory'
  end as "Make It Yours: accessory",
  cu.answer->>'justification' as "Why this accessory",
  fu.answer->>'future' as "Looking Ahead: heading toward",
  fu.answer->>'future_why' as "Why this is meaningful",
  fu.answer->>'future_needs' as "What would need to be true",
  quiz.a as "Andromeda Galaxy %",
  quiz.b as "Phoenix Cluster %",
  quiz.c as "Nexus Point %",
  quiz.d as "Triangulum Galaxy %",
  case s.disruption
    when 'd1' then 'Restructuring'
    when 'd2' then 'Project cancellation'
    when 'd3' then 'Leadership change'
    when 'd4' then 'Resource cut'
  end as "Disruption",
  dq.answer->>'answer_1' as "Reflection: What matters?",
  dq.answer->>'answer_2' as "Reflection: Reconnect with purpose",
  dq.answer->>'answer_3' as "Reflection: Craft your response",
  gr.answer->>'answer_1' as "Regroup: Different perspectives",
  gr.answer->>'answer_2' as "Regroup: Different ways of crafting",
  gr.answer->>'answer_3' as "Regroup: The bigger picture"
from auth.users u
left join r av on av.user_id = u.id and av.step = 'avatar'
left join r cu on cu.user_id = u.id and cu.step = 'customize'
left join r fu on fu.user_id = u.id and fu.step = 'future'
left join quiz on quiz.user_id = u.id
left join public.disruption_slots s on s.user_id = u.id
left join r dq on dq.user_id = u.id and dq.step = 'disruption-questions'
left join r gr on gr.user_id = u.id and gr.step = 'group'
order by u.created_at;
