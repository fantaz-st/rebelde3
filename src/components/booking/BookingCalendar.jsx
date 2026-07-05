'use client'
import { MONTHS, isoDate } from '@/lib/bookingUtils'
import { useState, useEffect, useCallback } from 'react'
import styles from './BookingCalendar.module.css'

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']


// tourDuration: 'full' | 'am' | 'pm'
// A date is selectable if:
//   - status === 'open' (any tour)
//   - status === 'am_only' and tourDuration === 'am'
//   - status === 'pm_only' and tourDuration === 'pm'
function isDateAvailable(status, tourDuration) {
  if (!status) return false
  if (status === 'open') return true
  if (status === 'am_only' && (tourDuration === 'am' || tourDuration === 'half')) return true
  if (status === 'pm_only' && (tourDuration === 'pm' || tourDuration === 'half')) return true
  return false
}

export default function BookingCalendar({ tourDuration = 'full', selectedDate, onSelectDate }) {
  const today = new Date()
  const [year,  setYear]  = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [dateStatuses, setDateStatuses] = useState(new Map())
  const [loading, setLoading] = useState(false)

  const fetchAvailability = useCallback(async () => {
    setLoading(true)
    const from = isoDate(year, month, 1)
    const to   = isoDate(year, month, new Date(year, month + 1, 0).getDate())
    try {
      const res  = await fetch(`/api/availability?from=${from}&to=${to}`)
      const data = await res.json()
      const map  = new Map()
      for (const d of (data.dates || [])) map.set(d.date, d.status)
      setDateStatuses(map)
    } catch {
      setDateStatuses(new Map())
    } finally {
      setLoading(false)
    }
  }, [year, month])

  useEffect(() => { fetchAvailability() }, [fetchAvailability])

  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const todayStr    = isoDate(today.getFullYear(), today.getMonth(), today.getDate())

  const prevMonth = () => { if (month === 0) { setYear(y => y-1); setMonth(11) } else setMonth(m => m-1) }
  const nextMonth = () => { if (month === 11) { setYear(y => y+1); setMonth(0) } else setMonth(m => m+1) }

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button
          onClick={prevMonth}
          className={styles.navBtn}
          disabled={year === today.getFullYear() && month === today.getMonth()}
          aria-label="Previous month"
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
          if (!day) return <div key={`e-${i}`} className={styles.empty} />
          const dateStr    = isoDate(year, month, day)
          const isPast     = dateStr < todayStr
          const status     = dateStatuses.get(dateStr)
          const avail      = !isPast && isDateAvailable(status, tourDuration)
          const isSelected = selectedDate === dateStr

          let cls = styles.day
          if (isPast)       cls += ` ${styles.past}`
          else if (avail)   cls += ` ${styles.available}`
          else              cls += ` ${styles.unavailable}`
          if (isSelected)   cls += ` ${styles.selected}`

          return (
            <button
              key={dateStr}
              className={cls}
              disabled={isPast || !avail}
              onClick={() => onSelectDate(isSelected ? null : dateStr)}
              aria-label={`${day} ${MONTHS[month]} ${year}${avail ? ' — available' : ''}`}
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
