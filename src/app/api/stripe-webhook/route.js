// src/app/api/stripe-webhook/route.js
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase'

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
      const { tourId, date, name, email, phone, guests, message, slot } = session.metadata
      const supabaseAdmin = getSupabaseAdmin()

      // Mark booking as paid
      const { error: updateError } = await supabaseAdmin
        .from('bookings')
        .update({ status: 'paid' })
        .eq('stripe_session_id', session.id)

      if (updateError) {
        await supabaseAdmin.from('bookings').upsert({
          tour_id:           tourId,
          date,
          name, email, phone,
          guests:            parseInt(guests, 10),
          message:           message || null,
          stripe_session_id: session.id,
          status:            'paid',
          source:            'website',
          slot:              slot || 'full',
        }, { onConflict: 'stripe_session_id' })
      }

      // Check if the day is now fully booked — close it if so
      const { data: dayBookings } = await supabaseAdmin
        .from('bookings')
        .select('slot')
        .eq('date', date)
        .eq('status', 'paid')

      const takenSlots = new Set((dayBookings || []).map(b => b.slot || 'full'))
      const fullyBooked =
        takenSlots.has('full') ||
        (takenSlots.has('am') && takenSlots.has('pm'))

      if (fullyBooked) {
        await supabaseAdmin
          .from('availability_shared')
          .update({ open: false })
          .eq('date', date)
      }

      console.log(`✅ Booking confirmed: ${name} — ${date} (${slot})`)
    }
  }

  if (event.type === 'checkout.session.expired') {
    const supabaseAdmin = getSupabaseAdmin()
    await supabaseAdmin
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('stripe_session_id', event.data.object.id)
  }

  return NextResponse.json({ received: true })
}
