-- ==============================================================================
-- SORGET / ATTRIBUTER SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. DROP EXISTING VIEWS IF PRESENT (To avoid dependency conflicts)
drop view if exists button_click_counts cascade;
drop view if exists page_view_counts cascade;

-- 2. CREATE EVENTS TABLE (If it doesn't exist yet)
create table if not exists events (
  id           bigint generated always as identity primary key,
  session_id   text,
  visitor_id   text,
  user_email   text,
  event_type   text not null default 'click',
  event_name   text,
  target_tag   text,
  target_text  text,
  target_href  text,
  target_id    text,
  page_path    text,
  page_url     text,
  referrer     text,
  user_agent   text,
  properties   jsonb default '{}'::jsonb,
  created_at   timestamptz default now()
);

-- 3. ENSURE ALL COLUMNS EXIST (If table previously existed with old schema)
alter table events add column if not exists session_id text;
alter table events add column if not exists visitor_id text;
alter table events add column if not exists user_email text;
alter table events add column if not exists event_type text not null default 'click';
alter table events add column if not exists event_name text;
alter table events add column if not exists target_tag text;
alter table events add column if not exists target_text text;
alter table events add column if not exists target_href text;
alter table events add column if not exists target_id text;
alter table events add column if not exists page_path text;
alter table events add column if not exists page_url text;
alter table events add column if not exists referrer text;
alter table events add column if not exists user_agent text;
alter table events add column if not exists properties jsonb default '{}'::jsonb;
alter table events add column if not exists created_at timestamptz default now();

-- Migrate old column values if they exist
do $$
begin
  if exists (select 1 from information_schema.columns where table_name = 'events' and column_name = 'event') then
    update events set event_name = event where event_name is null;
  end if;
  if exists (select 1 from information_schema.columns where table_name = 'events' and column_name = 'page') then
    update events set page_path = page where page_path is null;
  end if;
end $$;

-- 4. CREATE LEADS TABLE (Stores structured form & signup data)
create table if not exists leads (
  id           bigint generated always as identity primary key,
  visitor_id   text,
  session_id   text,
  full_name    text,
  email        text,
  company      text,
  website      text,
  cms          text,
  form_tool    text,
  crm          text,
  plan         text,
  step_reached text,
  raw_data     jsonb default '{}'::jsonb,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- 4b. CREATE CONTACTS TABLE (Stores Contact Us page form submissions)
create table if not exists contacts (
  id           bigint generated always as identity primary key,
  visitor_id   text,
  session_id   text,
  full_name    text,
  email        text not null,
  company      text,
  message      text not null,
  created_at   timestamptz default now()
);

-- 5. INDEXES FOR FAST QUERYING
create index if not exists idx_events_event_name on events(event_name);
create index if not exists idx_events_event_type on events(event_type);
create index if not exists idx_events_target_text on events(target_text);
create index if not exists idx_events_page_path on events(page_path);
create index if not exists idx_events_visitor_id on events(visitor_id);
create index if not exists idx_events_session_id on events(session_id);
create index if not exists idx_events_created_at on events(created_at desc);
create index if not exists idx_leads_email on leads(email);
create index if not exists idx_leads_visitor_id on leads(visitor_id);
create index if not exists idx_contacts_email on contacts(email);
create index if not exists idx_contacts_created_at on contacts(created_at desc);

-- 6. ROW LEVEL SECURITY (RLS) POLICIES & GRANTS
alter table events enable row level security;
alter table leads enable row level security;
alter table contacts enable row level security;

-- Clear old policies
drop policy if exists "allow anon insert on events" on events;
drop policy if exists "allow anon select on events" on events;
drop policy if exists "allow_all_events" on events;
drop policy if exists "allow_all_events_anon" on events;

drop policy if exists "allow anon insert on leads" on leads;
drop policy if exists "allow anon update on leads" on leads;
drop policy if exists "allow anon select on leads" on leads;
drop policy if exists "allow_all_leads" on leads;
drop policy if exists "allow_all_leads_anon" on leads;

drop policy if exists "allow_all_contacts" on contacts;

-- Create all-permissive policies for public (covers both anon visitors & authenticated users)
create policy "allow_all_events" on events
  for all to public using (true) with check (true);

create policy "allow_all_leads" on leads
  for all to public using (true) with check (true);

create policy "allow_all_contacts" on contacts
  for all to public using (true) with check (true);

-- Explicitly grant permissions to anon and authenticated roles
grant all on table events to anon, authenticated, service_role, postgres;
grant all on table leads to anon, authenticated, service_role, postgres;
grant all on table contacts to anon, authenticated, service_role, postgres;
grant usage, select on all sequences in schema public to anon, authenticated, service_role, postgres;


-- 7. CONVENIENT ANALYTICAL VIEWS
-- View: Click count summary by button / action name
create or replace view button_click_counts as
select 
  event_name,
  target_text,
  page_path,
  count(*) as total_clicks,
  count(distinct visitor_id) as unique_visitors,
  min(created_at) as first_clicked_at,
  max(created_at) as last_clicked_at
from events
where event_type = 'click'
group by event_name, target_text, page_path
order by total_clicks desc;

-- View: Page views summary
create or replace view page_view_counts as
select 
  page_path,
  count(*) as total_views,
  count(distinct visitor_id) as unique_visitors,
  count(distinct session_id) as unique_sessions
from events
where event_type = 'pageview'
group by page_path
order by total_views desc;

-- ==============================================================================
-- 8. RESET / WIPE TEST DATA (Run in SQL editor whenever you want a fresh start)
-- ==============================================================================
-- To wipe all leads & click events data and reset ID counters:
-- truncate table leads, events restart identity cascade;



