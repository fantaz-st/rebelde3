// src/app/api/availability/route.js
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const from = searchParams.get('from') || new Date().toISOString().slice(0, 10)
  const to   = searchParams.get('to')

  // Fetch open dates from shared pool
  let query = supabase
    .from('availability_shared')
    .select('date')
    .eq('open', true)
    .gte('date', from)

  if (to) query = query.lte('date', to)

  const { data, error } = await query.order('date')

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }

  const dates = (data || []).map(r => r.date)

  if (dates.length === 0) {
    return NextResponse.json({ available: [] })
  }

  // Exclude dates that already have a paid booking
  const { data: booked } = await supabase
    .from('bookings')
    .select('date')
    .eq('status', 'paid')
    .in('date', dates)

  const bookedDates = new Set((booked || []).map(r => r.date))
  const available   = dates.filter(d => !bookedDates.has(d))

  return NextResponse.json({ available })
}
