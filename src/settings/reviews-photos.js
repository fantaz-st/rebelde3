/**
 * Photos scattered into the reviews wall between quote cards.
 *
 * `position` = which grid slot this photo occupies (numbered from 1).
 * With 15 testimonials, we insert 3 photos at positions 4, 9, and 13
 * so they break up the reading rhythm.
 *
 * ★ TODO: swap these with real photos from your gallery. Any aspect ratio
 * is fine — the wall enforces its own aspect via CSS.
 */

const photos = [
  {
    id: "reviews-photo-1",
    src: "/images/reviews/review-1.jpg",
    alt: "Rebelde Boats guests jumping into a hidden Adriatic cove",
    position: 4,
  },
  {
    id: "reviews-photo-2",
    src: "/images/reviews/review-2.jpg",
    alt: "The Felix 37 Buenaventura cruising past a Dalmatian island at golden hour",
    position: 9,
  },
  {
    id: "reviews-photo-3",
    src: "/images/reviews/review-3.jpg",
    alt: "Rebelde Boats guests enjoying lunch aboard on a full-day tour",
    position: 13,
  },
];

export default photos;
