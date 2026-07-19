// Mirrors original Kudanil template team section exactly.
// Item 1 = 2 images + text (text in middle, image top-right, image bottom-left "have-margin")
// Item 2 = 1 image + text (image LEFT big, text top-right)
// Item 3 = 1 image + text (image RIGHT big, text bottom-left)
//
// Reuses the 4 team images we already have; where the template used a 2nd image,
// we alternate through the pool so nothing repeats twice in a row.

const items = [
  {
    key: "t1",
    // 2 images — first image top-right, text center-left, second image bottom-left with margin
    layout: "double",
    title: "A family affair",
    desc: [
      "Croatia is a place of deep family connection — and that extends from the owners to the crew.",
      "Together we share our passion for the Adriatic with you every day, forging bonds so deep that our journey often ends in the exchange of long hugs and even goodbye tears. When you're on board Rebelde, you're family.",
    ],
    img:  "/images/team/image-1.jpg",
    alt:  "The Rebelde Boats family crew welcoming guests aboard in Split harbour",
    img2: "/images/team/team-1.jpg",
    alt2: "Rebelde crew and guests sharing a moment on deck between islands",
  },
  {
    key: "t2",
    // 1 image LEFT (bigger), text TOP-RIGHT
    layout: "left",
    title: "An experienced crew",
    desc: [
      "Safety is our number one priority. To ensure the highest standards, we work only with the most experienced professionals on this coast.",
      "Our captain has been navigating the Croatian islands for over two decades, our hospitality crew comes from well-known hotel brands, and our guides carry every certification and licence required. Local knowledge, professional standards — nothing left to chance.",
    ],
    img: "/images/team/image-3.jpg",
    alt: "Rebelde Boats skipper at the helm navigating the Adriatic between Hvar and Vis",
  },
  {
    key: "t3",
    // 1 image RIGHT (bigger), text BOTTOM-LEFT
    layout: "right",
    title: "Personalised itineraries for every sailing",
    desc: [
      "While most other yachts have set itineraries, we're completely flexible based on your interests and passions. We always know the well-known destinations — but we let the weather, the sea, and how you're feeling drive changes as we go.",
      "After all, we're on the Adriatic, a place that knows no boundaries. That means we can slip into a bay only a handful of boats have found, snorkel through a cave with the light cutting sideways through the water, and sip sunset drinks anchored off an island most tourists have never heard of.",
    ],
    img: "/images/team/image-4.jpeg",
    alt: "Rebelde guests on a personalised private tour along the Dalmatian coast at sunset",
  },
];

// Final full-viewport thumb — same role as .home-team-thumb in template.
// Reuses image-1 so it renders without any new assets; swap for a wide crew shot later.
export const thumb = {
  img: "/images/team/team-thumb.jpg",
  alt: "Rebelde Boats crew and guests on deck during a private Adriatic charter from Split",
};

export default items;
