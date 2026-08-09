/**
 * Per-route message scoping.
 *
 * `NextIntlClientProvider` serialises whatever you hand it into the HTML
 * payload of every page. The full message file is ~47 KB, so shipping all of
 * it everywhere means the homepage carries the entire FAQ and all four tours'
 * detail copy for no reason.
 *
 * Each route picks SHARED plus only the namespaces its client components
 * actually call `useTranslations()` on. Server components use
 * `getTranslations()` and never need to be listed here.
 *
 * If a client component throws `MISSING_MESSAGE`, its namespace is missing
 * from that route's list below — that's the only thing that can go wrong here.
 */

/** Header, Footer, WhatsAppButton, LanguageSwitcher — present on every page. */
export const SHARED = ["nav", "footer", "common", "booking"];

export const ROUTE_NAMESPACES = {
  home: [
    ...SHARED,
    "hero",
    "gallery",
    "tours",
    "tourItems",
    "boat",
    "team",
    "testimonials",
  ],
  tours: [...SHARED, "toursIndex", "tourItems", "tourDetail", "facts", "factsSection"],
  tour: [...SHARED, "tourItems", "tourDetail", "faq", "testimonials"],
  boat: [...SHARED, "boatHero", "boatSections", "boatSectionItems", "boatSpecs", "specs"],
  faq: [...SHARED, "faq", "faqCategories"],
  contact: [...SHARED, "contact"],
  reviews: [...SHARED, "testimonials"],
  journal: [...SHARED],
  booking: [...SHARED, "contact", "tourItems"],
};

/**
 * Pick a subset of the message tree.
 *
 * @param {object} messages full message object from `getMessages()`
 * @param {string[]} names top-level namespaces to keep
 */
export function pickMessages(messages, names) {
  const out = {};
  for (const name of names) {
    if (messages[name] !== undefined) out[name] = messages[name];
  }
  return out;
}

/**
 * Convenience: `scoped(messages, "faq")` → SHARED + the faq route's namespaces.
 * Unknown route names fall back to SHARED so a typo degrades instead of crashing.
 */
export function scoped(messages, route) {
  return pickMessages(messages, ROUTE_NAMESPACES[route] || SHARED);
}
