// src/app/api/availability/route.js
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Returns available slot info per date:
// { date, status: 'open' | 'am_only' | 'pm_only' | 'full' }
// 'open'    = both slots free
// 'am_only' = only AM slot free (PM is taken by a pm booking)
// 'pm_only' = only PM slot free (AM is taken by an am booking)
// 'full'    = completely booked, no slots available

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

  const { data: availData, error } = await query.order('date')
  if (error) {
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }

  const dates = (availData || []).map(r => r.date)
  if (dates.length === 0) {
    return NextResponse.json({ dates: [] })
  }

  // Fetch all paid bookings for these dates
  const { data: bookingData } = await supabase
    .from('bookings')
    .select('date, slot')
    .eq('status', 'paid')
    .in('date', dates)

  // Build a map of date -> slots taken
  const slotMap = new Map() // date -> Set of slots
  for (const b of (bookingData || [])) {
    if (!slotMap.has(b.date)) slotMap.set(b.date, new Set())
    slotMap.get(b.date).add(b.slot || 'full')
  }

  // Determine status for each date
  const result = dates.map(date => {
    const slots = slotMap.get(date) || new Set()

    if (slots.size === 0) return { date, status: 'open' }

    // Full day booking → completely blocked
    if (slots.has('full')) return { date, status: 'full' }

    const hasAM = slots.has('am')
    const hasPM = slots.has('pm')

    if (hasAM && hasPM) return { date, status: 'full' }
    if (hasAM)          return { date, status: 'pm_only' }  // AM taken, PM free
    if (hasPM)          return { date, status: 'am_only' }  // PM taken, AM free

    return { date, status: 'open' }
  }).filter(d => d.status !== 'full') // remove fully booked dates

  return NextResponse.json({ dates: result })
}
