/**
 * View models for a tour.
 *
 * Structure and copy both live in settings/tours.js now, so these are simple
 * shape adapters — no message lookups. `buildTourView` exists to give the
 * detail sections a stable object even though it currently passes the tour
 * through unchanged; `buildTourCard` narrows it for cards and sliders.
 */

export function buildTourView(tour) {
  return { ...tour };
}

/** Light version for cards and lists — no arrays, no detail copy. */
export function buildTourCard(tour) {
  return {
    key: tour.key,
    href: `/tours/${tour.key}`,
    thumb: tour.thumb,
    depositEur: tour.depositEur,
    restEur: tour.restEur,
    label: tour.label,
    kicker: tour.kicker,
    pin: tour.pin,
    thumbAlt: tour.thumbAlt,
    intro: tour.intro,
    durationLabel: tour.durationLabel,
    priceLabel: tour.priceLabel,
  };
}
