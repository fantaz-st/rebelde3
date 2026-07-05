// src/app/api/create-checkout/route.js
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase'

const EXTRAS_CATALOG = {
  charcuterie: { label: 'Charcuterie platter', price: 20000 }, // €200 in cents
  fruit:       { label: 'Fruit platter',       price: 15000 }, // €150 in cents
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { tourId, date, slot, name, email, phone, guests, message, paymentMode, extras } = body

    if (!tourId || !date || !name || !email || !phone || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabaseAdmin = getSupabaseAdmin()

    const { data: tour, error: tourError } = await supabaseAdmin
      .from('tours').select('*').eq('id', tourId).single()

    if (tourError || !tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }

    // Determine slot
    let bookingSlot
    if (tour.duration === 'full') {
      bookingSlot = 'full'
    } else if (tour.duration === 'half') {
      if (!slot || !['am', 'pm'].includes(slot)) {
        return NextResponse.json({ error: 'Please select AM or PM for this tour' }, { status: 400 })
      }
      bookingSlot = slot
    } else {
      bookingSlot = tour.duration
    }

    // Check availability
    const { data: avail } = await supabaseAdmin
      .from('availability_shared').select('open').eq('date', date).single()
    if (!avail?.open) {
      return NextResponse.json({ error: 'This date is not available' }, { status: 409 })
    }

    // Check slot conflicts
    const { data: existingBookings } = await supabaseAdmin
      .from('bookings').select('slot').eq('date', date).eq('status', 'paid')
    const takenSlots = new Set((existingBookings || []).map(b => b.slot || 'full'))

    if (bookingSlot === 'full' && takenSlots.size > 0) {
      return NextResponse.json({ error: 'This date is already booked.' }, { status: 409 })
    }
    if (bookingSlot !== 'full' && (takenSlots.has('full') || takenSlots.has(bookingSlot))) {
      return NextResponse.json({
        error: `The ${bookingSlot === 'am' ? 'morning' : 'afternoon'} slot is already taken.`
      }, { status: 409 })
    }

    const dateFormatted = new Date(date).toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })
    const slotLabel = bookingSlot === 'am' ? ' · Morning' : bookingSlot === 'pm' ? ' · Afternoon' : ''

    // Determine payment mode
    const isFullPayment = paymentMode === 'full'
    const tourAmount    = isFullPayment
      ? (tour.deposit_eur + (tour.rest_eur || 0))
      : tour.deposit_eur

    const tourLineItem = {
      price_data: {
        currency: 'eur',
        product_data: {
          name: isFullPayment
            ? `${tour.name} — Full payment`
            : `${tour.name} — Deposit`,
          description: isFullPayment
            ? `${dateFormatted}${slotLabel} · ${guests} guest${guests > 1 ? 's' : ''} · Full tour price, nothing to pay on the day`
            : `${dateFormatted}${slotLabel} · ${guests} guest${guests > 1 ? 's' : ''} · Balance paid in cash on the day`,
        },
        unit_amount: tourAmount,
      },
      quantity: 1,
    }

    // Build extras line items
    const selectedExtras = Array.isArray(extras) ? extras : []
    const validExtras    = selectedExtras.filter(id => EXTRAS_CATALOG[id])
    const extrasLineItems = validExtras.map(id => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: EXTRAS_CATALOG[id].label,
          description: `Add-on for ${tour.name} · ${dateFormatted}`,
        },
        unit_amount: EXTRAS_CATALOG[id].price,
      },
      quantity: 1,
    }))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [tourLineItem, ...extrasLineItems],
      metadata: {
        tourId, date, name, email, phone,
        guests:       String(guests),
        message:      message || '',
        slot:         bookingSlot,
        paymentMode:  isFullPayment ? 'full' : 'deposit',
        extras:       validExtras.join(','),
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_BASE_URL}/book?cancelled=1`,
      payment_intent_data: {
        description: `Rebelde Boats — ${tour.name} (${date}${slotLabel}) · ${isFullPayment ? 'Full' : 'Deposit'}${validExtras.length ? ' + extras' : ''}`,
      },
    })

    await supabaseAdmin.from('bookings').insert({
      tour_id:           tourId,
      date,
      name, email, phone, guests,
      message:           message || null,
      stripe_session_id: session.id,
      status:            'pending',
      source:            'website',
      slot:              bookingSlot,
    })

    return NextResponse.json({ url: session.url })

  } catch (err) {
    console.error('create-checkout error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
