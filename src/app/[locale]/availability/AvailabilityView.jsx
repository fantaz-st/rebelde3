// app/availability/AvailabilityView.jsx
'use client'
import { useState } from 'react'
import styles from './availability.module.css'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]
const DURATION_LABEL = { full: 'Full day', am: 'Half day · AM', pm: 'Half day · PM' }

function isoDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function MiniCalendar({ tourId, year, month, availability, bookings }) {
  const today       = new Date()
  const todayStr    = isoDate(today.getFullYear(), today.getMonth(), today.getDate())
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Build fast lookup maps for this tour
  const availSet  = new Set(
    availability.filter(a => a.tour_id === tourId && a.open).map(a => a.date)
  )
  const bookedSet = new Set(
    bookings.filter(b => b.tour_id === tourId && b.status === 'paid').map(b => b.date)
  )

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className={styles.miniCal}>
      <div className={styles.miniDayNames}>
        {['M','T','W','T','F','S','S'].map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className={styles.miniGrid}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const dateStr   = isoDate(year, month, day)
          const isPast    = dateStr < todayStr
          const isBooked  = bookedSet.has(dateStr)
          const isOpen    = availSet.has(dateStr) && !isBooked

          let cls = styles.miniDay
          if (isPast)     cls += ` ${styles.miniDayPast}`
          else if (isBooked) cls += ` ${styles.miniDayBooked}`
          else if (isOpen)   cls += ` ${styles.miniDayOpen}`
          else               cls += ` ${styles.miniDayOff}`

          return (
            <div
              key={dateStr}
              className={cls}
              title={isOpen ? 'Available' : isBooked ? 'Booked' : isPast ? '' : 'Not available'}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function AvailabilityView({ tours, availability, bookings }) {
  const today = new Date()
  const [year,  setYear]  = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1)
  }

  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth()

  // Count available days per tour this month
  const firstDay = isoDate(year, month, 1)
  const lastDay  = isoDate(year, month, new Date(year, month + 1, 0).getDate())
  const todayStr = isoDate(today.getFullYear(), today.getMonth(), today.getDate())

  const countAvailable = (tourId) => {
    const bookedDates = new Set(
      bookings.filter(b => b.tour_id === tourId && b.status === 'paid'
        && b.date >= firstDay && b.date <= lastDay).map(b => b.date)
    )
    return availability.filter(a =>
      a.tour_id === tourId && a.open && !bookedDates.has(a.date)
      && a.date >= Math.max(firstDay, todayStr) && a.date <= lastDay
    ).length
  }

  return (
    <div className={styles.view}>
      {/* Month navigator */}
      <div className={styles.monthNav}>
        <button
          className={styles.navBtn}
          onClick={prevMonth}
          disabled={isCurrentMonth}
          aria-label="Previous month"
        >
          ←
        </button>
        <h2 className={styles.monthLabel}>{MONTHS[month]} {year}</h2>
        <button className={styles.navBtn} onClick={nextMonth} aria-label="Next month">
          →
        </button>
      </div>

      {/* Tour calendars */}
      <div className={styles.tourGrid}>
        {tours.map(tour => {
          const available = countAvailable(tour.id)
          return (
            <div key={tour.id} className={styles.tourBlock}>
              <div className={styles.tourBlockHeader}>
                <div>
                  <p className={styles.tourDuration}>{DURATION_LABEL[tour.duration]}</p>
                  <h3 className={styles.tourName}>{tour.name}</h3>
                </div>
                <div className={styles.availBadge} data-available={available > 0 ? 'yes' : 'no'}>
                  {available > 0
                    ? <><span className={styles.availCount}>{available}</span> open</>
                    : 'Full'}
                </div>
              </div>

              <MiniCalendar
                tourId={tour.id}
                year={year}
                month={month}
                availability={availability}
                bookings={bookings}
              />

              <a
                href={`/book?tour=${tour.slug}`}
                className={styles.bookLink}
                aria-disabled={available === 0}
              >
                {available > 0 ? 'Book this tour →' : 'No dates available'}
              </a>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <span><span className={`${styles.ldot} ${styles.ldotOpen}`} /> Available</span>
        <span><span className={`${styles.ldot} ${styles.ldotBooked}`} /> Booked</span>
        <span><span className={`${styles.ldot} ${styles.ldotOff}`} /> Not available</span>
      </div>

      <p className={styles.refreshNote}>
        This page updates automatically every 5 minutes.
      </p>
    </div>
  )
}
