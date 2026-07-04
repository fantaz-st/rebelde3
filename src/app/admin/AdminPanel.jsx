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
const SOURCE_COLOR = {
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
function fmtShort(dateStr) {
  const d = new Date(dateStr)
  return {
    day:     d.getDate(),
    weekday: d.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase(),
    month:   MONTHS_SHORT[d.getMonth()],
  }
}

// Sidebar panel modes
// null = bookings list
// { type: 'booking', booking } = view booking detail
// { type: 'log', date } = log new booking

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

  // Sidebar state — replaces all modals
  const [sidebar, setSidebar] = useState(null)

  // Log booking form
  const [logForm, setLogForm] = useState({
    tourId: tours[0]?.id || '',
    source: 'walkin',
    slot: 'am',
    name: '',
    phone: '',
  })
  const [logLoading, setLogLoading] = useState(false)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const authHeaders = { 'Content-Type': 'application/json', 'x-admin-token': accessToken }
  const today    = new Date()
  const todayStr = isoDate(today.getFullYear(), today.getMonth(), today.getDate())
  const availMap = new Map(avail.map(a => [a.date, a]))
  const activeBookings = bookings.filter(b => b.status !== 'cancelled')

  // ── Cell click ──
  const handleCellClick = (dateStr, hasBooking, booking, isOpen) => {
    if (hasBooking) {
      // For half-day: might have two bookings on same date
      const dayBookings = activeBookings.filter(b => b.date === dateStr)
      setSidebar({ type: 'booking', booking: dayBookings[0], allBookings: dayBookings, date: dateStr })
      setSelected(new Set())
      return
    }
    // Select/deselect for bulk
    setSelected(prev => {
      const next = new Set(prev)
      next.has(dateStr) ? next.delete(dateStr) : next.add(dateStr)
      return next
    })
    setSidebar(null)
  }

  // ── Log booking button ──
  const openLogBooking = (dateStr) => {
    setLogForm({ tourId: tours[0]?.id || '', source: 'walkin', slot: 'am', name: '', phone: '' })
    setSidebar({ type: 'log', date: dateStr })
    setSelected(new Set())
  }

  // ── Bulk ──
  const bulkApply = async (open) => {
    if (selected.size === 0) return
    setBulkLoading(true)
    // Only apply to dates that aren't already in the target state and have no booking
    const dates = [...selected].filter(d => {
      if (activeBookings.find(b => b.date === d)) return false
      const entry = availMap.get(d)
      if (open && entry?.open === true) return false   // already open, skip
      if (!open && entry?.open === false) return false // already closed, skip
      return true
    })
    if (dates.length === 0) {
      showToast('Nothing to change — dates are already in that state')
      setSelected(new Set())
      setBulkLoading(false)
      return
    }
    try {
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
    } catch {
      showToast('Something went wrong', 'error')
    }
    setSelected(new Set())
    setBulkLoading(false)
  }

  // ── Submit log booking ──
  const submitLog = async () => {
    if (!sidebar?.date || !logForm.tourId) return
    setLogLoading(true)
    try {
      const selectedTour = tours.find(t => t.id === logForm.tourId)
      const res = await fetch('/api/admin/booking', {
        method: 'POST', headers: authHeaders,
        body: JSON.stringify({
          tourId: logForm.tourId,
          date: sidebar.date,
          source: logForm.source,
          slot: selectedTour?.duration === 'half' ? logForm.slot : undefined,
          name: logForm.name || null,
          phone: logForm.phone || null,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        const tourName = selectedTour?.name
        const newBooking = { ...data.booking, tours: { name: tourName } }
        setBookings(prev => [...prev, newBooking])
        setAvail(prev => prev.map(a => a.date === sidebar.date ? { ...a, open: false } : a))
        showToast('Booking logged')
        setSidebar({ type: 'booking', booking: newBooking, allBookings: [newBooking], date: sidebar.date })
      } else {
        showToast(data.error || 'Failed', 'error')
      }
    } finally { setLogLoading(false) }
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
      setSidebar(null)
      showToast('Booking cancelled — date reopened')
    } else {
      showToast('Failed to cancel', 'error')
    }
  }

  const handleLogout = async () => {
    await createBrowserClient().auth.signOut()
    router.push('/admin/login')
  }

  // Calendar
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonth   = () => { if (month === 0) { setYear(y => y-1); setMonth(11) } else setMonth(m => m-1) }
  const nextMonth   = () => { if (month === 11) { setYear(y => y+1); setMonth(0) } else setMonth(m => m+1) }

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const firstDay   = isoDate(year, month, 1)
  const lastDay    = isoDate(year, month, daysInMonth)
  const openCount  = avail.filter(a => a.open && !activeBookings.find(b => b.date === a.date) && a.date >= firstDay && a.date <= lastDay).length
  const bookedCount = activeBookings.filter(b => b.date >= firstDay && b.date <= lastDay).length

  const setField = (key, val) => setLogForm(f => ({ ...f, [key]: val }))
  const selectedTourObj = tours.find(t => t.id === logForm.tourId)
  const isHalfTour = selectedTourObj?.duration === 'half'

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
                <span className={styles.bulkCount}>{selected.size} selected</span>
                {/* Only show "Mark available" if some selected dates are closed */}
                {[...selected].some(d => availMap.get(d)?.open === false || !availMap.has(d)) && (
                  <button className={styles.bulkOpen} onClick={() => bulkApply(true)} disabled={bulkLoading}>
                    Mark available
                  </button>
                )}
                {/* Only show "Mark unavailable" if some selected dates are open */}
                {[...selected].some(d => availMap.get(d)?.open === true) && (
                  <button className={styles.bulkClose} onClick={() => bulkApply(false)} disabled={bulkLoading}>
                    Mark unavailable
                  </button>
                )}
                <button className={styles.bulkClear} onClick={() => setSelected(new Set())}>✕ Clear</button>
              </div>
            ) : (
              <div className={styles.navBtns}>
                <button className={styles.navBtn} onClick={prevMonth}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className={styles.navBtn} onClick={nextMonth}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={`${styles.layout} ${sidebar ? styles.layoutWithSidebar : ''}`}>
          {/* ── Calendar ── */}
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
                const dayBookings = activeBookings.filter(b => b.date === dateStr)
                const hasBooking = dayBookings.length > 0
                const isToday    = dateStr === todayStr
                const isSelected = selected.has(dateStr)
                const isSidebarDate = sidebar?.date === dateStr

                return (
                  <div
                    key={dateStr}
                    className={[
                      styles.calCell,
                      isPast     ? styles.cellPast    : '',
                      hasBooking ? styles.cellBooked   : '',
                      isOpen && !hasBooking && !isPast ? styles.cellOpen : '',
                      !isOpen && !hasBooking && !isPast ? styles.cellClosed : '',
                      isSelected ? styles.cellSelected  : '',
                      isToday    ? styles.cellToday    : '',
                      isSidebarDate ? styles.cellActive : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => !isPast && handleCellClick(dateStr, hasBooking, dayBookings[0], isOpen)}
                  >
                    <span className={`${styles.cellDayNum} ${isToday ? styles.cellDayToday : ''}`}>{day}</span>
                    {isSelected && !hasBooking && <span className={styles.cellCheck}>✓</span>}
                    {hasBooking && (
                      <div className={styles.cellEvents}>
                        {dayBookings.map((b, bi) => (
                          <span key={bi} className={styles.cellEvent}>
                            <span className={styles.cellEventDot} />
                            <span className={styles.cellEventText}>
                              {b.slot === 'am' ? 'AM · ' : b.slot === 'pm' ? 'PM · ' : ''}
                              {b.tours?.name?.split(' & ')[0] || 'Booked'}
                            </span>
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Log booking button — appears on selected open dates */}
                    {isSelected && isOpen && !hasBooking && (
                      <button
                        className={styles.logBtn}
                        onClick={e => { e.stopPropagation(); openLogBooking(dateStr) }}
                      >
                        + Log booking
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
            <div className={styles.calFooter}>
              <span className={styles.legendItem}><span className={styles.ldot} style={{background:'#bbf7d0'}} /> Available</span>
              <span className={styles.legendItem}><span className={styles.ldot} style={{background:'#fecaca'}} /> Unavailable</span>
              <span className={styles.legendItem}><span className={styles.ldot} style={{background:'#1e3a5f'}} /> Booked</span>
              <span className={styles.legendHint}>Click available date to select · Click booked date to view details</span>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className={`${styles.sidebar} ${sidebar ? styles.sidebarOpen : ''}`}>

            {/* ── No panel: bookings list ── */}
            {!sidebar && (
              <>
                <div className={styles.sidebarHeader}>
                  <span className={styles.sidebarTitle}>Your bookings</span>
                  <span className={styles.sidebarBadge}>{activeBookings.length}</span>
                </div>
                {activeBookings.length === 0 ? (
                  <div className={styles.emptyState}>No upcoming bookings</div>
                ) : (
                  <div className={styles.bookingList}>
                    {[...activeBookings].sort((a, b) => a.date.localeCompare(b.date)).map(b => {
                      const { day, weekday, month: mo } = fmtShort(b.date)
                      const sc = SOURCE_COLOR[b.source] || SOURCE_COLOR.website
                      return (
                        <div key={b.id} className={styles.bookingRow} onClick={() => {
                          const dayBookings = activeBookings.filter(bb => bb.date === b.date)
                          setSidebar({ type: 'booking', booking: b, allBookings: dayBookings, date: b.date })
                        }}>
                          <div className={styles.bookingDate}>
                            <span className={styles.bookingDay}>{day}</span>
                            <span className={styles.bookingWeekday}>{weekday}</span>
                          </div>
                          <div className={styles.bookingInfo}>
                            <span className={styles.bookingTour}>{b.tours?.name || 'Tour'}</span>
                            {b.slot && b.slot !== 'full' && (
                              <span className={styles.bookingSlot}>{b.slot === 'am' ? '🌅 Morning' : '🌇 Afternoon'}</span>
                            )}
                            {b.name && <span className={styles.bookingGuest}>{b.name}</span>}
                            {b.phone && (
                              <a href={`tel:${b.phone}`} className={styles.bookingPhone} onClick={e => e.stopPropagation()}>
                                {b.phone}
                              </a>
                            )}
                          </div>
                          <span className={styles.pill} style={sc}>
                            {b.source === 'website' ? 'Web' : b.source === 'tripadvisor' ? 'TA' : b.source === 'getyourguide' ? 'GYG' : 'Walk-in'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            )}

            {/* ── Booking detail panel ── */}
            {sidebar?.type === 'booking' && (
              <>
                <div className={styles.sidebarHeader}>
                  <div>
                    <span className={styles.sidebarTitle}>Booking details</span>
                    <p className={styles.sidebarSub}>{fmtLong(sidebar.date)}</p>
                  </div>
                  <button className={styles.sidebarClose} onClick={() => setSidebar(null)}>✕</button>
                </div>

                {/* Show all bookings on this date */}
                {sidebar.allBookings?.map((b, idx) => {
                  const sc = SOURCE_COLOR[b.source] || SOURCE_COLOR.website
                  return (
                    <div key={b.id} className={styles.detailBlock}>
                      {sidebar.allBookings.length > 1 && (
                        <p className={styles.detailSlotLabel}>
                          {b.slot === 'am' ? '🌅 Morning booking' : b.slot === 'pm' ? '🌇 Afternoon booking' : 'Booking'}
                        </p>
                      )}
                      <div className={styles.infoTable}>
                        <div className={styles.infoRow}>
                          <span className={styles.infoKey}>Tour</span>
                          <span className={styles.infoVal}>{b.tours?.name || '—'}</span>
                        </div>
                        {b.slot && b.slot !== 'full' && (
                          <div className={styles.infoRow}>
                            <span className={styles.infoKey}>Slot</span>
                            <span className={styles.infoVal}>{b.slot === 'am' ? '🌅 Morning (AM)' : '🌇 Afternoon (PM)'}</span>
                          </div>
                        )}
                        <div className={styles.infoRow}>
                          <span className={styles.infoKey}>Source</span>
                          <span className={styles.pill} style={sc}>{SOURCE_LABEL[b.source || 'website']}</span>
                        </div>
                        {b.name && (
                          <div className={styles.infoRow}>
                            <span className={styles.infoKey}>Guest</span>
                            <span className={styles.infoVal}>{b.name}</span>
                          </div>
                        )}
                        {b.email && (
                          <div className={styles.infoRow}>
                            <span className={styles.infoKey}>Email</span>
                            <a href={`mailto:${b.email}`} className={styles.infoLink}>{b.email}</a>
                          </div>
                        )}
                        {b.phone && (
                          <div className={styles.infoRow}>
                            <span className={styles.infoKey}>Phone</span>
                            <a href={`tel:${b.phone}`} className={styles.infoLink}>{b.phone}</a>
                          </div>
                        )}
                        {b.guests > 0 && (
                          <div className={styles.infoRow}>
                            <span className={styles.infoKey}>Guests</span>
                            <span className={styles.infoVal}>{b.guests}</span>
                          </div>
                        )}
                        {b.message && (
                          <div className={styles.infoRow}>
                            <span className={styles.infoKey}>Note</span>
                            <span className={`${styles.infoVal} ${styles.infoNote}`}>"{b.message}"</span>
                          </div>
                        )}
                      </div>
                      {b.source !== 'website' && (
                        <button className={styles.btnDanger} onClick={() => cancelBooking(b)}>
                          Cancel booking
                        </button>
                      )}
                    </div>
                  )
                })}

                {/* Add second half-day booking if only one half-day booked */}
                {(() => {
                  const dayBookings = sidebar.allBookings || []
                  const slots = new Set(dayBookings.map(b => b.slot))
                  const canAddMore = !slots.has('full') && !(slots.has('am') && slots.has('pm'))
                  const freeSlot = slots.has('am') ? 'pm' : 'am'
                  const hasHalfTour = tours.some(t => t.duration === 'half')
                  if (!canAddMore || !hasHalfTour) return null
                  return (
                    <div className={styles.addSlotBlock}>
                      <p className={styles.addSlotLabel}>
                        {freeSlot === 'am' ? '🌅 Morning slot is free' : '🌇 Afternoon slot is free'}
                      </p>
                      <button
                        className={styles.btnSecondary}
                        onClick={() => {
                          const halfTour = tours.find(t => t.duration === 'half')
                          setLogForm({
                            tourId: halfTour?.id || '',
                            source: 'walkin',
                            slot: freeSlot,
                            name: '', phone: ''
                          })
                          setSidebar({ type: 'log', date: sidebar.date })
                        }}
                      >
                        + Log {freeSlot === 'am' ? 'morning' : 'afternoon'} booking
                      </button>
                    </div>
                  )
                })()}
              </>
            )}

            {/* ── Log booking panel ── */}
            {sidebar?.type === 'log' && (
              <>
                <div className={styles.sidebarHeader}>
                  <div>
                    <span className={styles.sidebarTitle}>Log booking</span>
                    <p className={styles.sidebarSub}>{fmtLong(sidebar.date)}</p>
                  </div>
                  <button className={styles.sidebarClose} onClick={() => setSidebar(null)}>✕</button>
                </div>

                <div className={styles.logForm}>
                  {/* Tour */}
                  <label className={styles.fieldLabel}>Tour</label>
                  <select className={styles.select} value={logForm.tourId} onChange={e => setField('tourId', e.target.value)}>
                    {tours.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>

                  {/* AM/PM — only for half-day tours */}
                  {isHalfTour && (
                    <>
                      <label className={styles.fieldLabel}>Time slot</label>
                      <div className={styles.slotPicker}>
                        <button
                          className={`${styles.slotBtn} ${logForm.slot === 'am' ? styles.slotBtnActive : ''}`}
                          onClick={() => setField('slot', 'am')}
                        >🌅 Morning (AM)</button>
                        <button
                          className={`${styles.slotBtn} ${logForm.slot === 'pm' ? styles.slotBtnActive : ''}`}
                          onClick={() => setField('slot', 'pm')}
                        >🌇 Afternoon (PM)</button>
                      </div>
                    </>
                  )}

                  {/* Source */}
                  <label className={styles.fieldLabel}>Source</label>
                  <div className={styles.sourceGrid}>
                    {SOURCES.map(s => (
                      <button
                        key={s.value}
                        className={`${styles.sourceChip} ${logForm.source === s.value ? styles.sourceChipActive : ''}`}
                        onClick={() => setField('source', s.value)}
                      >
                        <span>{s.icon}</span><span>{s.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Name */}
                  <label className={styles.fieldLabel}>Guest name <span className={styles.fieldOptional}>(optional)</span></label>
                  <input
                    className={styles.input}
                    type="text"
                    value={logForm.name}
                    onChange={e => setField('name', e.target.value)}
                    placeholder="e.g. Ivan Horvat"
                  />

                  {/* Phone */}
                  <label className={styles.fieldLabel}>Phone <span className={styles.fieldOptional}>(optional)</span></label>
                  <input
                    className={styles.input}
                    type="tel"
                    value={logForm.phone}
                    onChange={e => setField('phone', e.target.value)}
                    placeholder="+385 91 234 5678"
                  />

                  <div className={styles.logActions}>
                    <button className={styles.btnCancel} onClick={() => setSidebar(null)}>Cancel</button>
                    <button
                      className={styles.btnConfirm}
                      onClick={submitLog}
                      disabled={logLoading || !logForm.tourId}
                    >
                      {logLoading ? 'Saving…' : 'Confirm booking'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
