// app/availability/page.jsx
import { supabase } from '@/lib/supabase'
import AvailabilityView from './AvailabilityView'
import styles from './availability.module.css'

export const metadata = {
  title: 'Availability — Rebelde Boats',
  description: 'Live availability for all Rebelde Boats private tours.',
}

// Revalidate every 5 minutes so it stays fresh without a full rebuild
export const revalidate = 300

export default async function AvailabilityPage() {
  const today = new Date().toISOString().slice(0, 10)

  // Fetch 3 months of availability and booking data
  const threeMonthsOut = new Date()
  threeMonthsOut.setMonth(threeMonthsOut.getMonth() + 3)
  const until = threeMonthsOut.toISOString().slice(0, 10)

  const [{ data: tours }, { data: availability }, { data: bookings }] = await Promise.all([
    supabase.from('tours').select('id, slug, name, duration, deposit_eur').eq('active', true).order('name'),
    supabase.from('availability').select('tour_id, date, open').gte('date', today).lte('date', until),
    supabase.from('bookings').select('tour_id, date, status').eq('status', 'paid').gte('date', today).lte('date', until),
  ])

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Rebelde Boats · Split</p>
        <h1 className={styles.heading}>Availability</h1>
        <p className={styles.sub}>Live schedule for all private tours. Updated in real time.</p>
      </div>

      <AvailabilityView
        tours={tours || []}
        availability={availability || []}
        bookings={bookings || []}
      />
    </main>
  )
}
