import Faq from "@/components/Faq/Faq";
import faqs from "@/settings/faqs";

export const metadata = {
  title: "FAQ — Rebelde Boats",
  description:
    "Answers to common questions about Rebelde Boats private tours from Split — the boat, what's included, our routes, and booking.",
};


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
