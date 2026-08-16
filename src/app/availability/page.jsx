import { pageMetadata } from "@/lib/schema";
import { supabase } from '@/lib/supabase'
import AvailabilityView from './AvailabilityView'
import styles from './availability.module.css'

export const revalidate = 300

export const metadata = {
  ...pageMetadata({
    path: "/availability",
    title: "Availability",
    description:
      "Live availability calendar for private boat tours with Rebelde Boats, Split.",
  }),
  // A booking utility page: useful to guests, not a search result. robots.txt
  // blocks crawling, which does not prevent indexing on its own.
  robots: { index: false, follow: true },
};

export default async function AvailabilityPage() {
  const today = new Date().toISOString().slice(0, 10)
  const threeMonthsOut = new Date()
  threeMonthsOut.setMonth(threeMonthsOut.getMonth() + 3)
  const until = threeMonthsOut.toISOString().slice(0, 10)

  const [{ data: tours }, { data: availability }, { data: bookings }] = await Promise.all([
    supabase.from('tours').select('id, slug, name, duration, deposit_eur, rest_eur').eq('active', true).order('name'),
    supabase.from('availability_shared').select('date, open').gte('date', today).lte('date', until),
    supabase.from('bookings').select('date, status').eq('status', 'paid').gte('date', today).lte('date', until),
  ])

  return (
    <div className={styles.main}>
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
    </div>
  )
}
