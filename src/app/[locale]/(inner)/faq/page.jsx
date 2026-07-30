import Faq from "@/components/Faq/Faq";
import faqs from "@/settings/faqs";
import { breadcrumb, JsonLd } from "@/lib/schema";

function buildFaqJsonLd() {
  const mainEntity = faqs.flatMap((section) =>
    section.qa.map((item) => ({
      "@type": "Question",
      name:    item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text:    item.answer,
      },
    })),
  );

  return {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity,
  };
}

export default async function FaqPage({ params }) {
  const { locale } = await params;
  const faqJsonLd    = buildFaqJsonLd();
  const crumbsJsonLd = breadcrumb([{ name: "FAQ", url: "/faq" }], locale);

  return (
    <>
      <JsonLd data={faqJsonLd}    id="faq-jsonld" />
      <JsonLd data={crumbsJsonLd} id="breadcrumb-jsonld" />
      <Faq />
    </>
  );
}
