// src/app/api/create-checkout/route.js
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getSupabaseAdmin } from "@/lib/supabase"
const supabaseAdmin = getSupabaseAdmin()

export async function POST(request) {
  try {
    const body = await request.json()
    const { tourId, date, name, email, phone, guests, message } = body

    if (!tourId || !date || !name || !email || !phone || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Fetch tour
    const { data: tour, error: tourError } = await supabaseAdmin
      .from('tours')
      .select('*')
      .eq('id', tourId)
      .single()

    if (tourError || !tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }

    // Check shared availability slot is open
    const { data: avail } = await supabaseAdmin
      .from('availability_shared')
      .select('open')
      .eq('date', date)
      .single()

    if (!avail?.open) {
      return NextResponse.json({ error: 'This date is no longer available' }, { status: 409 })
    }

    // Check no paid booking already exists for this date
    const { data: existing } = await supabaseAdmin
      .from('bookings')
      .select('id')
      .eq('date', date)
      .eq('status', 'paid')
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: 'This date has already been booked' }, { status: 409 })
    }

    const dateFormatted = new Date(date).toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${tour.name} — Deposit`,
              description: `${dateFormatted} · ${guests} guest${guests > 1 ? 's' : ''} · Balance paid in cash on the day`,
            },
            unit_amount: tour.deposit_eur,
          },
          quantity: 1,
        },
      ],
      metadata: { tourId, date, name, email, phone, guests: String(guests), message: message || '' },
      success_url: `${baseUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/book?cancelled=1`,
      payment_intent_data: {
        description: `Rebelde Boats — ${tour.name} deposit (${date})`,
      },
    })

    // Save pending booking
    await supabaseAdmin.from('bookings').insert({
      tour_id:           tourId,
      date,
      name,
      email,
      phone,
      guests,
      message:           message || null,
      stripe_session_id: session.id,
      status:            'pending',
      source:            'website',
    })

    return NextResponse.json({ url: session.url })

  } catch (err) {
    console.error('create-checkout error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
