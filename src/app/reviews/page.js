import { breadcrumb, JsonLd, reviewPage, pageMetadata } from "@/lib/schema";
import { totalReviews, averageRating } from "@/settings/reviews-meta";

import ReviewsHero from "@/sections/reviews/ReviewsHero/ReviewsHero";
import ReviewsWall from "@/sections/reviews/ReviewsWall/ReviewsWall";
import ReviewsLeave from "@/sections/reviews/ReviewsLeave/ReviewsLeave";

export async function generateMetadata() {
  return pageMetadata({
    path: "/reviews",
    title: "Reviews — What Guests Say About Our Private Boat Tours",
    description: "Read guest reviews of Rebelde Boats private boat tours from Split, Croatia — 220+ 5-star reviews collected across TripAdvisor, Google, and GetYourGuide.",
  });
}

export default async function ReviewsPage({ params }) {

  return (
    <>
      <JsonLd
        data={reviewPage({ totalReviews, averageRating })}
        id="reviewpage-jsonld"
      />
      <JsonLd
        data={breadcrumb(
          [{ name: "Reviews", url: "/reviews" }],
          "Home",
        )}
        id="breadcrumb-jsonld"
      />

      <ReviewsHero />
      <ReviewsWall />
      <ReviewsLeave />
    </>
  );
}
