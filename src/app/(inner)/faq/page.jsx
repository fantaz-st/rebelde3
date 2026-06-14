import Faq from "@/components/Faq/Faq";
import faqs from "@/settings/faqs";

function buildFaqJsonLd() {
  const mainEntity = faqs.flatMap((section) =>
    section.qa.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

export default function FaqPage() {
  const jsonLd = buildFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Faq />
    </>
  );
}
