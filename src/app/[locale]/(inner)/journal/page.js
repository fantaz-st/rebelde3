import Link from "next/link";
import { getFeaturedAndOther } from "@/lib/journal";
import { breadcrumb, JsonLd, SITE_URL } from "@/lib/schema";

import styles from "./page.module.css";

export default async function JournalIndexPage({ params }) {
  const { locale } = await params;
  const { featured, other } = getFeaturedAndOther();

  const crumbsJsonLd = breadcrumb(
    [{ name: "Journal", url: "/journal" }],
    locale,
  );

  // Blog schema — index page of a periodical section.
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/journal#blog`,
    name: "Journal",
    description:
      "Stories from the Adriatic — guides, observations, and behind-the-scenes notes from Rebelde Boats.",
    url: `${SITE_URL}/journal`,
    inLanguage: "en",
    blogPost: [featured, ...other].filter(Boolean).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.publishedAt,
      url: `${SITE_URL}/journal/${p.slug}`,
      image: p.hero?.src ? `${SITE_URL}${p.hero.src}` : undefined,
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd} id="blog-jsonld" />
      <JsonLd data={crumbsJsonLd} id="breadcrumb-jsonld" />

      {/* ── Zone 1: Hero ───────────────────────────── */}
      <section data-zone="journal-hero" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1>Journal</h1>
            <p>
              Stories from the Adriatic — guides, observations, and
              behind-the-scenes notes.
            </p>
          </div>
        </div>
      </section>

      {/* ── Zone 2: Featured ───────────────────────── */}
      {featured && (
        <section data-zone="journal-featured">
          <Link href={`/journal/${featured.slug}`}>
            <div data-el="thumb">
              {featured.hero?.src && (
                <img src={featured.hero.src} alt={featured.hero.alt ?? ""} />
              )}
            </div>
            <div data-el="content">
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              <span data-el="button">Read the story →</span>
            </div>
          </Link>
        </section>
      )}

      {/* ── Zone 3: Other posts (staggered grid) ───── */}
      {other.length > 0 && (
        <section data-zone="journal-other">
          <ul data-list>
            {other.map((post) => (
              <li key={post.slug} data-item>
                <Link href={`/journal/${post.slug}`}>
                  <div data-el="thumb">
                    {post.hero?.src && (
                      <img src={post.hero.src} alt={post.hero.alt ?? ""} />
                    )}
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
