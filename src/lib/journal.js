/**
 * Journal helpers — reads all .mdx files from src/content/journal/,
 * parses frontmatter, and provides lookups.
 *
 * All functions run at BUILD TIME on the server (Node fs). Do not import
 * from client components.
 *
 * The list of posts is memoised per process so we don't re-read the disk
 * on every request during dev.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const JOURNAL_DIR = path.join(process.cwd(), "src/content/journal");

let _cache = null;

/**
 * Returns all posts, sorted newest first. Each post is:
 * {
 *   slug, title, description, publishedAt, readingTime,
 *   featured, hero, seo, body, wordCount
 * }
 */
export function getAllPosts() {
  if (_cache && process.env.NODE_ENV === "production") return _cache;

  if (!fs.existsSync(JOURNAL_DIR)) {
    _cache = [];
    return _cache;
  }

  const files = fs
    .readdirSync(JOURNAL_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.(mdx|md)$/, "");
    const raw  = fs.readFileSync(path.join(JOURNAL_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    // Auto-compute reading time if not set (200 words/min baseline)
    const wordCount   = content.trim().split(/\s+/).length;
    const readingTime =
      typeof data.readingTime === "number"
        ? data.readingTime
        : Math.max(1, Math.round(wordCount / 200));

    return {
      slug,
      title:       data.title       ?? "Untitled",
      description: data.description ?? "",
      publishedAt: data.publishedAt ?? null,
      readingTime,
      featured:    Boolean(data.featured),
      hero:        data.hero        ?? null,
      seo:         data.seo         ?? {},
      body:        content,
      wordCount,
    };
  });

  // Sort newest first
  posts.sort((a, b) => {
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  _cache = posts;
  return posts;
}

/** All post slugs — used by generateStaticParams for [slug] route. */
export function getAllSlugs() {
  return getAllPosts().map((p) => p.slug);
}

/** One post by slug, or null. */
export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

/**
 * Split posts into featured (Zone 2) and other (Zone 3).
 *
 * Rules:
 *  - We only ever surface ONE featured post at a time (design decision).
 *  - If multiple posts have `featured: true`, we pick the newest.
 *  - If no post has `featured: true`, we auto-promote the newest post
 *    so the "Popular" zone is never empty.
 *  - The chosen featured post is excluded from the "other" grid.
 */
export function getFeaturedAndOther() {
  const posts = getAllPosts();
  if (posts.length === 0) return { featured: null, other: [] };

  const explicitFeatured = posts.filter((p) => p.featured);
  const featured =
    explicitFeatured.length > 0 ? explicitFeatured[0] : posts[0];

  const other = posts.filter((p) => p.slug !== featured.slug);
  return { featured, other };
}

/**
 * Previous & next post for [slug] page — used by prev/next navigation.
 * Both may be null at list boundaries.
 */
export function getAdjacentPosts(slug) {
  const posts = getAllPosts();
  const idx   = posts.findIndex((p) => p.slug === slug);
  if (idx < 0) return { prev: null, next: null };
  return {
    prev: idx > 0                 ? posts[idx - 1] : null,
    next: idx < posts.length - 1  ? posts[idx + 1] : null,
  };
}
