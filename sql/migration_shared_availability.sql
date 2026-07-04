-- ============================================================
-- MIGRATION: Shared availability pool + cleanup
-- Run in Supabase SQL Editor
-- ============================================================

-- 1. Create new shared availability table (no tour_id — one boat, shared pool)
create table if not exists availability_shared (
  id         uuid primary key default gen_random_uuid(),
  date       date unique not null,  -- unique: only one slot per day
  open       boolean not null default true,
  created_at timestamptz not null default now()
);

-- 2. Add source column to bookings if not already there
alter table bookings
  add column if not exists source text
    not null default 'website'
    check (source in ('website', 'tripadvisor', 'getyourguide', 'walkin'));

-- Make name/email/phone optional for external bookings
alter table bookings
  alter column name  drop not null,
  alter column email drop not null,
  alter column phone drop not null;

-- 3. RLS on new table
alter table availability_shared enable row level security;

create policy "Public read availability_shared"
  on availability_shared for select
  using (true);

-- Service role handles inserts/updates via API routes (no RLS needed)

-- 4. Index
create index if not exists idx_availability_shared_date on availability_shared (date);

-- ============================================================
-- NOTE: The old `availability` table (with tour_id) is kept
-- for reference but is no longer used by the booking system.
-- You can drop it later with: DROP TABLE availability;
-- ============================================================
