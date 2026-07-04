// app/api/stripe-webhook/route.js
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

// Required in App Router to get the raw body for Stripe signature verification
export const dynamic = 'force-dynamic'

export async function POST(request) {
  const body      = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    if (session.payment_status === 'paid') {
      const { tourId, date, name, email, phone, guests, message } = session.metadata

      // Update booking status to paid
      const { error: updateError } = await supabaseAdmin
        .from('bookings')
        .update({ status: 'paid' })
        .eq('stripe_session_id', session.id)

      if (updateError) {
        console.error('Failed to update booking status:', updateError)
        // Upsert fallback in case the pending insert failed earlier
        await supabaseAdmin.from('bookings').upsert({
          tour_id:           tourId,
          date,
          name,
          email,
          phone,
          guests:            parseInt(guests, 10),
          message:           message || null,
          stripe_session_id: session.id,
          status:            'paid',
        }, { onConflict: 'stripe_session_id' })
      }

      // Close the availability slot
      await supabaseAdmin
        .from('availability')
        .update({ open: false })
        .eq('tour_id', tourId)
        .eq('date', date)

      console.log(`✅ Booking confirmed: ${name} — ${date}`)
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object
    await supabaseAdmin
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('stripe_session_id', session.id)
  }

  return NextResponse.json({ received: true })
}
