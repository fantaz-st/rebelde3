import { getTranslations } from "next-intl/server";
import { getFeaturedAndOther } from "@/lib/journal";
import { breadcrumb, JsonLd, SITE_URL } from "@/lib/schema";
import JournalHero from "@/components/JournalHero/JournalHero";
import JournalFeatured from "@/components/JournalFeatured/JournalFeatured";
import JournalGrid from "@/components/JournalGrid/JournalGrid";

export default async function JournalIndexPage({ params }) {
  const { locale } = await params;
  const { featured, other } = getFeaturedAndOther();

  // Translation keys we lean on. Fallbacks are safe defaults in case the
  // messages file hasn't been updated yet.
  const tMeta = await getTranslations({ locale, namespace: "metadata.journal" });
  const heroTitle = "Journal";
  const heroDesc  = tMeta("description");
  const readMoreLabel = "Read the story";

  const crumbsJsonLd = breadcrumb([{ name: "Journal", url: "/journal" }], locale);

  const blogJsonLd = {
    "@context":  "https://schema.org",
    "@type":     "Blog",
    "@id":       `${SITE_URL}/journal#blog`,
    name:        heroTitle,
    description: heroDesc,
    url:         `${SITE_URL}/journal`,
    inLanguage:  "en",
    blogPost: [featured, ...other].filter(Boolean).map((p) => ({
      "@type":       "BlogPosting",
      headline:      p.title,
      description:   p.description,
      datePublished: p.publishedAt,
      url:           `${SITE_URL}/journal/${p.slug}`,
      image:         p.hero?.src ? `${SITE_URL}${p.hero.src}` : undefined,
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd}   id="blog-jsonld" />
      <JsonLd data={crumbsJsonLd} id="breadcrumb-jsonld" />

      <JournalHero title={heroTitle} description={heroDesc} />
      <JournalFeatured post={featured} readMoreLabel={readMoreLabel} />
      <JournalGrid posts={other} />
    </>
  );
}
