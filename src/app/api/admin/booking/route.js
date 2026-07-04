// src/app/api/admin/booking/route.js
import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'

async function authCheck(request) {
  const token = request.headers.get('x-admin-token')
  if (!token) return false
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

  const { tourId, date, source, slot, name, phone } = await request.json()

  if (!tourId || !date || !source || !VALID_SOURCES.includes(source)) {
    return NextResponse.json({ error: 'tourId, date, valid source required' }, { status: 400 })
  }

  const supabaseAdmin = getSupabaseAdmin()

  const { data: tour } = await supabaseAdmin
    .from('tours').select('duration').eq('id', tourId).single()
  if (!tour) return NextResponse.json({ error: 'Tour not found' }, { status: 404 })

  // Determine slot
  let bookingSlot
  if (tour.duration === 'full') {
    bookingSlot = 'full'
  } else if (tour.duration === 'half') {
    if (!slot || !['am', 'pm'].includes(slot)) {
      return NextResponse.json({ error: 'AM or PM slot required for half-day tour' }, { status: 400 })
    }
    bookingSlot = slot
  } else {
    bookingSlot = tour.duration
  }

  // Check availability
  const { data: avail } = await supabaseAdmin
    .from('availability_shared').select('open').eq('date', date).single()
  if (!avail?.open) {
    return NextResponse.json({ error: 'Date is not open' }, { status: 409 })
  }

  // Check slot conflicts
  const { data: existingBookings } = await supabaseAdmin
    .from('bookings').select('slot').eq('date', date).eq('status', 'paid')
  const takenSlots = new Set((existingBookings || []).map(b => b.slot || 'full'))

  if (bookingSlot === 'full' && takenSlots.size > 0) {
    return NextResponse.json({ error: 'Date already has a booking' }, { status: 409 })
  }
  if (bookingSlot !== 'full' && (takenSlots.has('full') || takenSlots.has(bookingSlot))) {
    return NextResponse.json({ error: `The ${bookingSlot} slot is already taken` }, { status: 409 })
  }

  const { data: booking, error } = await supabaseAdmin
    .from('bookings')
    .insert({
      tour_id: tourId, date, source,
      status: 'paid', guests: 1,
      name: name || null, phone: phone || null,
      slot: bookingSlot,
    })
    .select().single()

  if (error) return NextResponse.json({ error: 'Failed to save' }, { status: 500 })

  // Close day if now fully booked
  const allSlots = new Set([...takenSlots, bookingSlot])
  const fullyBooked = allSlots.has('full') || (allSlots.has('am') && allSlots.has('pm'))
  if (fullyBooked) {
    await supabaseAdmin.from('availability_shared').update({ open: false }).eq('date', date)
  }

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
