// src/app/api/stripe-webhook/route.js
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getSupabaseAdmin } from "@/lib/supabase"
const supabaseAdmin = getSupabaseAdmin()

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const body      = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    if (session.payment_status === 'paid') {
      const { tourId, date, name, email, phone, guests, message } = session.metadata

      const { error: updateError } = await supabaseAdmin
        .from('bookings')
        .update({ status: 'paid' })
        .eq('stripe_session_id', session.id)

      if (updateError) {
        await supabaseAdmin.from('bookings').upsert({
          tour_id: tourId, date, name, email, phone,
          guests: parseInt(guests, 10),
          message: message || null,
          stripe_session_id: session.id,
          status: 'paid',
          source: 'website',
        }, { onConflict: 'stripe_session_id' })
      }

      // Close the shared slot
      await supabaseAdmin
        .from('availability_shared')
        .update({ open: false })
        .eq('date', date)

      console.log(`✅ Booking confirmed: ${name} — ${date}`)
    }
  }

  if (event.type === 'checkout.session.expired') {
    await supabaseAdmin
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('stripe_session_id', event.data.object.id)
  }

  return NextResponse.json({ received: true })
}
