const SITE_URL = "https://www.rebelde.hr";
const LOCALES  = ["hr", "de", "es", "it", "fr"];
const LAST_MOD = new Date();

const pages = [
  { path: "",               priority: 1,    freq: "monthly" },
  { path: "/the-boat",      priority: 0.8,  freq: "yearly"  },
  { path: "/bespoke-tours", priority: 0.9,  freq: "monthly" },
  { path: "/faq",           priority: 0.6,  freq: "yearly"  },
  { path: "/contact",       priority: 0.5,  freq: "yearly"  },
  { path: "/availability",  priority: 0.9,  freq: "daily"   },
  { path: "/book",          priority: 0.85, freq: "daily"   },
];

export default function sitemap() {
  const entries = [];
  for (const page of pages) {
    entries.push({
      url: `${SITE_URL}${page.path}`,
      lastModified: LAST_MOD,
      changeFrequency: page.freq,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries([
          ["x-default", `${SITE_URL}${page.path}`],
          ["en",        `${SITE_URL}${page.path}`],
          ...LOCALES.map(l => [l, `${SITE_URL}/${l}${page.path}`]),
        ]),
      },
    });
    for (const l of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${l}${page.path}`,
        lastModified: LAST_MOD,
        changeFrequency: page.freq,
        priority: page.priority * 0.9,
      });
    }
  }
  return entries;
}
