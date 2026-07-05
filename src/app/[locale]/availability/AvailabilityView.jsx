'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import styles from './availability.module.css'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]
const DURATION_LABEL = {
  full: 'Full day',
  am: 'Half day · Morning',
  pm: 'Half day · Afternoon',
  half: 'Half day (AM or PM)'
}

function isoDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}
function fmtLong(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
}

function SplitCell({ status }) {
  const topColor    = status === 'am_only' ? '#dcfce7' : '#fee2e2'
  const bottomColor = status === 'am_only' ? '#fee2e2' : '#dcfce7'
  const topBorder   = status === 'am_only' ? '#16a34a' : '#dc2626'
  const bottomBorder= status === 'am_only' ? '#dc2626' : '#16a34a'
  return (
    <svg className={styles.splitSvg} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polygon points="0,0 100,0 0,100" fill={topColor} stroke={topBorder} strokeWidth="1" />
      <polygon points="100,0 100,100 0,100" fill={bottomColor} stroke={bottomBorder} strokeWidth="1" />
      <line x1="0" y1="100" x2="100" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
    </svg>
  )
}

export default function AvailabilityView({ tours }) {
  const router = useRouter()
  const today  = new Date()
  const [year,  setYear]  = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  // Start as null = loading, Map once fetched
  const [dateStatuses, setDateStatuses] = useState(null)
  const [tourModal, setTourModal] = useState(null)

  const todayStr       = isoDate(today.getFullYear(), today.getMonth(), today.getDate())
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth()
  const daysInMonth    = new Date(year, month + 1, 0).getDate()
  const startOffset    = (new Date(year, month, 1).getDay() + 6) % 7

  const fetchSlots = useCallback(async () => {
    setDateStatuses(null) // show loading state
    const from = isoDate(year, month, 1)
    const to   = isoDate(year, month, daysInMonth)
    try {
      const res  = await fetch(`/api/availability?from=${from}&to=${to}`)
      const data = await res.json()
      const map  = new Map()
      for (const d of (data.dates || [])) map.set(d.date, d.status)
      setDateStatuses(map)
    } catch {
      setDateStatuses(new Map())
    }
  }, [year, month, daysInMonth])

  useEffect(() => { fetchSlots() }, [fetchSlots])

  const prevMonth = () => { if (month === 0) { setYear(y => y-1); setMonth(11) } else setMonth(m => m-1) }
  const nextMonth = () => { if (month === 11) { setYear(y => y+1); setMonth(0) } else setMonth(m => m+1) }

  const firstDay  = isoDate(year, month, 1)
  const lastDay   = isoDate(year, month, daysInMonth)
  const openCount = dateStatuses
    ? [...dateStatuses.entries()].filter(([date, status]) =>
        date >= (isCurrentMonth ? todayStr : firstDay) &&
        date <= lastDay &&
        status !== 'full'
      ).length
    : 0

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const handleDayClick = (dateStr, status) => {
    // Only allow clicking if we have data AND date is available
    if (!dateStatuses || !status || status === 'full') return
    let allowedSlots = null
    if (status === 'am_only') allowedSlots = ['am']
    else if (status === 'pm_only') allowedSlots = ['pm']
    setTourModal({ date: dateStr, allowedSlots })
  }

  const handleSelectTour = (tour) => {
    router.push(`/book?date=${tourModal.date}&tour=${tour.slug}`)
  }

  const availableTours = tourModal
    ? (tourModal.allowedSlots
        ? tours.filter(t => tourModal.allowedSlots.includes(t.duration) || t.duration === 'half')
        : tours)
    : []

  const isLoading = dateStatuses === null

  return (
    <div className={styles.view}>
      {/* Tour picker modal */}
      {tourModal && (
        <div className={styles.overlay} onClick={() => setTourModal(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>Choose your tour</h2>
                <p className={styles.modalSub}>{fmtLong(tourModal.date)}</p>
                {tourModal.allowedSlots && (
                  <p className={styles.modalSlotNote}>
                    ⚠ Only {tourModal.allowedSlots[0] === 'am' ? 'morning' : 'afternoon'} half-day tours available on this date
                  </p>
                )}
              </div>
              <button className={styles.modalClose} onClick={() => setTourModal(null)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              {availableTours.length === 0 ? (
                <p className={styles.modalEmpty}>No tours available for this slot.</p>
              ) : availableTours.map(tour => (
                <button key={tour.id} className={styles.tourOption} onClick={() => handleSelectTour(tour)}>
                  <div className={styles.tourOptionLeft}>
                    <span className={styles.tourOptionDuration}>{DURATION_LABEL[tour.duration]}</span>
                    <span className={styles.tourOptionName}>{tour.name}</span>
                    <span className={styles.tourOptionDeposit}>
                      Deposit: €{(tour.deposit_eur / 100).toLocaleString('en')}
                      {tour.rest_eur > 0 && (
                        <span className={styles.tourOptionRest}>
                          {' '}· Rest: €{(tour.rest_eur / 100).toLocaleString('en')} cash on the day
                        </span>
                      )}
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
        <button className={styles.navBtn} onClick={prevMonth} disabled={isCurrentMonth} aria-label="Previous month">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={styles.monthInfo}>
          <h2 className={styles.monthLabel}>{MONTHS[month]} {year}</h2>
          <span className={styles.openCount} data-open={!isLoading && openCount > 0 ? 'yes' : 'no'}>
            {isLoading
              ? 'Loading availability…'
              : openCount > 0
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

        <div className={`${styles.grid} ${isLoading ? styles.gridLoading : ''}`}>
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} className={styles.empty} />
            const dateStr = isoDate(year, month, day)
            const isPast  = dateStr < todayStr
            const isToday = dateStr === todayStr

            // While loading, all dates are non-interactive
            const status   = dateStatuses?.get(dateStr)
            const isHalf   = !isLoading && (status === 'am_only' || status === 'pm_only')
            const isOpen   = !isLoading && status === 'open'
            const isBooked = !isLoading && dateStatuses !== null && !status && !isPast
              // 'full' booked means not in the map at all (API filters them out)
              // actually: fully booked dates are excluded from API response entirely
              // so if a date was open and now shows as not in map + not in availSet... it's unavailable or booked
              // simplest: status === undefined means unavailable (either never opened or fully booked)

            let cls = styles.cell
            if (isPast)          cls += ` ${styles.cellPast}`
            else if (isLoading)  cls += ` ${styles.cellLoading}`
            else if (isOpen)     cls += ` ${styles.cellOpen}`
            else if (isHalf)     cls += ` ${styles.cellHalf}`
            else                 cls += ` ${styles.cellOff}`

            const clickable = !isPast && !isLoading && (isOpen || isHalf)

            return (
              <div
                key={dateStr}
                className={cls}
                onClick={() => clickable && handleDayClick(dateStr, status)}
                style={{ cursor: clickable ? 'pointer' : 'default' }}
              >
                {isHalf && <SplitCell status={status} />}
                <span className={`${styles.cellDay} ${isToday ? styles.cellDayToday : ''} ${isHalf ? styles.cellDaySplit : ''}`}>
                  {day}
                </span>
                {isOpen && <span className={styles.cellCta}>Book →</span>}
                {isHalf && (
                  <span className={styles.cellHalfLabel}>
                    {status === 'am_only' ? 'AM free' : 'PM free'}
                  </span>
                )}
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
            <span className={styles.ldotSplit} />
            Half day available
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
