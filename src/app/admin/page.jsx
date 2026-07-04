// src/app/admin/page.jsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { getSupabaseAdmin } from '@/lib/supabase'
import AdminPanel from './AdminPanel'

export const metadata = { title: 'Admin — Rebelde Boats' }
export const dynamic = 'force-dynamic'

async function getSessionUser() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll() {},
        },
      }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    const { data: { session } } = await supabase.auth.getSession()
    return { user, accessToken: session?.access_token }
  } catch {
    return null
  }
}

export default async function AdminPage() {
  const session = await getSessionUser()
  if (!session) redirect('/admin/login')

  const supabaseAdmin = getSupabaseAdmin()
  const today = new Date().toISOString().slice(0, 10)

  const [{ data: tours }, { data: availability }, { data: bookings }] = await Promise.all([
    supabaseAdmin.from('tours').select('*').eq('active', true).order('name'),
    supabaseAdmin.from('availability_shared').select('*').gte('date', today).order('date'),
    supabaseAdmin.from('bookings').select('*, tours(name)').gte('date', today).neq('status', 'cancelled').order('date'),
  ])

  return (
    <AdminPanel
      tours={tours || []}
      availability={availability || []}
      bookings={bookings || []}
      accessToken={session.accessToken}
    />
  )
}
