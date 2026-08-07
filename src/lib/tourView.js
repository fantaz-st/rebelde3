/**
 * Merges a tour's structure (settings/tours.js) with its copy
 * (messages `tourItems.<key>`) into one object.
 *
 * This is the seam that used to be missing: previously the detail sections
 * read English strings straight out of settings/tours.js, so /de/tours/... and
 * /fr/tours/... rendered English no matter what the locale was.
 *
 * `t` must be scoped to the `tourItems` namespace.
 */
export function buildTourView(tour, t) {
  const key = tour.key;
  const captions = t.raw(`${key}.gallery`) || [];

  return {
    // structure
    ...tour,

    // copy
    label: t(`${key}.label`),
    kicker: t(`${key}.kicker`),
    pin: t(`${key}.pin`),
    thumbAlt: t(`${key}.thumbAlt`),
    intro: t(`${key}.intro`),
    ctaText: t(`${key}.ctaText`),
    durationLabel: t(`${key}.durationLabel`),
    capacityLabel: t(`${key}.capacityLabel`),
    priceLabel: t(`${key}.priceLabel`),

    overview: t.raw(`${key}.overview`),
    keyFacts: t.raw(`${key}.keyFacts`),
    itinerary: t.raw(`${key}.itinerary`),
    included: t.raw(`${key}.included`),
    notIncluded: t.raw(`${key}.notIncluded`),
    whoItsFor: t.raw(`${key}.whoItsFor`),
    logistics: t.raw(`${key}.logistics`),

    // image paths zipped with their translated captions, by index
    gallery: tour.gallery.map((src, i) => ({ src, caption: captions[i] || "" })),
  };
}

/** Light version for cards and lists — no arrays, no detail copy. */
export function buildTourCard(tour, t) {
  const key = tour.key;
  return {
    key,
    href: `/tours/${key}`,
    thumb: tour.thumb,
    depositEur: tour.depositEur,
    restEur: tour.restEur,
    label: t(`${key}.label`),
    kicker: t(`${key}.kicker`),
    pin: t(`${key}.pin`),
    thumbAlt: t(`${key}.thumbAlt`),
    intro: t(`${key}.intro`),
    durationLabel: t(`${key}.durationLabel`),
    priceLabel: t(`${key}.priceLabel`),
  };
}
