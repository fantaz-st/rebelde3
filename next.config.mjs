import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Legacy URLs, 301'd.
 *
 * The first five are from the previous site — Search Console still lists them
 * as 404s, and Google recrawled /our-tours/three-islands-tour on 5 August, so
 * they're still being followed from somewhere.
 *
 * The last one is from this change: /bespoke-tours became /tours/bespoke-tour
 * when the bespoke charter turned into the fifth tour.
 *
 * `permanent: true` emits a 308, which browsers and Google treat as a 301 and
 * which passes ranking signal to the destination.
 */
const legacyRedirects = [
  { source: "/home", destination: "/" },
  { source: "/our-boat", destination: "/the-boat" },
  { source: "/our-tours", destination: "/tours" },
  {
    source: "/our-tours/three-islands-tour",
    destination: "/tours/blue-lagoon-three-islands",
  },
  { source: "/bespoke-tours", destination: "/tours/bespoke-tour" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [40, 75, 85, 100],
  },
  compress: true,

  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default withNextIntl(nextConfig);
