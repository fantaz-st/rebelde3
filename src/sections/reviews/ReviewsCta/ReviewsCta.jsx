import Button from "@/components/Button/Button";
import classes from "./ReviewsCta.module.css";

/**
 * Final CTA at the bottom of the reviews page — bridge from "read reviews"
 * back to "book a tour". Links to /contact since booking flow is hidden.
 */
export default function ReviewsCta() {
  return (
    <section className={classes.wrap} aria-label="Book your tour">
      <div className={`container ${classes.container}`}>
        <div className={classes.inner}>
          <h2 className={classes.title}>
            Ready for your own day at sea?
          </h2>
          <p className={classes.desc}>
            Tell us what you have in mind — dates, group size, the kind of day
            you're after — and we'll shape a route that suits you.
          </p>
          <Button href="/contact" variant="blue" size="lg">
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  );
}
