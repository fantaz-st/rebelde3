import Link from "next/link";
import Image from "next/image";
import tours from "@/settings/tours";

/**
 * Bespoke Tours index — 4 cards linking to detail pages at /tours/[slug].
 * Replaces the old anchor-scroll layout that showed all 4 tours on one page.
 *
 * Phase A ships this unstyled (structural only). Phase B styles it.
 */
export default function ToursGrid() {
  return (
    <section data-section="tours-grid" aria-label="Our tours">
      <ul data-el="grid">
        {tours.map((tour) => (
          <li key={tour.key} data-el="card">
            <Link href={`/tours/${tour.key}`}>
              <div data-el="thumb">
                <Image
                  src={tour.thumb}
                  alt={tour.thumbAlt || tour.label}
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                  quality={85}
                />
              </div>
              <div data-el="content">
                <p data-el="kicker">{tour.kicker}</p>
                <h2 data-el="title">{tour.label}</h2>
                <p data-el="intro">{tour.intro}</p>
                <p data-el="meta">
                  {tour.durationLabel} · {tour.priceLabel}
                </p>
                <span data-el="cta">Read more →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
