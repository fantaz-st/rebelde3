import { getAllPosts } from "@/lib/journal";
import tours from "@/settings/tours";
import { SITE_URL } from "@/lib/schema";

/**
 * Sitemap.
 *
 * One entry per page. The per-locale duplicates and hreflang alternates went
 * when the site became English-only.
 */

const LAST_MOD = new Date();

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

const entry = ({ path, priority, freq, lastModified = LAST_MOD }) => ({
  url: `${SITE_URL}${path}`,
  lastModified,
  changeFrequency: freq,
  priority,
});

export default function sitemap() {
  const entries = pages.map(entry);

  // Individual tour pages — our biggest conversion pages.
  for (const tour of tours) {
    entries.push(entry({ path: `/tours/${tour.key}`, priority: 0.9, freq: "monthly" }));
  }

  // Journal posts — `publishedAt` gives a real per-post freshness signal.
  for (const post of getAllPosts()) {
    entries.push(
      entry({
        path: `/journal/${post.slug}`,
        priority: 0.6,
        freq: "yearly",
        lastModified: post.publishedAt ? new Date(post.publishedAt) : LAST_MOD,
      }),
    );
  }

  return entries;
}
