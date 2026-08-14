import { supabase } from '@/lib/supabase'
import BookingFlow from '@/components/booking/BookingFlow'
import styles from './book.module.css'

export const metadata = {
  title: 'Book a Tour — Rebelde Boats',
  description:
    'Reserve your private boat tour along the Dalmatian coast. Pay a deposit to secure your date.',
}

export default async function BookPage({ searchParams }) {
  const { date: preselectedDate, tour: preselectedTourSlug } = await searchParams

  const { data: tours } = await supabase
    .from('tours')
    .select('*')
    .eq('active', true)
    .order('name')

  return (
    <div className={styles.main}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Private boat tours · Split, Croatia</p>
        <h1 className={styles.heading}>Reserve your day on the water</h1>
        <p className={styles.subheading}>
          Choose your tour, pick a date, and secure it with a deposit.
          The balance is settled in cash on the morning of departure.
        </p>
      </div>

      <div className={styles.content}>
        <BookingFlow tours={tours || []} preselectedDate={preselectedDate || null} preselectedTourSlug={preselectedTourSlug || null} />
      </div>
    </div>
  )
}
