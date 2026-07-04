// app/admin/page.jsx
import { supabaseAdmin } from '@/lib/supabase'
import AdminPanel from './AdminPanel'
import styles from './admin.module.css'

export const metadata = { title: 'Admin — Rebelde Boats' }

// Basic auth check via environment variable
// Set ADMIN_SECRET in .env.local and visit /admin?key=YOUR_SECRET
export default async function AdminPage({ searchParams }) {

const { key } = await searchParams
  if (!key || key !== process.env.ADMIN_SECRET) {
    return (
      <main className={styles.main}>
        <div className={styles.authError}>
          <h1>Access denied</h1>
          <p>Append <code>?key=YOUR_ADMIN_SECRET</code> to the URL.</p>
        </div>
      </main>
    )
  }

  const { data: tours } = await supabaseAdmin
    .from('tours')
    .select('*')
    .eq('active', true)
    .order('name')

  // Fetch all upcoming availability
  const today = new Date().toISOString().slice(0, 10)
  const { data: availability } = await supabaseAdmin
    .from('availability')
    .select('*')
    .gte('date', today)
    .order('date')

  // Fetch upcoming bookings
  const { data: bookings } = await supabaseAdmin
    .from('bookings')
    .select('*, tours(name)')
    .gte('date', today)
    .order('date')

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Rebelde Boats · Admin</h1>
        <p className={styles.sub}>Manage availability and view upcoming bookings</p>
      </div>
      <AdminPanel
        tours={tours || []}
        availability={availability || []}
        bookings={bookings || []}
        adminKey={key}
      />
    </main>
  )
}
