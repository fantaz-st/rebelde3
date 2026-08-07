import { getTranslations } from "next-intl/server";
import Messages from "@/i18n/Messages";
import { pageMetadata } from "@/lib/schema";

import classes from "./page.module.css";
import Loader from "@/components/Loader/Loader";
import Hero from "@/sections/home/Hero/Hero";
import Gallery from "@/sections/home/Gallery/Gallery";
import Tours from "@/sections/home/Tours/Tours";
import Boat from "@/sections/home/Boat/Boat";
import Team from "@/sections/home/Team/Team";
import Testimonials from "@/sections/home/Testimonials/Testimonials";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return pageMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
  });
}

export default function Home() {
  return (
    <Messages route="home">
      <div className={classes.bodyInner}>
        <div className={classes.mainInner}>
          <div className={classes.mainContent} data-home>
            <Loader />
            <Hero />
            <Gallery />
            <Tours />
            <Boat />
            <Team />
            <Testimonials />
          </div>
        </div>
      </div>
    </Messages>
  );
}
