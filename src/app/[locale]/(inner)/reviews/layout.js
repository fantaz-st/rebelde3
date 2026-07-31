import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getTranslations } from "next-intl/server";
import { SITE_URL, SITE_NAME } from "@/lib/schema";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.reviews" });
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}${localePrefix}/reviews`,
    },
    openGraph: {
      url: `${SITE_URL}${localePrefix}/reviews`,
      title: t("title"),
      description: t("description"),
      images: [{
        url: `${SITE_URL}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — private boat tours from Split, Croatia`,
      }],
    },
  };
}

export default function ReviewsLayout({ children }) {
  return (
    <>
      <Header variant="blue" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
