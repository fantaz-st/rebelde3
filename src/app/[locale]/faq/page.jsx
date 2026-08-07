import { getTranslations } from "next-intl/server";
import Messages from "@/i18n/Messages";
import Faq from "@/components/Faq/Faq";
import { allFaqIds } from "@/settings/faqs";
import { breadcrumb, JsonLd, faqPage, pageMetadata } from "@/lib/schema";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.faq" });
  return pageMetadata({
    locale,
    path: "/faq",
    title: t("title"),
    description: t("description"),
  });
}

export default async function FaqPage({ params }) {
  const { locale } = await params;
  // Built from translations, not settings — /de/faq now emits German
  // questions instead of English ones under a German canonical.
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <Messages route="faq">
      <JsonLd data={faqPage(allFaqIds, tFaq)} id="faq-jsonld" />
      <JsonLd
        data={breadcrumb([{ name: tNav("faq"), url: "/faq" }], locale, tNav("home"))}
        id="breadcrumb-jsonld"
      />
      <Faq />
    </Messages>
  );
}
