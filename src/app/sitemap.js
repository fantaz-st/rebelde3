const LAST_MODIFIED = new Date();

const SITE_URL = "https://www.rebelde.hr";
const LOCALES = ["hr", "de", "es", "it", "fr"]; // en is at root

const pages = [
  { path: "",            priority: 1,   changeFrequency: "monthly" },
  { path: "/the-boat",  priority: 0.8, changeFrequency: "yearly" },
  { path: "/bespoke-tours", priority: 0.9, changeFrequency: "monthly" },
  { path: "/faq",       priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact",   priority: 0.5, changeFrequency: "yearly" },
];

export default function sitemap() {
  const entries = [];

  for (const page of pages) {
    // English at root
    entries.push({
      url: `${SITE_URL}${page.path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries([
          ["en", `${SITE_URL}${page.path}`],
          ...LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${page.path}`]),
        ]),
      },
    });

    // Other locales
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: page.changeFrequency,
        priority: page.priority * 0.9,
      });
    }
  }

  return entries;
}
