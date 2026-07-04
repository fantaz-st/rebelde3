'use client'
import { useState, useTransition } from 'react'
import { createBrowserClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import styles from './admin.module.css'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const SOURCES = [
  { value: 'website',      label: 'Website',      icon: '🌐' },
  { value: 'tripadvisor',  label: 'TripAdvisor',  icon: '🦉' },
  { value: 'getyourguide', label: 'GetYourGuide', icon: '🎫' },
  { value: 'walkin',       label: 'Walk-in',       icon: '🚶' },
]
const SOURCE_LABEL = Object.fromEntries(SOURCES.map(s => [s.value, `${s.icon} ${s.label}`]))
const SOURCE_BADGE = {
  website:      { bg: '#dcfce7', color: '#15803d' },
  tripadvisor:  { bg: '#dcfce7', color: '#15803d' },
  getyourguide: { bg: '#ffedd5', color: '#c2410c' },
  walkin:       { bg: '#dbeafe', color: '#1d4ed8' },
}

function isoDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}
function fmtLong(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
}
function fmtBookingDate(dateStr) {
  const d = new Date(dateStr)
  return {
    day:     d.getDate(),
    weekday: d.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase(),
    month:   MONTHS_SHORT[d.getMonth()],
  }
}

export default function AdminPanel({ tours, availability: initialAvail, bookings: initialBookings, accessToken }) {
  const router = useRouter()
  const [avail,    setAvail]    = useState(initialAvail)
  const [bookings, setBookings] = useState(initialBookings)
  const [year,  setYear]  = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [isPending, startTransition] = useTransition()
  const [toast, setToast] = useState(null)
  const [selected, setSelected] = useState(new Set())
  const [bulkLoading, setBulkLoading] = useState(false)
  const [bookingModal, setBookingModal] = useState(null)
  const [manualModal,  setManualModal]  = useState(null) // { date }
  const [manualForm, setManualForm] = useState({
    tourId: '',
    source: 'walkin',
    name: '',
    phone: '',
  })
  const [manualLoading, setManualLoading] = useState(false)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const authHeaders = { 'Content-Type': 'application/json', 'x-admin-token': accessToken }
  const today    = new Date()
  const todayStr = isoDate(today.getFullYear(), today.getMonth(), today.getDate())
  const availMap = new Map(avail.map(a => [a.date, a]))
  const activeBookings = bookings.filter(b => b.status !== 'cancelled')

  // ── Single click: select/deselect ──
  const handleCellClick = (dateStr, hasBooking, booking) => {
    if (hasBooking) {
      setBookingModal(booking)
      return
    }
    setSelected(prev => {
      const next = new Set(prev)
      next.has(dateStr) ? next.delete(dateStr) : next.add(dateStr)
      return next
    })
  }

  // ── Right-click open date: open manual booking modal ──
  const handleContextMenu = (e, dateStr, hasBooking, booking, isOpen) => {
    e.preventDefault()
    if (hasBooking) { setBookingModal(booking); return }
    if (isOpen) {
      setManualForm({ tourId: tours[0]?.id || '', source: 'walkin', name: '', phone: '' })
      setManualModal({ date: dateStr })
    }
  }

  // ── Bulk open / close ──
  const bulkApply = async (open) => {
    if (selected.size === 0) return
    setBulkLoading(true)
    const dates = [...selected].filter(d => !activeBookings.find(b => b.date === d))
    const results = await Promise.all(dates.map(date =>
      fetch('/api/admin/availability', {
        method: 'POST', headers: authHeaders,
        body: JSON.stringify({ date, open }),
      }).then(r => r.json()).then(({ record }) => record)
    ))
    setAvail(prev => {
      const map = new Map(prev.map(a => [a.date, a]))
      results.forEach(r => r && map.set(r.date, r))
      return [...map.values()]
    })
    showToast(`${open ? 'Opened' : 'Closed'} ${dates.length} date${dates.length !== 1 ? 's' : ''}`)
    setSelected(new Set())
    setBulkLoading(false)
  }

  // ── Manual booking submit ──
  const submitManual = async () => {
    if (!manualModal || !manualForm.tourId) return
    setManualLoading(true)
    try {
      const res = await fetch('/api/admin/booking', {
        method: 'POST', headers: authHeaders,
        body: JSON.stringify({
          tourId: manualForm.tourId,
          date: manualModal.date,
          source: manualForm.source,
          name: manualForm.name || null,
          phone: manualForm.phone || null,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        const tourName = tours.find(t => t.id === manualForm.tourId)?.name
        setBookings(prev => [...prev, {
          ...data.booking,
          name: manualForm.name || null,
          phone: manualForm.phone || null,
          tours: { name: tourName }
        }])
        setAvail(prev => prev.map(a => a.date === manualModal.date ? { ...a, open: false } : a))
        showToast('Booking logged')
        setManualModal(null)
      } else {
        showToast(data.error || 'Failed', 'error')
      }
    } finally { setManualLoading(false) }
  }

  // ── Cancel booking ──
  const cancelBooking = async (booking) => {
    if (!confirm(`Cancel booking on ${fmtLong(booking.date)}?`)) return
    const res = await fetch('/api/admin/booking', {
      method: 'DELETE', headers: authHeaders,
      body: JSON.stringify({ bookingId: booking.id, date: booking.date }),
    })
    if (res.ok) {
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'cancelled' } : b))
      setAvail(prev => prev.map(a => a.date === booking.date ? { ...a, open: true } : a))
      setBookingModal(null)
      showToast('Booking cancelled — date reopened')
    } else {
      showToast('Failed to cancel', 'error')
    }
  }

  const handleLogout = async () => {
    await createBrowserClient().auth.signOut()
    router.push('/admin/login')
  }

  // Calendar helpers
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonth   = () => { if (month === 0) { setYear(y => y-1); setMonth(11) } else setMonth(m => m-1) }
  const nextMonth   = () => { if (month === 11) { setYear(y => y+1); setMonth(0) } else setMonth(m => m+1) }

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const firstDay = isoDate(year, month, 1)
  const lastDay  = isoDate(year, month, daysInMonth)
  const openCount   = avail.filter(a => a.open && !activeBookings.find(b => b.date === a.date) && a.date >= firstDay && a.date <= lastDay).length
  const bookedCount = activeBookings.filter(b => b.date >= firstDay && b.date <= lastDay).length

  const setField = (key, val) => setManualForm(f => ({ ...f, [key]: val }))

  return (
    <div className={styles.shell}>
      {/* Topbar */}
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <span className={styles.topbarLogo}>⚓</span>
          <span className={styles.topbarName}>Rebelde Boats</span>
          <span className={styles.topbarSep}>/</span>
          <span className={styles.topbarPage}>Availability</span>
        </div>
        <button className={styles.topbarSignout} onClick={handleLogout}>Sign out</button>
      </header>

      {/* Toast */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'error' ? styles.toastError : ''}`}>
          {toast.type === 'error' ? '✕' : '✓'} {toast.msg}
        </div>
      )}

      {/* ── Booking detail modal ── */}
      {bookingModal && (
        <div className={styles.overlay} onClick={() => setBookingModal(null)}>
          <div className={styles.dialog} onClick={e => e.stopPropagation()}>
            <div className={styles.dialogHeader}>
              <div>
                <h2 className={styles.dialogTitle}>Booking details</h2>
                <p className={styles.dialogSub}>{fmtLong(bookingModal.date)}</p>
              </div>
              <button className={styles.dialogClose} onClick={() => setBookingModal(null)}>✕</button>
            </div>
            <div className={styles.dialogBody}>
              <div className={styles.infoTable}>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>Tour</span>
                  <span className={styles.infoVal}>{bookingModal.tours?.name || '—'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>Source</span>
                  <span className={styles.pill} style={SOURCE_BADGE[bookingModal.source] || SOURCE_BADGE.website}>
                    {SOURCE_LABEL[bookingModal.source || 'website']}
                  </span>
                </div>
                {bookingModal.name && (
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>Guest</span>
                    <span className={styles.infoVal}>{bookingModal.name}</span>
                  </div>
                )}
                {bookingModal.email && (
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>Email</span>
                    <a href={`mailto:${bookingModal.email}`} className={styles.infoLink}>{bookingModal.email}</a>
                  </div>
                )}
                {bookingModal.phone && (
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>Phone</span>
                    <a href={`tel:${bookingModal.phone}`} className={styles.infoLink}>{bookingModal.phone}</a>
                  </div>
                )}
                {bookingModal.guests > 0 && (
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>Guests</span>
                    <span className={styles.infoVal}>{bookingModal.guests}</span>
                  </div>
                )}
                {bookingModal.message && (
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>Note</span>
                    <span className={`${styles.infoVal} ${styles.infoNote}`}>"{bookingModal.message}"</span>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.dialogFooter}>
              {bookingModal.source !== 'website' && (
                <button className={styles.btnDanger} onClick={() => cancelBooking(bookingModal)}>Cancel booking</button>
              )}
              <button className={styles.btnPrimary} onClick={() => setBookingModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Manual booking modal ── */}
      {manualModal && (
        <div className={styles.overlay} onClick={() => setManualModal(null)}>
          <div className={styles.dialog} onClick={e => e.stopPropagation()}>
            <div className={styles.dialogHeader}>
              <div>
                <h2 className={styles.dialogTitle}>Log external booking</h2>
                <p className={styles.dialogSub}>{fmtLong(manualModal.date)}</p>
              </div>
              <button className={styles.dialogClose} onClick={() => setManualModal(null)}>✕</button>
            </div>
            <div className={styles.dialogBody}>
              {/* Tour */}
              <label className={styles.fieldLabel}>Tour</label>
              <select
                className={styles.select}
                value={manualForm.tourId}
                onChange={e => setField('tourId', e.target.value)}
              >
                {tours.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>

              {/* Source */}
              <label className={styles.fieldLabel} style={{ marginTop: '1.25rem' }}>Source</label>
              <div className={styles.sourceGrid}>
                {SOURCES.map(s => (
                  <button
                    key={s.value}
                    className={`${styles.sourceChip} ${manualForm.source === s.value ? styles.sourceChipActive : ''}`}
                    onClick={() => setField('source', s.value)}
                  >
                    <span>{s.icon}</span><span>{s.label}</span>
                  </button>
                ))}
              </div>

              {/* Name */}
              <label className={styles.fieldLabel} style={{ marginTop: '1.25rem' }}>
                Guest name <span className={styles.fieldOptional}>(optional)</span>
              </label>
              <input
                className={styles.input}
                type="text"
                value={manualForm.name}
                onChange={e => setField('name', e.target.value)}
                placeholder="e.g. Ivan Horvat"
                autoComplete="off"
              />

              {/* Phone */}
              <label className={styles.fieldLabel} style={{ marginTop: '1rem' }}>
                Phone <span className={styles.fieldOptional}>(optional)</span>
              </label>
              <input
                className={styles.input}
                type="tel"
                value={manualForm.phone}
                onChange={e => setField('phone', e.target.value)}
                placeholder="e.g. +385 91 234 5678"
                autoComplete="off"
              />
            </div>
            <div className={styles.dialogFooter}>
              <button className={styles.btnSecondary} onClick={() => setManualModal(null)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={submitManual} disabled={manualLoading || !manualForm.tourId}>
                {manualLoading ? 'Saving…' : 'Confirm booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className={styles.main}>
        {/* Page header */}
        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderLeft}>
            <h1 className={styles.pageTitle}>{MONTHS[month]} {year}</h1>
            <div className={styles.pagePills}>
              <span className={styles.pillGreen}>{openCount} available</span>
              <span className={styles.pillDark}>{bookedCount} booked</span>
            </div>
          </div>
          <div className={styles.pageHeaderRight}>
            {selected.size > 0 ? (
              <div className={styles.bulkBar}>
                <span className={styles.bulkCount}>{selected.size} date{selected.size !== 1 ? 's' : ''} selected</span>
                <button className={styles.bulkOpen}  onClick={() => bulkApply(true)}  disabled={bulkLoading}>Mark available</button>
                <button className={styles.bulkClose} onClick={() => bulkApply(false)} disabled={bulkLoading}>Mark unavailable</button>
                <button className={styles.bulkClear} onClick={() => setSelected(new Set())}>✕ Clear</button>
              </div>
            ) : (
              <div className={styles.navBtns}>
                <button className={styles.navBtn} onClick={prevMonth} aria-label="Previous month">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className={styles.navBtn} onClick={nextMonth} aria-label="Next month">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.layout}>
          {/* Calendar */}
          <div className={styles.calCard}>
            <div className={styles.dayHeaders}>
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                <div key={d} className={styles.dayHeader}>{d}</div>
              ))}
            </div>
            <div className={`${styles.calGrid} ${isPending || bulkLoading ? styles.calDim : ''}`}>
              {cells.map((day, i) => {
                if (!day) return <div key={`e-${i}`} className={styles.calEmpty} />
                const dateStr    = isoDate(year, month, day)
                const isPast     = dateStr < todayStr
                const entry      = availMap.get(dateStr)
                const isOpen     = entry?.open === true
                const booking    = activeBookings.find(b => b.date === dateStr)
                const hasBooking = !!booking
                const isToday    = dateStr === todayStr
                const isSelected = selected.has(dateStr)

                return (
                  <div
                    key={dateStr}
                    className={[
                      styles.calCell,
                      isPast                        ? styles.cellPast   : '',
                      hasBooking                    ? styles.cellBooked  : '',
                      isOpen && !hasBooking && !isPast  ? styles.cellOpen   : '',
                      !isOpen && !hasBooking && !isPast ? styles.cellClosed : '',
                      isSelected                    ? styles.cellSelected : '',
                      isToday                       ? styles.cellToday  : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => !isPast && handleCellClick(dateStr, hasBooking, booking)}
                    onContextMenu={e => handleContextMenu(e, dateStr, hasBooking, booking, isOpen)}
                    title={
                      isPast     ? '' :
                      hasBooking ? 'Click to view booking details' :
                      isSelected ? 'Selected — use toolbar to open/close' :
                      isOpen     ? 'Click to select · Right-click to log booking' :
                      'Click to select'
                    }
                  >
                    <span className={`${styles.cellDayNum} ${isToday ? styles.cellDayToday : ''}`}>
                      {day}
                    </span>
                    {isSelected && !hasBooking && <span className={styles.cellCheck}>✓</span>}
                    {hasBooking && (
                      <span className={styles.cellEvent}>
                        <span className={styles.cellEventDot} />
                        {booking.tours?.name?.split(' & ')[0] || 'Booked'}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
            <div className={styles.calFooter}>
              <span className={styles.legendItem}><span className={styles.ldot} style={{background:'#bbf7d0'}} /> Available</span>
              <span className={styles.legendItem}><span className={styles.ldot} style={{background:'#fecaca'}} /> Unavailable</span>
              <span className={styles.legendItem}><span className={styles.ldot} style={{background:'#1e3a5f'}} /> Booked</span>
              <span className={styles.legendHint}>Click to select · Right-click available date to log booking</span>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <span className={styles.sidebarTitle}>Your bookings</span>
              <div className={styles.sidebarControls}>
                <span className={styles.sidebarBadge}>{activeBookings.length}</span>
              </div>
            </div>
            {activeBookings.length === 0 ? (
              <div className={styles.emptyState}>No upcoming bookings</div>
            ) : (
              <div className={styles.bookingList}>
                {[...activeBookings].sort((a, b) => a.date.localeCompare(b.date)).map(b => {
                  const { day, weekday, month: mo } = fmtBookingDate(b.date)
                  const badge = SOURCE_BADGE[b.source] || SOURCE_BADGE.website
                  return (
                    <div key={b.id} className={styles.bookingRow} onClick={() => setBookingModal(b)}>
                      <div className={styles.bookingDate}>
                        <span className={styles.bookingDay}>{day}</span>
                        <span className={styles.bookingWeekday}>{weekday}</span>
                      </div>
                      <div className={styles.bookingInfo}>
                        <span className={styles.bookingTour}>{b.tours?.name || 'Tour'}</span>
                        {b.name && <span className={styles.bookingGuest}>{b.name}</span>}
                        {b.phone && (
                          <a
                            href={`tel:${b.phone}`}
                            className={styles.bookingPhone}
                            onClick={e => e.stopPropagation()}
                          >
                            {b.phone}
                          </a>
                        )}
                        <div className={styles.bookingMeta}>
                          <span className={styles.bookingMo}>{mo}</span>
                          <span className={styles.pill} style={badge}>
                            {b.source === 'website' ? 'Web' : b.source === 'tripadvisor' ? 'TA' : b.source === 'getyourguide' ? 'GYG' : 'Walk-in'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <div className={styles.signoutRow}>
          <button className={styles.signoutBtn} onClick={handleLogout}>Sign out</button>
        </div>
      </main>
    </div>
  )
}
