import { supabase } from '@/lib/supabase'
import BookingFlow from '@/components/booking/BookingFlow'
import styles from './book.module.css'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = {
    en: 'Book a Tour — Rebelde Boats',
    hr: 'Rezervirajte izlet — Rebelde Boats',
    de: 'Tour buchen — Rebelde Boats',
    es: 'Reservar un tour — Rebelde Boats',
    it: 'Prenota un tour — Rebelde Boats',
    fr: 'Réserver une excursion — Rebelde Boats',
  }
  const descs = {
    en: 'Reserve your private boat tour along the Dalmatian coast. Pay a deposit to secure your date.',
    hr: 'Rezervirajte privatni brodski izlet duž Dalmatinske obale. Platite depozit za osiguranje datuma.',
    de: 'Reservieren Sie Ihre private Bootstour entlang der Dalmatinischen Küste.',
    es: 'Reserve su tour privado en barco por la costa de Dalmacia.',
    it: 'Prenota il tuo tour privato in barca lungo la costa dalmata.',
    fr: 'Réservez votre excursion privée en bateau le long de la côte dalmate.',
  }
  return {
    title: titles[locale] ?? titles.en,
    description: descs[locale] ?? descs.en,
  }
}

export default async function BookPage() {
  const { data: tours } = await supabase
    .from('tours')
    .select('*')
    .eq('active', true)
    .order('name')

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Private boat tours · Split, Croatia</p>
        <h1 className={styles.heading}>Reserve your day on the water</h1>
        <p className={styles.subheading}>
          Choose your tour, pick a date, and secure it with a deposit.
          The balance is settled in cash on the morning of departure.
        </p>
      </div>

      <div className={styles.content}>
        <BookingFlow tours={tours || []} />
      </div>
    </main>
  )
}
