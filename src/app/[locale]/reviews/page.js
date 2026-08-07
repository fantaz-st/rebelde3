import { getTranslations } from "next-intl/server";
import Messages from "@/i18n/Messages";
import { breadcrumb, JsonLd, reviewPage, pageMetadata } from "@/lib/schema";
import { totalReviews, averageRating } from "@/settings/reviews-meta";

import ReviewsHero from "@/sections/reviews/ReviewsHero/ReviewsHero";
import ReviewsWall from "@/sections/reviews/ReviewsWall/ReviewsWall";
import ReviewsLeave from "@/sections/reviews/ReviewsLeave/ReviewsLeave";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.reviews" });
  return pageMetadata({
    locale,
    path: "/reviews",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ReviewsPage({ params }) {
  const { locale } = await params;
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <Messages route="reviews">
      <JsonLd
        data={reviewPage({ locale, totalReviews, averageRating })}
        id="reviewpage-jsonld"
      />
      <JsonLd
        data={breadcrumb(
          [{ name: tFooter("reviewsLink"), url: "/reviews" }],
          locale,
          tNav("home"),
        )}
        id="breadcrumb-jsonld"
      />

      <ReviewsHero />
      <ReviewsWall />
      <ReviewsLeave />
    </Messages>
  );
}
