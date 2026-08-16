/**
 * The hero photograph, shared by the Loader curtain and the Hero section.
 *
 * Both render the same file, but they used to request it differently: the Hero
 * through `next/image` (which rewrites the URL to /_next/image?…&w=640) and the
 * Loader through a plain <img> pointing at the raw file. Different URLs mean
 * two downloads on first paint — on mobile, a 640px-wide variant *and* the full
 * 1920x2400 original.
 *
 * The Loader needs a plain <img>: GSAP takes a ref to it and writes transforms
 * every frame. So instead of moving it onto next/image, it builds the exact
 * same srcset next/image would emit. Same candidates, same chosen URL, one
 * download that both elements share.
 *
 * If you change QUALITY or the widths here, they must stay in step with
 * `deviceSizes` and `qualities` in next.config.mjs, or the two requests
 * silently diverge again.
 */

export const HERO_SRC = "/images/hero/rebelde-boats-hero.webp";

/** Matches next/image's `quality` prop on the Hero. */
export const HERO_QUALITY = 85;

/** Both elements span the viewport, so the browser picks by viewport width. */
export const HERO_SIZES = "100vw";

/** Mirrors `images.deviceSizes` in next.config.mjs. */
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048];

const variant = (width) =>
  `/_next/image?url=${encodeURIComponent(HERO_SRC)}&w=${width}&q=${HERO_QUALITY}`;

/** The srcset next/image generates for a `sizes="100vw"` image. */
export const HERO_SRCSET = DEVICE_SIZES.map((w) => `${variant(w)} ${w}w`).join(", ");

/** Largest variant — the `src` fallback for browsers ignoring srcset. */
export const HERO_FALLBACK = variant(DEVICE_SIZES[DEVICE_SIZES.length - 1]);
