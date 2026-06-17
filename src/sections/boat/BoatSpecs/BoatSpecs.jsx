import classes from "./BoatSpecs.module.css";
import { boatSpecs } from "@/settings/boatSections";
import Button from "@/components/Button/Button";

export default function BoatSpecs() {
  return (
    <section className={classes.wrap} aria-labelledby="boat-specs-heading">
      <div className={`container grid ${classes.grid}`}>
        <div className={classes.left}>
          <h2 id="boat-specs-heading" className={classes.title}>
            Built for the<br />Adriatic.
          </h2>
          <p className={classes.desc}>
            Every specification chosen for one purpose — the best possible day on the water.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            Check Availability
          </Button>
        </div>

        <div className={classes.right}>
          <ul className={classes.list} aria-label="Boat technical specifications">
            {boatSpecs.map(({ label, value }) => (
              <li key={label} className={classes.row}>
                <span className={classes.rowLabel}>{label}</span>
                <span className={classes.rowValue}>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
