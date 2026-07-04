// src/app/api/admin/booking/route.js
import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

async function authCheck(request) {
  const token = request.headers.get('x-admin-token')
  if (!token) return false
  const { createServerClient } = await import('@supabase/ssr')
  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
  // Verify the token by calling getUser with it as Bearer
  const { createClient } = await import('@supabase/supabase-js')
  const userClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  )
  const { data: { user }, error } = await userClient.auth.getUser()
  return !error && !!user
}

const VALID_SOURCES = ['website', 'tripadvisor', 'getyourguide', 'walkin']

export async function POST(request) {
  if (!await authCheck(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { tourId, date, source, name, phone } = await request.json()

  if (!tourId || !date || !source || !VALID_SOURCES.includes(source)) {
    return NextResponse.json({ error: 'tourId, date, valid source required' }, { status: 400 })
  }

  const supabaseAdmin = getSupabaseAdmin()

  const { data: avail } = await supabaseAdmin
    .from('availability_shared').select('open').eq('date', date).single()
  if (!avail?.open) {
    return NextResponse.json({ error: 'Date is not open' }, { status: 409 })
  }

  const { data: existing } = await supabaseAdmin
    .from('bookings').select('id').eq('date', date).eq('status', 'paid').maybeSingle()
  if (existing) {
    return NextResponse.json({ error: 'Already booked' }, { status: 409 })
  }

  const { data: booking, error } = await supabaseAdmin
    .from('bookings')
    .insert({
      tour_id: tourId,
      date,
      source,
      status: 'paid',
      guests: 1,
      name:  name  || null,
      phone: phone || null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: 'Failed to save' }, { status: 500 })

  await supabaseAdmin
    .from('availability_shared').update({ open: false }).eq('date', date)

  return NextResponse.json({ booking })
}

export async function DELETE(request) {
  if (!await authCheck(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { bookingId, date } = await request.json()
  if (!bookingId || !date) {
    return NextResponse.json({ error: 'bookingId and date required' }, { status: 400 })
  }

  const supabaseAdmin = getSupabaseAdmin()
  await supabaseAdmin.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId)
  await supabaseAdmin.from('availability_shared').update({ open: true }).eq('date', date)

  return NextResponse.json({ ok: true })
}
