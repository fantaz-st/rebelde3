'use client'
import { useState, useEffect, useCallback } from 'react'
import styles from './BookingCalendar.module.css'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

function isoDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

export default function BookingCalendar({ selectedDate, onSelectDate }) {
  const today = new Date()
  const [year,  setYear]  = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [available, setAvailable] = useState(new Set())
  const [loading, setLoading]     = useState(false)

  const fetchAvailability = useCallback(async () => {
    setLoading(true)
    const from = isoDate(year, month, 1)
    const lastDay = new Date(year, month + 1, 0).getDate()
    const to = isoDate(year, month, lastDay)

    try {
      const res  = await fetch(`/api/availability?from=${from}&to=${to}`)
      const data = await res.json()
      setAvailable(new Set(data.available || []))
    } catch {
      setAvailable(new Set())
    } finally {
      setLoading(false)
    }
  }, [year, month])

  useEffect(() => { fetchAvailability() }, [fetchAvailability])

  const firstDayOfMonth = new Date(year, month, 1)
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1)
  }

  const todayStr = isoDate(today.getFullYear(), today.getMonth(), today.getDate())

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button
          onClick={prevMonth}
          className={styles.navBtn}
          aria-label="Previous month"
          disabled={year === today.getFullYear() && month === today.getMonth()}
        >←</button>
        <span className={styles.monthLabel}>{MONTHS[month]} {year}</span>
        <button onClick={nextMonth} className={styles.navBtn} aria-label="Next month">→</button>
      </div>

      <div className={styles.dayNames}>
        {DAYS.map(d => <span key={d}>{d}</span>)}
      </div>

      <div className={styles.grid}>
        {loading && <div className={styles.loadingOverlay}><span>Loading…</span></div>}

        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} className={styles.empty} />
          const dateStr    = isoDate(year, month, day)
          const isPast     = dateStr < todayStr
          const isAvail    = available.has(dateStr)
          const isSelected = selectedDate === dateStr

          let cellClass = styles.day
          if (isPast)       cellClass += ` ${styles.past}`
          else if (isAvail) cellClass += ` ${styles.available}`
          else              cellClass += ` ${styles.unavailable}`
          if (isSelected)   cellClass += ` ${styles.selected}`

          return (
            <button
              key={dateStr}
              className={cellClass}
              disabled={isPast || !isAvail}
              onClick={() => onSelectDate(isSelected ? null : dateStr)}
              aria-label={`${day} ${MONTHS[month]} ${year}${isAvail ? ' — available' : ''}`}
              aria-pressed={isSelected}
            >
              {day}
            </button>
          )
        })}
      </div>

      <div className={styles.legend}>
        <span><span className={`${styles.dot} ${styles.dotAvail}`} /> Available</span>
        <span><span className={`${styles.dot} ${styles.dotUnavail}`} /> Unavailable</span>
      </div>
    </div>
  )
}
