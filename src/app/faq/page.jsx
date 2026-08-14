import Faq from "@/components/Faq/Faq";
import { allFaqs } from "@/settings/faqs";
import { breadcrumb, JsonLd, faqPage, pageMetadata } from "@/lib/schema";

export async function generateMetadata() {
  return pageMetadata({
    path: "/faq",
    title: "FAQ – Common Questions",
    description: "Answers to common questions about our private boat tours from Split, Croatia.",
  });
}

export default async function FaqPage({ params }) {

  return (
    <>
      <JsonLd data={faqPage(allFaqs)} id="faq-jsonld" />
      <JsonLd
        data={breadcrumb([{ name: "FAQ-s", url: "/faq" }], "Home")}
        id="breadcrumb-jsonld"
      />
      <Faq />
    </>
  );
}
