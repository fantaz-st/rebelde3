// components/booking/BookingForm.jsx
'use client'
import { useState, useEffect, useMemo } from 'react'
import styles from './BookingForm.module.css'

const GUEST_OPTIONS = [1,2,3,4,5,6,7,8,9,10,11,12]

const EXTRAS = [
  { id: 'charcuterie', label: 'Charcuterie platter', price: 20000, emoji: '🧀' },
  { id: 'fruit',       label: 'Fruit platter',       price: 15000, emoji: '🍇' },
]

export default function BookingForm({ tour, date, onBack, onSubmit, submitting }) {
  const isHalfDay = tour?.duration === 'half'

  const [takenSlots, setTakenSlots] = useState(new Set())
  const [slotLoading, setSlotLoading] = useState(false)
  const [slot, setSlot] = useState('am')

  // Payment mode: 'deposit' | 'full'
  const [paymentMode, setPaymentMode] = useState('deposit')

  // Selected extras: Set of extra ids
  const [selectedExtras, setSelectedExtras] = useState(new Set())

  const [fields, setFields] = useState({
    name: '', email: '', phone: '', guests: 2, message: ''
  })
  const [errors, setErrors] = useState({})

  // Fetch slot availability for half-day tours
  useEffect(() => {
    if (!isHalfDay || !date) return
    setSlotLoading(true)
    fetch(`/api/availability?from=${date}&to=${date}`)
      .then(r => r.json())
      .then(data => {
        const entry = (data.dates || []).find(d => d.date === date)
        const taken = new Set()
        if (entry?.status === 'am_only') { taken.add('pm'); setSlot('am') }
        else if (entry?.status === 'pm_only') { taken.add('am'); setSlot('pm') }
        setTakenSlots(taken)
      })
      .catch(() => setTakenSlots(new Set()))
      .finally(() => setSlotLoading(false))
  }, [isHalfDay, date])

  const toggleExtra = (id) => {
    setSelectedExtras(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const set = (key, val) => {
    setFields(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!fields.name.trim())  e.name  = 'Please enter your name'
    if (!fields.email.trim() || !/\S+@\S+\.\S+/.test(fields.email))
      e.email = 'Please enter a valid email'
    if (!fields.phone.trim()) e.phone = 'Please enter your phone number'
    return e
  }

  // Compute amounts
  const depositAmount = tour.deposit_eur  // cents
  const fullAmount    = (tour.deposit_eur || 0) + (tour.rest_eur || 0)  // cents
  const extrasTotal   = EXTRAS.filter(e => selectedExtras.has(e.id))
                               .reduce((sum, e) => sum + e.price, 0)

  const baseAmount    = paymentMode === 'full' ? fullAmount : depositAmount
  const totalAmount   = baseAmount + extrasTotal

  const fmt = (cents) => `€${(cents / 100).toLocaleString('en', { minimumFractionDigits: 0 })}`

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSubmit({
      ...fields,
      slot: isHalfDay ? slot : undefined,
      paymentMode,
      extras: [...selectedExtras],
    })
  }

  const dateFormatted = new Date(date).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className={styles.form}>
      {/* Summary */}
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Tour</span>
          <span className={styles.summaryValue}>{tour.name}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Date</span>
          <span className={styles.summaryValue}>{dateFormatted}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Paying now</span>
          <span className={`${styles.summaryValue} ${styles.deposit}`}>{fmt(totalAmount)}</span>
        </div>
        {paymentMode === 'deposit' && tour.rest_eur > 0 && (
          <p className={styles.cashNote}>
            Remaining {fmt(tour.rest_eur)} paid in cash on the day of the tour.
          </p>
        )}
        {paymentMode === 'full' && (
          <p className={styles.cashNote}>Full tour price — nothing to pay on the day.</p>
        )}
      </div>

      {/* Payment mode picker */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>How would you like to pay?</p>
        <div className={styles.paymentBtns}>
          <button
            type="button"
            className={`${styles.paymentBtn} ${paymentMode === 'deposit' ? styles.paymentBtnActive : ''}`}
            onClick={() => setPaymentMode('deposit')}
          >
            <span className={styles.paymentBtnTitle}>Deposit only</span>
            <span className={styles.paymentBtnAmount}>{fmt(depositAmount)}</span>
            {tour.rest_eur > 0 && (
              <span className={styles.paymentBtnNote}>
                +{fmt(tour.rest_eur)} cash on the day
              </span>
            )}
          </button>
          <button
            type="button"
            className={`${styles.paymentBtn} ${paymentMode === 'full' ? styles.paymentBtnActive : ''}`}
            onClick={() => setPaymentMode('full')}
          >
            <span className={styles.paymentBtnTitle}>Pay in full</span>
            <span className={styles.paymentBtnAmount}>{fmt(fullAmount)}</span>
            <span className={styles.paymentBtnNote}>Nothing to pay on the day</span>
          </button>
        </div>
      </div>

      {/* Extras */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Add extras <span className={styles.optional}>(optional)</span></p>
        <div className={styles.extrasList}>
          {EXTRAS.map(extra => {
            const active = selectedExtras.has(extra.id)
            return (
              <button
                key={extra.id}
                type="button"
                className={`${styles.extraBtn} ${active ? styles.extraBtnActive : ''}`}
                onClick={() => toggleExtra(extra.id)}
                aria-pressed={active}
              >
                <span className={styles.extraEmoji}>{extra.emoji}</span>
                <span className={styles.extraInfo}>
                  <span className={styles.extraLabel}>{extra.label}</span>
                  <span className={styles.extraPrice}>{fmt(extra.price)}</span>
                </span>
                <span className={styles.extraCheck} aria-hidden="true">
                  {active ? '✓' : '+'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* AM/PM slot picker — half-day tours only */}
      {isHalfDay && (
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Select time slot</p>
          {slotLoading ? (
            <p className={styles.slotLoading}>Checking availability…</p>
          ) : (
            <div className={styles.slotBtns}>
              <button
                type="button"
                className={`${styles.slotBtn} ${slot === 'am' ? styles.slotBtnActive : ''} ${takenSlots.has('am') ? styles.slotBtnDisabled : ''}`}
                onClick={() => !takenSlots.has('am') && setSlot('am')}
                disabled={takenSlots.has('am')}
              >
                🌅 Morning (AM)
                {takenSlots.has('am') && <span className={styles.slotTaken}>Taken</span>}
              </button>
              <button
                type="button"
                className={`${styles.slotBtn} ${slot === 'pm' ? styles.slotBtnActive : ''} ${takenSlots.has('pm') ? styles.slotBtnDisabled : ''}`}
                onClick={() => !takenSlots.has('pm') && setSlot('pm')}
                disabled={takenSlots.has('pm')}
              >
                🌇 Afternoon (PM)
                {takenSlots.has('pm') && <span className={styles.slotTaken}>Taken</span>}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Fields */}
      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label}>Full name</label>
          <input
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            type="text"
            value={fields.name}
            onChange={e => set('name', e.target.value)}
            placeholder="Your full name"
            autoComplete="name"
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            type="email"
            value={fields.email}
            onChange={e => set('email', e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Phone number</label>
          <input
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            type="tel"
            value={fields.phone}
            onChange={e => set('phone', e.target.value)}
            placeholder="+385 91 234 5678"
            autoComplete="tel"
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Number of guests</label>
          <select
            className={styles.select}
            value={fields.guests}
            onChange={e => set('guests', Number(e.target.value))}
          >
            {GUEST_OPTIONS.map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Message <span className={styles.optional}>(optional)</span></label>
          <textarea
            className={styles.textarea}
            value={fields.message}
            onChange={e => set('message', e.target.value)}
            placeholder="Any special requests, dietary requirements, or questions…"
            rows={3}
          />
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.backBtn} onClick={onBack} disabled={submitting}>
          ← Change date
        </button>
        <button
          className={styles.payBtn}
          onClick={handleSubmit}
          disabled={submitting || slotLoading}
        >
          {submitting ? 'Redirecting…' : `Pay ${fmt(totalAmount)}`}
        </button>
      </div>
    </div>
  )
}
