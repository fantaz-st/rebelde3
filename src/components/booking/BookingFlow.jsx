'use client'
import { useState } from 'react'
import BookingCalendar from './BookingCalendar'
import BookingForm from './BookingForm'
import styles from './BookingFlow.module.css'

const DURATION_LABEL = { full: 'Full day', am: 'Half day · Morning', pm: 'Half day · Afternoon', half: 'Half day (AM or PM)' }

export default function BookingFlow({ tours, preselectedDate = null, preselectedTourSlug = null }) {
  // If both date and tour slug are pre-set, jump straight to the form
  const preselectedTour = preselectedTourSlug
    ? tours.find(t => t.slug === preselectedTourSlug) || null
    : null

  const initialStep = preselectedDate && preselectedTour
    ? 'form'
    : preselectedDate
    ? 'tour'
    : 'tour'

  const [step, setStep]             = useState(initialStep)
  const [selectedTour, setTour]     = useState(preselectedTour)
  const [selectedDate, setDate]     = useState(preselectedDate)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState(null)

  const handleSelectTour = (tour) => {
    setTour(tour)
    if (preselectedDate) {
      setDate(preselectedDate)
      setStep('form')
    } else {
      setDate(null)
      setStep('calendar')
    }
  }

  const handleSelectDate = (date) => {
    setDate(date)
    if (date) setStep('form')
  }

  const handleBack = () => {
    if (step === 'form') {
      if (preselectedDate && preselectedTour) {
        // came with both — go back to availability
        window.location.href = '/availability'
      } else if (preselectedDate) {
        setStep('tour')
      } else {
        setStep('calendar')
      }
    }
    if (step === 'calendar') { setStep('tour'); setDate(null) }
  }

  const handleSubmit = async (fields) => {
    setSubmitting(true)
    setServerError(null)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tourId: selectedTour.id, date: selectedDate, ...fields }),
      })
      const data = await res.json()
      if (!res.ok) {
        setServerError(data.error || 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }
      window.location.href = data.url
    } catch {
      setServerError('Network error. Please check your connection and try again.')
      setSubmitting(false)
    }
  }

  // Step indicator config
  const allSteps    = preselectedDate && preselectedTour
    ? [{ key: 'form',     label: 'Details & payment' }]
    : preselectedDate
    ? [{ key: 'tour',     label: 'Tour' }, { key: 'form', label: 'Details & payment' }]
    : [{ key: 'tour',     label: 'Tour' }, { key: 'calendar', label: 'Date' }, { key: 'form', label: 'Details & payment' }]

  const currentIdx = allSteps.findIndex(s => s.key === step)

  return (
    <div className={styles.flow}>
      {/* Step indicator */}
      {allSteps.length > 1 && (
        <div className={styles.steps}>
          {allSteps.map(({ key, label }, i) => {
            const active   = i === currentIdx
            const done     = i < currentIdx
            return (
              <div key={key} className={`${styles.stepItem} ${active ? styles.stepActive : ''} ${done ? styles.stepDone : ''}`}>
                <span className={styles.stepNum}>{done ? '✓' : i + 1}</span>
                <span className={styles.stepLabel}>{label}</span>
              </div>
            )
          })}
        </div>
      )}

      {/* Pre-selected date banner (when coming from availability with date only) */}
      {preselectedDate && !preselectedTour && step === 'tour' && (
        <div className={styles.preselectedBanner}>
          <span>📅</span>
          <span>
            Date: <strong>{new Date(preselectedDate).toLocaleDateString('en-GB', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            })}</strong>
          </span>
          <a href="/availability" className={styles.changeDateLink}>Change date</a>
        </div>
      )}

      {/* STEP 1 — Tour picker */}
      {step === 'tour' && (
        <div className={styles.tourGrid}>
          {tours.map(tour => (
            <button key={tour.id} className={styles.tourCard} onClick={() => handleSelectTour(tour)}>
              <span className={styles.tourDuration}>{DURATION_LABEL[tour.duration]}</span>
              <span className={styles.tourName}>{tour.name}</span>
              <span className={styles.tourDesc}>{tour.description}</span>
              <span className={styles.tourDeposit}>
                Deposit: €{(tour.deposit_eur / 100).toLocaleString('en')}
                {tour.rest_eur > 0 && (
                  <span className={styles.tourRest}> · Rest: €{(tour.rest_eur / 100).toLocaleString('en')} cash</span>
                )}
              </span>
              <span className={styles.tourArrow}>Select →</span>
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
              <p className={styles.selectedTourLabel}>{selectedTour?.name}</p>
              <p className={styles.selectedTourDuration}>{DURATION_LABEL[selectedTour?.duration]}</p>
            </div>
          </div>
          <p className={styles.calendarHint}>Select an available date to continue.</p>
          <BookingCalendar tourDuration={selectedTour?.duration || 'full'} selectedDate={selectedDate} onSelectDate={handleSelectDate} />
        </div>
      )}

      {/* STEP 3 — Form */}
      {step === 'form' && (
        <div className={styles.formStep}>
          {serverError && <div className={styles.serverError}>{serverError}</div>}
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
