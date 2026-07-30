/**
 * Schema.org / JSON-LD helpers.
 *
 * Keeping schema builders in one file makes it easy to update
 * site-wide facts (URL, business ID) in a single place.
 *
 * All functions produce plain objects — you serialise them into
 * <script type="application/ld+json"> at the render site.
 */

export const SITE_URL     = "https://www.rebelde.hr";
export const SITE_NAME    = "Rebelde Boats";
export const BUSINESS_ID  = `${SITE_URL}/#business`;
export const WEBSITE_ID   = `${SITE_URL}/#website`;
export const ORG_ID       = `${SITE_URL}/#organization`;

/**
 * Build a BreadcrumbList schema for a page.
 * Home crumb is always added automatically.
 *
 * For locale-prefixed URLs, pass the locale so items point to the
 * correct URL (Croatian home crumb → /hr, English → /).
 *
 * @example
 * breadcrumb([{ name: "The Boat", url: "/the-boat" }], "en")
 */
export function breadcrumb(crumbs = [], locale = "en") {
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const items = [
    { name: "Home", url: "/" },
    ...crumbs,
  ];

  return {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type":   "ListItem",
      position:  i + 1,
      name:      c.name,
      item:      `${SITE_URL}${localePrefix}${c.url === "/" ? "" : c.url}` || SITE_URL,
    })),
  };
}

/**
 * Reference object pointing at the site's LocalBusiness node
 * (defined in [locale]/layout.js). Use to link other schemas
 * back to the business without duplicating its data.
 */
export const businessRef = { "@id": BUSINESS_ID };

/**
 * Inline <script type="application/ld+json"> tag for Server Components.
 * Prefer over duplicated dangerouslySetInnerHTML incantations.
 *
 * @example
 * <JsonLd data={breadcrumb([...], locale)} id="breadcrumb-jsonld" />
 */
export function JsonLd({ data, id }) {
  return (
    <script
      type="application/ld+json"
      {...(id ? { id } : {})}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
