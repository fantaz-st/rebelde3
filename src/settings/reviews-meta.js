/**
 * Review platform metadata.
 *
 * Central place to update review counts + URLs — refresh quarterly.
 * Also referenced by the reviews page hero (aggregate stats) and the
 * "leave a review" section.
 *
 * ★ TODO: update the counts, and swap the placeholder GetYourGuide URL
 * with your actual listing URL.
 */

export const reviewPlatforms = [
  {
    id: "tripadvisor",
    name: "Tripadvisor",
    logo: "/images/logos/tripadvisor.svg",
    logoAlt: "Tripadvisor logo",
    rating: 5.0,
    count: 90,
    url: "https://www.tripadvisor.com/Attraction_Review-g295370-d28042808-Reviews-Rebelde_boats_Private_Boat_Tours_from_Split-Split_Split_Dalmatia_County_Dalmatia.html",
    // Direct link people can use to leave a review (Tripadvisor's public URL
    // deep-links to the review form when the visitor is signed in)
    leaveUrl:
      "https://www.tripadvisor.com/UserReview-g295370-d28042808-Rebelde_boats_Private_Boat_Tours_from_Split-Split_Split_Dalmatia_County_Dalmatia.html",
  },
  {
    id: "google",
    name: "Google",
    logo: "/images/logos/google.svg",
    logoAlt: "Google logo",
    rating: 5.0,
    count: 137,
    url: "https://maps.app.goo.gl/Nxsof1ARrP7Stw9a9",
    // ★ TODO: swap with the direct "write a review" deep link from your
    // Google Business Profile. Look for it in your GBP dashboard under
    // "Get more reviews" — the short review link starts with g.page/r/...
    leaveUrl: "https://g.page/r/CXhQe_IxaeSoEBM/review",
  },
  {
    id: "getyourguide",
    name: "GetYourGuide",
    logo: "/images/logos/getyourguide.svg",
    logoAlt: "GetYourGuide logo",
    rating: 5.0,
    count: 31,
    // ★ TODO: replace with your actual GetYourGuide operator page URL
    url: "https://www.getyourguide.com/rebelde-doo-s631250/?visitor-id=GN1EB9SL2JUMN7CK45TZGCZXGV22W9WS&locale_autoredirect_optout=true",
    leaveUrl:
      "https://www.getyourguide.com/rebelde-doo-s631250/?visitor-id=GN1EB9SL2JUMN7CK45TZGCZXGV22W9WS&locale_autoredirect_optout=true",
  },
];

/**
 * Aggregate stats shown in the reviews hero.
 * Sum of platform counts (kept in one place so nothing drifts).
 */
export const totalReviews = reviewPlatforms.reduce((n, p) => n + p.count, 0);
export const averageRating = 5.0;
export const yearsOperating = 3;
