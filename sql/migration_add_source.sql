-- ============================================================
-- MIGRATION: Add booking source tracking
-- Run this in Supabase SQL Editor (after the original schema.sql)
-- ============================================================

-- Add source column to bookings
alter table bookings
  add column if not exists source text
    not null default 'website'
    check (source in ('website', 'tripadvisor', 'getyourguide', 'walkin'));

-- Manually-entered bookings don't need name/email/phone (they come from external platforms)
-- Make those columns nullable for manual entries
alter table bookings
  alter column name  drop not null,
  alter column email drop not null,
  alter column phone drop not null;

-- Index for filtering by source
create index if not exists idx_bookings_source on bookings (source);

-- Allow public read on bookings for the /availability page
-- (only exposes date + tour_id + status — no personal data)
create policy "Public read bookings availability"
  on bookings for select
  using (true);
