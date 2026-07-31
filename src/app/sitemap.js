import { getAllPosts } from "@/lib/journal";

const SITE_URL = "https://www.rebelde.hr";
const LOCALES  = ["hr", "de", "es", "it", "fr"];

const LAST_MOD = new Date();

// Fixed pages — one entry per page, hreflang'd across all locales.
const pages = [
  { path: "",               priority: 1,    freq: "monthly" },
  { path: "/the-boat",      priority: 0.8,  freq: "yearly"  },
  { path: "/bespoke-tours", priority: 0.9,  freq: "monthly" },
  { path: "/journal",       priority: 0.8,  freq: "monthly" },
  { path: "/reviews",       priority: 0.8,  freq: "monthly" },
  { path: "/faq",           priority: 0.7,  freq: "monthly" },
  { path: "/contact",       priority: 0.7,  freq: "yearly"  },
];

export default function sitemap() {
  const entries = [];

  // Static pages — each with locale alternates
  for (const page of pages) {
    entries.push({
      url:             `${SITE_URL}${page.path}`,
      lastModified:    LAST_MOD,
      changeFrequency: page.freq,
      priority:        page.priority,
      alternates: {
        languages: Object.fromEntries([
          ["x-default", `${SITE_URL}${page.path}`],
          ["en",        `${SITE_URL}${page.path}`],
          ...LOCALES.map((l) => [l, `${SITE_URL}/${l}${page.path}`]),
        ]),
      },
    });
    for (const l of LOCALES) {
      entries.push({
        url:             `${SITE_URL}/${l}${page.path}`,
        lastModified:    LAST_MOD,
        changeFrequency: page.freq,
        priority:        page.priority * 0.9,
      });
    }
  }

  // Journal posts — one entry per post. `publishedAt` becomes lastModified
  // so the freshness signal is real per-post, not per-build.
  const posts = getAllPosts();
  for (const post of posts) {
    const path = `/journal/${post.slug}`;
    entries.push({
      url:             `${SITE_URL}${path}`,
      lastModified:    post.publishedAt ? new Date(post.publishedAt) : LAST_MOD,
      changeFrequency: "yearly",
      priority:        0.6,
      alternates: {
        languages: Object.fromEntries([
          ["x-default", `${SITE_URL}${path}`],
          ["en",        `${SITE_URL}${path}`],
          ...LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ]),
      },
    });
    for (const l of LOCALES) {
      entries.push({
        url:             `${SITE_URL}/${l}${path}`,
        lastModified:    post.publishedAt ? new Date(post.publishedAt) : LAST_MOD,
        changeFrequency: "yearly",
        priority:        0.5,
      });
    }
  }

  return entries;
}
