import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getAdjacentPosts } from "@/lib/journal";
import { breadcrumb, JsonLd, SITE_URL, BUSINESS_ID, ORG_ID } from "@/lib/schema";
import JournalPost from "@/components/JournalPost/JournalPost";

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
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: post.hero?.alt ?? post.title,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function JournalPostPage({ params }) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const canonical    = `${SITE_URL}${localePrefix}/journal/${slug}`;
  const heroFull     = post.hero?.src ? `${SITE_URL}${post.hero.src}` : undefined;

  // Article schema — unlocks featured-snippet eligibility.
  const articleJsonLd = {
    "@context":       "https://schema.org",
    "@type":          "Article",
    "@id":            `${canonical}#article`,
    headline:         post.title,
    description:      post.description,
    datePublished:    post.publishedAt,
    dateModified:     post.publishedAt,
    wordCount:        post.wordCount,
    inLanguage:       "en",
    author:           { "@id": ORG_ID },
    publisher:        { "@id": BUSINESS_ID },
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
      { name: "Journal",  url: "/journal" },
      { name: post.title, url: `/journal/${slug}` },
    ],
    locale,
  );

  return (
    <>
      <JsonLd data={articleJsonLd} id="article-jsonld" />
      <JsonLd data={crumbsJsonLd}  id="breadcrumb-jsonld" />

      <JournalPost post={post} prev={prev} next={next} />
    </>
  );
}
