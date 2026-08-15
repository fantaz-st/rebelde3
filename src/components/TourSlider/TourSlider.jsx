import tours, { getTour } from "@/settings/tours";
import { buildTourCard } from "@/lib/tourView";
import TourCard from "@/components/TourCard/TourCard";
import classes from "./TourSlider.module.css";

/**
 * The one way tours get listed anywhere on the site.
 *
 * Home, /tours and the "other days you might like" block on tour detail pages
 * all render this — same rail, same TourCard. Each call site passes its own
 * copy and picks a background tone; nothing else varies.
 *
 * The rail is a CSS scroll-snap container: native momentum, native keyboard
 * scrolling, no JS. Card widths come from the stylesheet, not a breakpoints
 * object.
 *
 * Props
 *   eyebrow, heading, lede  optional head copy (already translated)
 *   keys                    optional tour keys to show, in order (default: all)
 *   exclude                 tour key to leave out (used on detail pages)
 *   tone                    "cream" (default) | "plain" — section background
 *   align                   "center" (default) | "start" — head alignment
 *   pullUp                  home page only: the -130vh overlap onto the hero
 */
export default function TourSlider({
  eyebrow,
  heading,
  lede,
  keys,
  exclude,
  tone = "cream",
  align = "center",
  pullUp = false,
  headingId,
}) {
  const source = keys ? keys.map(getTour).filter(Boolean) : tours;
  const cards = source
    .filter((tour) => tour.key !== exclude)
    .map((tour) => buildTourCard(tour));

  if (cards.length === 0) return null;

  const wrapClass = [
    classes.wrap,
    classes[tone],
    pullUp && classes.pullUp,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={wrapClass} aria-labelledby={headingId}>
      <div className={`container grid ${classes.container}`}>
        {(eyebrow || heading || lede) && (
          <header className={`${classes.text} ${classes[align]}`}>
            {eyebrow && <p className={classes.eyebrow}>{eyebrow}</p>}
            {heading && (
              <h2 id={headingId} className={classes.title}>
                {heading}
              </h2>
            )}
            {lede && <p className={classes.desc}>{lede}</p>}
          </header>
        )}

        <ul
          className={classes.rail}
          // A scrollable region needs a name and keyboard focus to be usable
          // without a mouse — Swiper's a11y module used to do this for us.
          tabIndex={0}
          role="group"
          aria-label="Tours"
          style={{ "--card-count": Math.min(cards.length, 4) }}
        >
          {/* Mobile-only lead-in — hidden at desktop where all cards fit. */}
          <li className={classes.nullSlide} aria-hidden="true">
            <div className={classes.inner}>
              <p className={classes.swipeHint}>{"Swipe to explore →"}</p>
            </div>
          </li>

          {cards.map((tour) => (
            <li key={tour.key} className={classes.slide}>
              <TourCard tour={tour} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
