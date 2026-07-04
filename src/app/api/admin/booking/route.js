// app/api/admin/booking/route.js
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

function authCheck(request) {
  const key = request.headers.get('x-admin-key')
  return key && key === process.env.ADMIN_SECRET
}

// POST — log a manual booking from an external source
export async function POST(request) {
  if (!authCheck(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { tourId, date, source } = await request.json()

  if (!tourId || !date || !source) {
    return NextResponse.json({ error: 'tourId, date, source required' }, { status: 400 })
  }

  const VALID_SOURCES = ['website', 'tripadvisor', 'getyourguide', 'walkin']
  if (!VALID_SOURCES.includes(source)) {
    return NextResponse.json({ error: 'Invalid source' }, { status: 400 })
  }

  // Check availability slot exists and is open
  const { data: avail } = await supabaseAdmin
    .from('availability')
    .select('open')
    .eq('tour_id', tourId)
    .eq('date', date)
    .single()

  if (!avail?.open) {
    return NextResponse.json({ error: 'This date is not open for this tour' }, { status: 409 })
  }

  // Check not already booked
  const { data: existing } = await supabaseAdmin
    .from('bookings')
    .select('id')
    .eq('tour_id', tourId)
    .eq('date', date)
    .eq('status', 'paid')
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: 'A booking already exists for this date' }, { status: 409 })
  }

  // Insert booking as paid (it's already confirmed externally)
  const { data: booking, error: insertError } = await supabaseAdmin
    .from('bookings')
    .insert({
      tour_id: tourId,
      date,
      source,
      status: 'paid',
      guests: 1, // not tracked for manual bookings
    })
    .select()
    .single()

  if (insertError) {
    console.error('Manual booking insert error:', insertError)
    return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 })
  }

  // Close the availability slot
  await supabaseAdmin
    .from('availability')
    .update({ open: false })
    .eq('tour_id', tourId)
    .eq('date', date)

  return NextResponse.json({ booking })
}

// DELETE — cancel a manual booking and reopen the slot
export async function DELETE(request) {
  if (!authCheck(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { bookingId, tourId, date } = await request.json()

  if (!bookingId || !tourId || !date) {
    return NextResponse.json({ error: 'bookingId, tourId, date required' }, { status: 400 })
  }

  // Cancel the booking
  const { error: cancelError } = await supabaseAdmin
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', bookingId)

  if (cancelError) {
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 })
  }

  // Reopen the availability slot
  await supabaseAdmin
    .from('availability')
    .update({ open: true })
    .eq('tour_id', tourId)
    .eq('date', date)

  return NextResponse.json({ ok: true })
}
