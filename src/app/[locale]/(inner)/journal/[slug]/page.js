import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllSlugs, getAdjacentPosts } from "@/lib/journal";
import { breadcrumb, JsonLd, SITE_URL, BUSINESS_ID, ORG_ID } from "@/lib/schema";

// Pre-render all journal pages at build time.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Per-post metadata — title, description, OG image.
export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const canonical    = `${SITE_URL}${localePrefix}/journal/${slug}`;
  const ogImage      = post.seo?.ogImage
    ? `${SITE_URL}${post.seo.ogImage}`
    : post.hero?.src
      ? `${SITE_URL}${post.hero.src}`
      : `${SITE_URL}/opengraph-image.jpg`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.hero?.alt ?? post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

// Custom MDX component overrides — Phase 1 uses defaults, Phase 3 will
// inject styled versions (drop caps, wide images, pull quotes, etc.).
const mdxComponents = {};

export default async function JournalPostPage({ params }) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const canonical    = `${SITE_URL}${localePrefix}/journal/${slug}`;
  const heroFull     = post.hero?.src ? `${SITE_URL}${post.hero.src}` : undefined;

  // Article schema — this is what unlocks featured-snippet eligibility.
  const articleJsonLd = {
    "@context":     "https://schema.org",
    "@type":        "Article",
    "@id":          `${canonical}#article`,
    headline:       post.title,
    description:    post.description,
    datePublished:  post.publishedAt,
    dateModified:   post.publishedAt,
    wordCount:      post.wordCount,
    inLanguage:     "en",
    author:         { "@id": ORG_ID },
    publisher:      { "@id": BUSINESS_ID },
    mainEntityOfPage: canonical,
    ...(heroFull && {
      image: {
        "@type": "ImageObject",
        url:     heroFull,
        width:   1200,
        height:  630,
      },
    }),
  };

  const crumbsJsonLd = breadcrumb(
    [
      { name: "Journal",     url: "/journal" },
      { name: post.title,    url: `/journal/${slug}` },
    ],
    locale,
  );

  return (
    <>
      <JsonLd data={articleJsonLd} id="article-jsonld" />
      <JsonLd data={crumbsJsonLd}  id="breadcrumb-jsonld" />

      <article data-zone="journal-post">
        {/* ── Post hero ───────────────────────────── */}
        <header data-el="post-header">
          <div className="container">
            <p data-el="meta">
              <span>{post.readingTime} min read</span>
            </p>
            <h1>{post.title}</h1>
            <p data-el="description">{post.description}</p>
          </div>
          {post.hero?.src && (
            <div data-el="hero-image">
              <img src={post.hero.src} alt={post.hero.alt ?? ""} />
            </div>
          )}
        </header>

        {/* ── Post body (MDX render) ──────────────── */}
        <div data-el="post-body">
          <div className="container">
            <MDXRemote source={post.body} components={mdxComponents} />
          </div>
        </div>

        {/* ── Prev / next navigation ──────────────── */}
        {(prev || next) && (
          <nav data-el="post-nav" aria-label="More stories">
            <div className="container">
              {prev && (
                <Link href={`/journal/${prev.slug}`} data-dir="prev">
                  <span>Previous</span>
                  <h4>{prev.title}</h4>
                </Link>
              )}
              {next && (
                <Link href={`/journal/${next.slug}`} data-dir="next">
                  <span>Next</span>
                  <h4>{next.title}</h4>
                </Link>
              )}
            </div>
          </nav>
        )}
      </article>
    </>
  );
}
