// components/booking/BookingFlow.jsx
'use client'
import { useState } from 'react'
import BookingCalendar from './BookingCalendar'
import BookingForm from './BookingForm'
import styles from './BookingFlow.module.css'

const DURATION_LABEL = { full: 'Full day', am: 'Half day · Morning', pm: 'Half day · Afternoon' }

// Step: TOUR → CALENDAR → FORM → (Stripe redirect)
export default function BookingFlow({ tours }) {
  const [step, setStep]           = useState('tour')   // 'tour' | 'calendar' | 'form'
  const [selectedTour, setTour]   = useState(null)
  const [selectedDate, setDate]   = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState(null)

  const handleSelectTour = (tour) => {
    setTour(tour)
    setDate(null)
    setStep('calendar')
  }

  const handleSelectDate = (date) => {
    setDate(date)
    if (date) setStep('form')
  }

  const handleBack = () => {
    if (step === 'form')     { setStep('calendar') }
    if (step === 'calendar') { setStep('tour'); setDate(null) }
  }

  const handleSubmit = async (fields) => {
    setSubmitting(true)
    setServerError(null)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: selectedTour.id,
          date: selectedDate,
          ...fields,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setServerError(data.error || 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url

    } catch {
      setServerError('Network error. Please check your connection and try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.flow}>
      {/* Step indicator */}
      <div className={styles.steps}>
        {['Tour', 'Date', 'Details & payment'].map((label, i) => {
          const stepKeys  = ['tour', 'calendar', 'form']
          const current   = stepKeys.indexOf(step)
          const active    = current === i
          const completed = current > i
          return (
            <div
              key={label}
              className={`${styles.stepItem} ${active ? styles.stepActive : ''} ${completed ? styles.stepDone : ''}`}
            >
              <span className={styles.stepNum}>{completed ? '✓' : i + 1}</span>
              <span className={styles.stepLabel}>{label}</span>
            </div>
          )
        })}
      </div>

      {/* STEP 1 — Tour picker */}
      {step === 'tour' && (
        <div className={styles.tourGrid}>
          {tours.map(tour => (
            <button
              key={tour.id}
              className={styles.tourCard}
              onClick={() => handleSelectTour(tour)}
            >
              <span className={styles.tourDuration}>{DURATION_LABEL[tour.duration]}</span>
              <span className={styles.tourName}>{tour.name}</span>
              <span className={styles.tourDesc}>{tour.description}</span>
              <span className={styles.tourDeposit}>
                Deposit: €{(tour.deposit_eur / 100).toLocaleString('en')}
              </span>
              <span className={styles.tourArrow}>Book →</span>
            </button>
          ))}
        </div>
      )}

      {/* STEP 2 — Calendar */}
      {step === 'calendar' && (
        <div className={styles.calendarStep}>
          <div className={styles.stepHeader}>
            <button className={styles.backLink} onClick={handleBack}>← All tours</button>
            <div>
              <p className={styles.selectedTourLabel}>{selectedTour.name}</p>
              <p className={styles.selectedTourDuration}>{DURATION_LABEL[selectedTour.duration]}</p>
            </div>
          </div>
          <p className={styles.calendarHint}>Select an available date to continue.</p>
          <BookingCalendar
            tourId={selectedTour.id}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
          />
        </div>
      )}

      {/* STEP 3 — Form */}
      {step === 'form' && (
        <div className={styles.formStep}>
          {serverError && (
            <div className={styles.serverError}>{serverError}</div>
          )}
          <BookingForm
            tour={selectedTour}
            date={selectedDate}
            onBack={handleBack}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </div>
      )}
    </div>
  )
}
