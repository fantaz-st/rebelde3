import { getTranslations } from "next-intl/server";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.boat" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function TheBoatLayout({ children }) {
  return (
    <>
      <Header variant="white" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
