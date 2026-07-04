// src/app/[locale]/availability/page.jsx
import { supabase } from '@/lib/supabase'
import AvailabilityView from './AvailabilityView'
import styles from './availability.module.css'

export const revalidate = 300

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = {
    en: 'Availability — Rebelde Boats',
    hr: 'Dostupnost — Rebelde Boats',
    de: 'Verfügbarkeit — Rebelde Boats',
    es: 'Disponibilidad — Rebelde Boats',
    it: 'Disponibilità — Rebelde Boats',
    fr: 'Disponibilité — Rebelde Boats',
  }
  return { title: titles[locale] ?? titles.en }
}

export default async function AvailabilityPage() {
  const today = new Date().toISOString().slice(0, 10)
  const threeMonthsOut = new Date()
  threeMonthsOut.setMonth(threeMonthsOut.getMonth() + 3)
  const until = threeMonthsOut.toISOString().slice(0, 10)

  const [{ data: tours }, { data: availability }, { data: bookings }] = await Promise.all([
    supabase.from('tours').select('id, slug, name, duration, deposit_eur').eq('active', true).order('name'),
    supabase.from('availability_shared').select('date, open').gte('date', today).lte('date', until),
    supabase.from('bookings').select('date, status').eq('status', 'paid').gte('date', today).lte('date', until),
  ])

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        {/* <p className={styles.eyebrow}>Rebelde Boats · Split</p> */}
        <h1 className={styles.heading}>Rebelde Boats -Availability</h1>
        <p className={styles.sub}>Live availability for private boat tours. Updated every 5 minutes.</p>
      </div>
      <AvailabilityView
        tours={tours || []}
        availability={availability || []}
        bookings={bookings || []}
      />
    </main>
  )
}
