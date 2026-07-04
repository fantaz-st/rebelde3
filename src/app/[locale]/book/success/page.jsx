import { stripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
import styles from "./success.module.css";
import Link from "next/link";

export const metadata = {
  title: "Booking Confirmed — Rebelde Boats",
};

export default async function SuccessPage({ searchParams }) {
  const supabaseAdmin = getSupabaseAdmin();
  // In Next.js 15 searchParams is a Promise
  const { session_id: sessionId } = await searchParams;
  let booking = null;
  let tourName = null;

  if (sessionId) {
    try {
      await stripe.checkout.sessions.retrieve(sessionId);
      const { data } = await supabaseAdmin.from("bookings").select("*, tours(name)").eq("stripe_session_id", sessionId).single();

      if (data) {
        booking = data;
        tourName = data.tours?.name;
      }
    } catch {
      // Session not found — still show generic success
    }
  }

  const dateFormatted = booking?.date
    ? new Date(booking.date).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.heading}>You&apos;re booked.</h1>

        {booking ? (
          <>
            <p className={styles.body}>
              Your deposit has been received. We&apos;ll see you on the water, <strong>{booking.name}</strong>.
            </p>
            <div className={styles.details}>
              <div className={styles.row}>
                <span>Tour</span>
                <span>{tourName}</span>
              </div>
              <div className={styles.row}>
                <span>Date</span>
                <span>{dateFormatted}</span>
              </div>
              <div className={styles.row}>
                <span>Guests</span>
                <span>{booking.guests}</span>
              </div>
              <div className={styles.row}>
                <span>Confirmation sent to</span>
                <span>{booking.email}</span>
              </div>
            </div>
            <p className={styles.note}>The remaining balance is paid in cash on the morning of your tour. We&apos;ll be in touch with meet-up details closer to the date.</p>
          </>
        ) : (
          <p className={styles.body}>Your deposit has been received. A confirmation has been sent to your email.</p>
        )}

        <Link href="/" className={styles.homeLink}>
          ← Back to Rebelde Boats
        </Link>
      </div>
    </main>
  );
}
