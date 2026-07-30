export const SITE_URL = "https://www.rebelde.hr";
export const SITE_NAME = "Rebelde Boats";
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORG_ID = `${SITE_URL}/#organization`;

export function breadcrumb(crumbs = [], locale = "en") {
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const items = [{ name: "Home", url: "/" }, ...crumbs];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item:
        `${SITE_URL}${localePrefix}${c.url === "/" ? "" : c.url}` || SITE_URL,
    })),
  };
}

export const businessRef = { "@id": BUSINESS_ID };

export function JsonLd({ data, id }) {
  return (
    <script
      type="application/ld+json"
      {...(id ? { id } : {})}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
