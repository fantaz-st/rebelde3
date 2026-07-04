// src/app/api/admin/availability/route.js
import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from "@/lib/supabase"
const supabaseAdmin = getSupabaseAdmin()

async function authCheck(request) {
  const token = request.headers.get('x-admin-token')
  if (!token) return false
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  return !error && !!user
}

// POST — open or close a date
export async function POST(request) {
  if (!await authCheck(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { date, open } = await request.json()
  if (!date || open === undefined) {
    return NextResponse.json({ error: 'date and open required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('availability_shared')
    .upsert({ date, open }, { onConflict: 'date' })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ record: data })
}
