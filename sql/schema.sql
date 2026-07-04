-- ============================================================
-- REBELDE BOATS — Booking System Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- TOURS
create table if not exists tours (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  duration    text not null check (duration in ('full', 'am', 'pm')),
  deposit_eur integer not null, -- in EUR cents (e.g. 40000 = €400)
  description text,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- AVAILABILITY
-- One row per (tour, date). Marks which dates are open for booking.
create table if not exists availability (
  id         uuid primary key default gen_random_uuid(),
  tour_id    uuid not null references tours(id) on delete cascade,
  date       date not null,
  open       boolean not null default true,
  created_at timestamptz not null default now(),
  unique (tour_id, date)
);

-- BOOKINGS
create table if not exists bookings (
  id                 uuid primary key default gen_random_uuid(),
  tour_id            uuid not null references tours(id),
  date               date not null,
  name               text not null,
  email              text not null,
  phone              text not null,
  guests             integer not null default 1,
  message            text,
  stripe_session_id  text unique,
  status             text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  created_at         timestamptz not null default now()
);

-- ============================================================
-- SEED: Tours
-- ============================================================
insert into tours (slug, name, duration, deposit_eur, description) values
(
  'blue-cave-five-islands',
  'Blue Cave & Five Islands',
  'full',
  40000,
  'The classic full-day Adriatic adventure. Visit the magical Blue Cave on Biševo, swim the Green Cave, explore Stiniva cove, and cruise the five islands of Vis.'
),
(
  'bol-hvar-pakleni',
  'Bol, Hvar & Pakleni Islands',
  'full',
  40000,
  'Full day exploring Zlatni Rat beach in Bol, the old town of Hvar, and the pine-scented Pakleni island chain.'
),
(
  'blue-lagoon-islands',
  'Blue Lagoon & The Islands',
  'am',
  30000,
  'Half-day escape to the crystal-clear Blue Lagoon on Krknjaši, with stops at Šolta and Maslinica.'
),
(
  'hvar-pakleni',
  'Hvar & Pakleni Islands',
  'full',
  40000,
  'A refined full-day journey through the lavender-scented streets of Hvar town and the secluded bays of the Pakleni archipelago.'
)
on conflict (slug) do nothing;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS
alter table tours       enable row level security;
alter table availability enable row level security;
alter table bookings    enable row level security;

-- Public can read active tours
create policy "Public read tours"
  on tours for select
  using (active = true);

-- Public can read availability
create policy "Public read availability"
  on availability for select
  using (true);

-- Public can insert bookings
create policy "Public insert bookings"
  on bookings for insert
  with check (true);

-- Service role (webhook) can update bookings
-- (handled via service_role key in the webhook API route — no RLS policy needed)

-- ============================================================
-- INDEXES
-- ============================================================
create index if not exists idx_availability_tour_date on availability (tour_id, date);
create index if not exists idx_bookings_tour_date     on bookings (tour_id, date);
create index if not exists idx_bookings_stripe        on bookings (stripe_session_id);
