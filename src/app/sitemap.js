import { getAllPosts } from "@/lib/journal";
import tours from "@/settings/tours";
import { SITE_URL, LOCALES } from "@/lib/schema";

/**
 * Sitemap.
 *
 * `LOCALES` and `SITE_URL` come from lib/schema so the locale list is
 * defined once — it used to be redeclared here (and missing "en").
 */

const LAST_MOD = new Date();
const PREFIXED = LOCALES.filter((l) => l !== "en");

/**
 * Fixed pages. Tour detail pages are generated from settings/tours.js below,
 * so the bespoke charter is included automatically as /tours/bespoke-tour —
 * it no longer has a page of its own.
 */
const pages = [
  { path: "", priority: 1, freq: "monthly" },
  { path: "/tours", priority: 0.95, freq: "monthly" },
  { path: "/the-boat", priority: 0.8, freq: "yearly" },
  { path: "/journal", priority: 0.8, freq: "monthly" },
  { path: "/reviews", priority: 0.8, freq: "weekly" },
  { path: "/faq", priority: 0.7, freq: "monthly" },
  { path: "/contact", priority: 0.7, freq: "yearly" },
];

const alternates = (path) => ({
  languages: Object.fromEntries([
    ["x-default", `${SITE_URL}${path}`],
    ["en", `${SITE_URL}${path}`],
    ...PREFIXED.map((l) => [l, `${SITE_URL}/${l}${path}`]),
  ]),
});

/** One canonical (English) entry plus a plain entry per prefixed locale. */
function entriesFor({ path, priority, freq, lastModified = LAST_MOD }) {
  return [
    {
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: freq,
      priority,
      alternates: alternates(path),
    },
    ...PREFIXED.map((l) => ({
      url: `${SITE_URL}/${l}${path}`,
      lastModified,
      changeFrequency: freq,
      priority: Math.round(priority * 0.9 * 100) / 100,
    })),
  ];
}

export default function sitemap() {
  const entries = [];

  for (const page of pages) {
    entries.push(...entriesFor(page));
  }

  // Individual tour pages — our biggest conversion pages.
  for (const tour of tours) {
    entries.push(
      ...entriesFor({
        path: `/tours/${tour.key}`,
        priority: 0.9,
        freq: "monthly",
      }),
    );
  }

  // Journal posts — `publishedAt` gives a real per-post freshness signal.
  for (const post of getAllPosts()) {
    entries.push(
      ...entriesFor({
        path: `/journal/${post.slug}`,
        priority: 0.6,
        freq: "yearly",
        lastModified: post.publishedAt ? new Date(post.publishedAt) : LAST_MOD,
      }),
    );
  }

  return entries;
}
