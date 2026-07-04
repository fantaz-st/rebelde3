// app/admin/AdminPanel.jsx
'use client'
import { useState, useTransition } from 'react'
import styles from './admin.module.css'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DURATION_LABEL = { full: 'Full day', am: 'Half day AM', pm: 'Half day PM' }
const STATUS_LABEL   = { pending: 'Pending', paid: 'Paid ✓', cancelled: 'Cancelled' }

const SOURCES = [
  { value: 'website',      label: 'Website',      icon: '🌐' },
  { value: 'tripadvisor',  label: 'TripAdvisor',  icon: '🦉' },
  { value: 'getyourguide', label: 'GetYourGuide', icon: '🎫' },
  { value: 'walkin',       label: 'Walk-in',       icon: '🚶' },
]

const SOURCE_LABEL = Object.fromEntries(SOURCES.map(s => [s.value, `${s.icon} ${s.label}`]))

function isoDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  })
}

export default function AdminPanel({ tours, availability: initialAvail, bookings: initialBookings, adminKey }) {
  const [avail,    setAvail]    = useState(initialAvail)
  const [bookings, setBookings] = useState(initialBookings)
  const [activeTour, setActiveTour] = useState(tours[0] || null)
  const [year,  setYear]  = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [isPending, startTransition] = useTransition()
  const [toast, setToast] = useState(null)

  // Manual booking modal state
  const [manualModal, setManualModal] = useState(null) // null | { date, tourId }
  const [manualSource, setManualSource] = useState('walkin')
  const [manualLoading, setManualLoading] = useState(false)

  const showToast = (msg, type = 'default') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const availMap = new Map(avail.map(a => [`${a.tour_id}::${a.date}`, a]))

  // Toggle availability open/closed
  const toggle = (date) => {
    if (!activeTour) return
    const key     = `${activeTour.id}::${date}`
    const current = availMap.get(key)
    const newOpen = current ? !current.open : true

    startTransition(async () => {
      const res = await fetch('/api/admin/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ tourId: activeTour.id, date, open: newOpen }),
      })
      if (res.ok) {
        const { record } = await res.json()
        setAvail(prev => {
          const filtered = prev.filter(a => !(a.tour_id === activeTour.id && a.date === date))
          return [...filtered, record]
        })
        showToast(newOpen ? `✓ ${date} opened` : `✗ ${date} closed`)
      } else {
        showToast('Error — please try again', 'error')
      }
    })
  }

  // Open manual booking modal
  const openManualModal = (date) => {
    setManualSource('walkin')
    setManualModal({ date, tourId: activeTour.id })
  }

  // Submit manual booking
  const submitManual = async () => {
    if (!manualModal) return
    setManualLoading(true)
    try {
      const res = await fetch('/api/admin/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ tourId: manualModal.tourId, date: manualModal.date, source: manualSource }),
      })
      const data = await res.json()
      if (res.ok) {
        // Update local state
        setBookings(prev => [...prev, { ...data.booking, tours: { name: activeTour.name } }])
        setAvail(prev => {
          const filtered = prev.filter(a => !(a.tour_id === manualModal.tourId && a.date === manualModal.date))
          return [...filtered, { tour_id: manualModal.tourId, date: manualModal.date, open: false }]
        })
        showToast(`✓ Booking logged — ${SOURCE_LABEL[manualSource]}`)
        setManualModal(null)
      } else {
        showToast(data.error || 'Error — please try again', 'error')
      }
    } finally {
      setManualLoading(false)
    }
  }

  // Cancel a manual booking
  const cancelBooking = async (booking) => {
    if (!confirm(`Cancel this ${SOURCE_LABEL[booking.source] || 'booking'} on ${fmtDate(booking.date)}? This will reopen the slot.`)) return
    const res = await fetch('/api/admin/booking', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ bookingId: booking.id, tourId: booking.tour_id, date: booking.date }),
    })
    if (res.ok) {
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'cancelled' } : b))
      setAvail(prev => {
        const filtered = prev.filter(a => !(a.tour_id === booking.tour_id && a.date === booking.date))
        return [...filtered, { tour_id: booking.tour_id, date: booking.date, open: true }]
      })
      showToast('Booking cancelled — slot reopened')
    } else {
      showToast('Error cancelling booking', 'error')
    }
  }

  // Calendar grid
  const today       = new Date()
  const todayStr    = isoDate(today.getFullYear(), today.getMonth(), today.getDate())
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1)
  }

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const tourBookings = bookings.filter(b => b.tour_id === activeTour?.id && b.status !== 'cancelled')

  return (
    <div className={styles.panel}>
      {/* Toast */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'error' ? styles.toastError : ''}`}>
          {toast.msg}
        </div>
      )}

      {/* Manual booking modal */}
      {manualModal && (
        <div className={styles.modalBackdrop} onClick={() => setManualModal(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Log external booking</h3>
            <p className={styles.modalSub}>
              <strong>{activeTour?.name}</strong> · {fmtDate(manualModal.date)}
            </p>

            <p className={styles.modalLabel}>Booking source</p>
            <div className={styles.sourceGrid}>
              {SOURCES.map(s => (
                <button
                  key={s.value}
                  className={`${styles.sourceBtn} ${manualSource === s.value ? styles.sourceBtnActive : ''}`}
                  onClick={() => setManualSource(s.value)}
                >
                  <span className={styles.sourceIcon}>{s.icon}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>

            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setManualModal(null)}>
                Cancel
              </button>
              <button
                className={styles.modalConfirm}
                onClick={submitManual}
                disabled={manualLoading}
              >
                {manualLoading ? 'Saving…' : 'Confirm booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.cols}>
        {/* ── Left: tour tabs + calendar ── */}
        <div className={styles.left}>
          <div className={styles.tourTabs}>
            {tours.map(t => (
              <button
                key={t.id}
                className={`${styles.tourTab} ${activeTour?.id === t.id ? styles.tourTabActive : ''}`}
                onClick={() => setActiveTour(t)}
              >
                <span>{t.name}</span>
                <span className={styles.tourTabDuration}>{DURATION_LABEL[t.duration]}</span>
              </button>
            ))}
          </div>

          <div className={styles.calWrap}>
            <div className={styles.calHeader}>
              <button className={styles.calNav} onClick={prevMonth}>←</button>
              <span className={styles.calMonth}>{MONTHS[month]} {year}</span>
              <button className={styles.calNav} onClick={nextMonth}>→</button>
            </div>

            <div className={styles.calDayNames}>
              {['M','T','W','T','F','S','S'].map((d, i) => <span key={i}>{d}</span>)}
            </div>

            <div className={`${styles.calGrid} ${isPending ? styles.calPending : ''}`}>
              {cells.map((day, i) => {
                if (!day) return <div key={`e-${i}`} />
                const dateStr    = isoDate(year, month, day)
                const isPast     = dateStr < todayStr
                const entry      = availMap.get(`${activeTour?.id}::${dateStr}`)
                const isOpen     = entry?.open === true
                const booking    = bookings.find(
                  b => b.tour_id === activeTour?.id && b.date === dateStr && b.status === 'paid'
                )
                const hasBooking = !!booking
                const bookingSrc = booking?.source

                let cls = styles.calDay
                if (isPast)        cls += ` ${styles.calDayPast}`
                else if (hasBooking) cls += ` ${styles.calDayBooked}`
                else if (isOpen)   cls += ` ${styles.calDayOpen}`
                else               cls += ` ${styles.calDayOff}`

                // For open dates: left-click = toggle closed, right-click = log external booking
                const handleClick = () => {
                  if (isPast || hasBooking) return
                  toggle(dateStr)
                }

                const handleRightClick = (e) => {
                  e.preventDefault()
                  if (isPast || hasBooking || !isOpen) return
                  openManualModal(dateStr)
                }

                const tooltipMap = {
                  past:    'Past date',
                  booked:  `Booked via ${bookingSrc ? SOURCE_LABEL[bookingSrc] : 'website'}`,
                  open:    'Available — click to close · right-click to log external booking',
                  closed:  'Closed — click to open',
                }
                const tooltip = isPast ? tooltipMap.past
                  : hasBooking ? tooltipMap.booked
                  : isOpen     ? tooltipMap.open
                  : tooltipMap.closed

                return (
                  <button
                    key={dateStr}
                    className={cls}
                    disabled={isPast || isPending}
                    onClick={handleClick}
                    onContextMenu={handleRightClick}
                    title={tooltip}
                  >
                    {day}
                    {hasBooking && bookingSrc && bookingSrc !== 'website' && (
                      <span className={styles.srcDot} title={SOURCE_LABEL[bookingSrc]} />
                    )}
                  </button>
                )
              })}
            </div>

            <div className={styles.calLegend}>
              <span><span className={`${styles.ldot} ${styles.ldotOpen}`} /> Available</span>
              <span><span className={`${styles.ldot} ${styles.ldotOff}`} /> Closed</span>
              <span><span className={`${styles.ldot} ${styles.ldotBooked}`} /> Booked</span>
            </div>

            <p className={styles.calTip}>
              Right-click an available date to log an external booking.
            </p>
          </div>
        </div>

        {/* ── Right: upcoming bookings ── */}
        <div className={styles.right}>
          <h2 className={styles.rightHeading}>
            Upcoming bookings
            {activeTour && <span className={styles.rightTourName}> · {activeTour.name}</span>}
          </h2>

          {tourBookings.length === 0 ? (
            <p className={styles.empty}>No upcoming bookings for this tour.</p>
          ) : (
            <div className={styles.bookingList}>
              {tourBookings
                .sort((a, b) => a.date.localeCompare(b.date))
                .map(b => (
                <div
                  key={b.id}
                  className={`${styles.bookingCard} ${styles[`source_${b.source || 'website'}`]}`}
                >
                  <div className={styles.bookingTop}>
                    <span className={styles.bookingDate}>{fmtDate(b.date)}</span>
                    <span className={styles.bookingSourceTag}>
                      {SOURCE_LABEL[b.source || 'website']}
                    </span>
                  </div>

                  {b.name ? (
                    <>
                      <p className={styles.bookingName}>{b.name}</p>
                      <p className={styles.bookingMeta}>{b.email} · {b.phone}</p>
                      {b.guests > 1 && (
                        <p className={styles.bookingMeta}>{b.guests} guests</p>
                      )}
                      {b.message && (
                        <p className={styles.bookingMessage}>"{b.message}"</p>
                      )}
                    </>
                  ) : (
                    <p className={styles.bookingMeta}>External booking · no contact details</p>
                  )}

                  {/* Only allow cancelling non-Stripe bookings */}
                  {b.source !== 'website' && (
                    <button
                      className={styles.cancelBtn}
                      onClick={() => cancelBooking(b)}
                    >
                      Cancel & reopen slot
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
