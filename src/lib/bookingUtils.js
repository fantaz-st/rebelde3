// src/lib/bookingUtils.js
// Single source of truth — eliminates duplicates across booking, availability, admin

export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]
export const MONTHS_SHORT = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
]
export const DURATION_LABEL = {
  full: 'Full day',
  am:   'Half day · Morning',
  pm:   'Half day · Afternoon',
  half: 'Half day (AM or PM)',
}
export const SOURCES = [
  { value: 'website',      label: 'Website',      icon: '🌐' },
  { value: 'tripadvisor',  label: 'TripAdvisor',  icon: '🦉' },
  { value: 'getyourguide', label: 'GetYourGuide', icon: '🎫' },
  { value: 'walkin',       label: 'Walk-in',       icon: '🚶' },
]
export const SOURCE_LABEL = Object.fromEntries(
  SOURCES.map(s => [s.value, `${s.icon} ${s.label}`])
)
export const SOURCE_COLOR = {
  website:      { bg: '#dcfce7', color: '#15803d' },
  tripadvisor:  { bg: '#dcfce7', color: '#15803d' },
  getyourguide: { bg: '#ffedd5', color: '#c2410c' },
  walkin:       { bg: '#dbeafe', color: '#1d4ed8' },
}
export function isoDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}
export function fmtLong(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
}
export function fmtShort(dateStr) {
  const d = new Date(dateStr)
  return {
    day:     d.getDate(),
    weekday: d.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase(),
    month:   MONTHS_SHORT[d.getMonth()],
  }
}
