'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './availability.module.css'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

const DURATION_LABEL = { full: 'Full day', am: 'Half day · Morning', pm: 'Half day · Afternoon' }

function isoDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function fmtLong(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default function AvailabilityView({ tours, availability, bookings }) {
  const router = useRouter()
  const today  = new Date()
  const [year,  setYear]  = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [tourModal, setTourModal] = useState(null) // dateStr when open

  const prevMonth = () => { if (month === 0) { setYear(y => y-1); setMonth(11) } else setMonth(m => m-1) }
  const nextMonth = () => { if (month === 11) { setYear(y => y+1); setMonth(0) } else setMonth(m => m+1) }

  const todayStr       = isoDate(today.getFullYear(), today.getMonth(), today.getDate())
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth()
  const startOffset    = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth    = new Date(year, month + 1, 0).getDate()

  const bookedDates = new Set(bookings.filter(b => b.status === 'paid').map(b => b.date))
  const availSet    = new Set(availability.filter(a => a.open).map(a => a.date))

  const firstDay  = isoDate(year, month, 1)
  const lastDay   = isoDate(year, month, daysInMonth)
  const openCount = availability.filter(a =>
    a.open && !bookedDates.has(a.date)
    && a.date >= (isCurrentMonth ? todayStr : firstDay)
    && a.date <= lastDay
  ).length

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const handleDayClick = (dateStr, isOpen) => {
    if (!isOpen) return
    setTourModal(dateStr)
  }

  const handleSelectTour = (tour) => {
    router.push(`/book?date=${tourModal}&tour=${tour.slug}`)
  }

  return (
    <div className={styles.view}>

      {/* Tour picker modal */}
      {tourModal && (
        <div className={styles.overlay} onClick={() => setTourModal(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>Choose your tour</h2>
                <p className={styles.modalSub}>{fmtLong(tourModal)}</p>
              </div>
              <button className={styles.modalClose} onClick={() => setTourModal(null)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              {tours.map(tour => (
                <button
                  key={tour.id}
                  className={styles.tourOption}
                  onClick={() => handleSelectTour(tour)}
                >
                  <div className={styles.tourOptionLeft}>
                    <span className={styles.tourOptionDuration}>{DURATION_LABEL[tour.duration]}</span>
                    <span className={styles.tourOptionName}>{tour.name}</span>
                    <span className={styles.tourOptionDeposit}>
                      Deposit: €{(tour.deposit_eur / 100).toLocaleString('en')}
                    </span>
                  </div>
                  <span className={styles.tourOptionArrow}>→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Month nav */}
      <div className={styles.monthNav}>
        <button
          className={styles.navBtn}
          onClick={prevMonth}
          disabled={isCurrentMonth}
          aria-label="Previous month"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={styles.monthInfo}>
          <h2 className={styles.monthLabel}>{MONTHS[month]} {year}</h2>
          <span className={styles.openCount} data-open={openCount > 0 ? 'yes' : 'no'}>
            {openCount > 0
              ? `${openCount} date${openCount > 1 ? 's' : ''} available — click to book`
              : 'No dates available this month'}
          </span>
        </div>
        <button className={styles.navBtn} onClick={nextMonth} aria-label="Next month">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Calendar */}
      <div className={styles.calCard}>
        <div className={styles.dayHeaders}>
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
            <div key={d} className={styles.dayHeader}>{d}</div>
          ))}
        </div>

        <div className={styles.grid}>
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} className={styles.empty} />
            const dateStr  = isoDate(year, month, day)
            const isPast   = dateStr < todayStr
            const isBooked = bookedDates.has(dateStr)
            const isOpen   = availSet.has(dateStr) && !isBooked
            const isToday  = dateStr === todayStr

            let cls = styles.cell
            if (isPast)     cls += ` ${styles.cellPast}`
            else if (isBooked) cls += ` ${styles.cellBooked}`
            else if (isOpen)   cls += ` ${styles.cellOpen}`
            else               cls += ` ${styles.cellOff}`

            return (
              <div
                key={dateStr}
                className={cls}
                onClick={() => !isPast && !isBooked && handleDayClick(dateStr, isOpen)}
                title={isOpen ? 'Click to book' : ''}
              >
                <span className={`${styles.cellDay} ${isToday ? styles.cellDayToday : ''}`}>
                  {day}
                </span>
                {isOpen && <span className={styles.cellCta}>Book →</span>}
                {isBooked && <span className={styles.cellBooked_label}>Booked</span>}
              </div>
            )
          })}
        </div>

        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.ldot} style={{ background: '#bbf7d0', border: '1.5px solid #16a34a' }} />
            Available
          </span>
          <span className={styles.legendItem}>
            <span className={styles.ldot} style={{ background: '#1e3a5f' }} />
            Booked
          </span>
          <span className={styles.legendItem}>
            <span className={styles.ldot} style={{ background: '#f1f5f9' }} />
            Not available
          </span>
        </div>
      </div>

      <p className={styles.refreshNote}>Updates every 5 minutes.</p>
    </div>
  )
}
