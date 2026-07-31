import Image from "next/image";
import testimonials from "@/settings/testimonials";
import photos from "@/settings/reviews-photos";
import classes from "./ReviewsWall.module.css";

/**
 * Reviews wall — masonry grid of testimonial cards with photos scattered in.
 *
 * Uses CSS `columns` for masonry: cards flow naturally into 3 columns on
 * desktop, 2 on tablet, 1 on mobile. Photos are inserted at the positions
 * defined in settings/reviews-photos.js.
 *
 * Why CSS columns over grid masonry: CSS grid masonry is still experimental
 * in Chromium. Columns work everywhere and preserve reading order (which
 * matters for the schema markup — each card is a real review).
 */
export default function ReviewsWall() {
  // Build the interleaved list: testimonials + photos at their positions.
  // We keep a running index; when it matches a photo's position, we insert
  // the photo before continuing.
  const items = [];
  let quoteIdx = 0;

  const photoByPos = new Map(photos.map((p) => [p.position, p]));

  for (let i = 1; i <= testimonials.length + photos.length; i++) {
    if (photoByPos.has(i)) {
      items.push({ kind: "photo", data: photoByPos.get(i) });
    } else if (quoteIdx < testimonials.length) {
      items.push({ kind: "quote", data: testimonials[quoteIdx] });
      quoteIdx += 1;
    }
  }

  return (
    <section className={classes.wrap} aria-label="Guest testimonials">
      <div className={`container ${classes.container}`}>
        <ul className={classes.list}>
          {items.map((item, i) => {
            if (item.kind === "photo") {
              return (
                <li
                  key={item.data.id}
                  className={`${classes.item} ${classes.photoItem}`}
                >
                  <div className={classes.photoInner}>
                    <Image
                      src={item.data.src}
                      alt={item.data.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
                      quality={85}
                      className={classes.photoImg}
                    />
                  </div>
                </li>
              );
            }

            const t = item.data;
            return (
              <li
                key={t.id}
                className={`${classes.item} ${classes.quoteItem}`}
                itemScope
                itemType="https://schema.org/Review"
              >
                <article className={classes.card}>
                  <div className={classes.stars} aria-label="5 out of 5 stars">
                    <span aria-hidden="true">★★★★★</span>
                    <meta itemProp="reviewRating" content="5" />
                  </div>
                  {t.title && (
                    <h3 className={classes.cardTitle} itemProp="name">
                      {t.title}
                    </h3>
                  )}
                  <blockquote
                    className={classes.cardQuote}
                    itemProp="reviewBody"
                  >
                    {t.text}
                  </blockquote>
                  <footer className={classes.cardFooter}>
                    <span
                      className={classes.cardName}
                      itemProp="author"
                      itemScope
                      itemType="https://schema.org/Person"
                    >
                      <span itemProp="name">— {t.name}</span>
                    </span>
                    {t.tour && (
                      <span className={classes.cardTour}>{t.tour}</span>
                    )}
                  </footer>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
