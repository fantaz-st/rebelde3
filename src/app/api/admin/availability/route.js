// app/api/admin/availability/route.js
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

function authCheck(request) {
  const key = request.headers.get('x-admin-key')
  return key && key === process.env.ADMIN_SECRET
}

// POST — toggle or set availability for a date
export async function POST(request) {
  if (!authCheck(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { tourId, date, open } = await request.json()

  if (!tourId || !date || open === undefined) {
    return NextResponse.json({ error: 'tourId, date, open required' }, { status: 400 })
  }

  // Upsert — create or update
  const { data, error } = await supabaseAdmin
    .from('availability')
    .upsert({ tour_id: tourId, date, open }, { onConflict: 'tour_id,date' })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ record: data })
}

// DELETE — remove availability entry
export async function DELETE(request) {
  if (!authCheck(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { tourId, date } = await request.json()

  const { error } = await supabaseAdmin
    .from('availability')
    .delete()
    .eq('tour_id', tourId)
    .eq('date', date)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
