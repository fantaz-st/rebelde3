import Link from "next/link";
import classes from "./BespokeCta.module.css";

export default function BespokeCta() {
  return (
    <section className={classes.wrap} aria-label="Get in touch">
      <div className={`container ${classes.container}`}>
        <div className={classes.inner}>
          <h2 className={classes.heading}>Tell us about your day</h2>
          <p className={classes.body}>
            There&apos;s no obligation, no upsell. Just a conversation about
            what would make your day on the water great — and honest advice on
            whether we&apos;re the right fit.
          </p>
          <Link href="/contact" className={classes.button}>
            <span>Start a conversation</span>
            <span aria-hidden="true" className={classes.buttonArrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
