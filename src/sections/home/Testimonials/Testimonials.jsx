import TestimonialCard from "@/components/TestimonialCard/TestimonialCard";
import classes from "./Testimonials.module.css";
import items from "@/settings/testimonials";
import Button from "@/components/Button/Button";

export default function Testimonials() {

  return (
    <section className={classes.wrap} aria-labelledby="tours-heading">
      <div className={`grid ${classes.container}`}>
        <header className={classes.text}>
          <h2 id="tours-heading" className={classes.title}>
            {"Two Hundred Days, Two Hundred Stories"}
          </h2>
          <div className={classes.platforms}>
            <div className={classes.platform}>
              <span className={classes.platformText}>{"Rated 5.0 on"}</span>
              <img src="/images/logos/tripadvisor.svg" alt="Tripadvisor logo" />
            </div>
            <div className={classes.platform}>
              <span className={classes.platformText}>{"Rated 5.0 on"}</span>
              <img src="/images/logos/google.svg" alt="Google logo" />
            </div>
          </div>
        </header>

        {/* Scroll-snap rail. The scrollbar is the browser's own, styled to
            match — dragging it is native behaviour, not a Swiper module. */}
        <ul
          className={classes.rail}
          // No explicit role: it would override the <ul>'s implicit
          // role="list" and orphan the <li> children in the a11y tree.
          tabIndex={0}
          aria-label="Guest reviews"
        >
          <li className={classes.nullSlide} aria-hidden="true">
            <div className={classes.inner}>
              <p className={classes.swipeHint}>Swipe to read reviews →</p>
            </div>
          </li>

          {items.map((test) => (
            <li key={test.id} className={classes.slide}>
              <TestimonialCard
                title={test.title}
                text={test.text}
                name={test.name}
                tour={test.tour}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.ctaInner}>
        <Button
          href="https://www.tripadvisor.com/Attraction_Review-g295370-d28042808-Reviews-Rebelde_boats_Private_Boat_Tours_from_Split-Split_Split_Dalmatia_County_Dalmatia.html"
          variant="primary"
          size="lg"
        >
          Read all reviews
        </Button>
      </div>
    </section>
  );
}
