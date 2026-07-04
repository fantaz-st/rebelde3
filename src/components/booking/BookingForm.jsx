// components/booking/BookingForm.jsx
'use client'
import { useState } from 'react'
import styles from './BookingForm.module.css'

const GUEST_OPTIONS = [1,2,3,4,5,6,7,8,9,10,11,12]

export default function BookingForm({ tour, date, onBack, onSubmit, submitting }) {
  const [fields, setFields] = useState({
    name: '', email: '', phone: '', guests: 2, message: ''
  })
  const [errors, setErrors] = useState({})

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

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSubmit(fields)
  }

  const dateFormatted = new Date(date).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  const depositFormatted = `€${(tour.deposit_eur / 100).toLocaleString('en', { minimumFractionDigits: 0 })}`

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
          <span className={styles.summaryLabel}>Deposit due now</span>
          <span className={`${styles.summaryValue} ${styles.deposit}`}>{depositFormatted}</span>
        </div>
        <p className={styles.cashNote}>Balance paid in cash on the day of the tour.</p>
      </div>

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
          disabled={submitting}
        >
          {submitting
            ? 'Redirecting…'
            : `Pay ${depositFormatted} deposit`}
        </button>
      </div>
    </div>
  )
}
