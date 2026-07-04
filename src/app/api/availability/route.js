// app/api/availability/route.js
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const tourId = searchParams.get('tourId')
  const from   = searchParams.get('from')  // ISO date string, e.g. "2025-06-01"
  const to     = searchParams.get('to')    // ISO date string, e.g. "2025-08-31"

  if (!tourId) {
    return NextResponse.json({ error: 'tourId is required' }, { status: 400 })
  }

  // Fetch all open availability slots for this tour in the range
  let query = supabase
    .from('availability')
    .select('date')
    .eq('tour_id', tourId)
    .eq('open', true)
    .gte('date', from || new Date().toISOString().slice(0, 10))

  if (to) query = query.lte('date', to)

  const { data, error } = await query.order('date')

  if (error) {
    console.error('availability fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }

  // Also exclude dates that already have a paid booking for this tour
  const dates = (data || []).map(r => r.date)

  if (dates.length === 0) {
    return NextResponse.json({ available: [] })
  }

  const { data: booked } = await supabase
    .from('bookings')
    .select('date')
    .eq('tour_id', tourId)
    .eq('status', 'paid')
    .in('date', dates)

  const bookedDates = new Set((booked || []).map(r => r.date))
  const available = dates.filter(d => !bookedDates.has(d))

  return NextResponse.json({ available })
}
