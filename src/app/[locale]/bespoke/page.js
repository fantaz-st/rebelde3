import classes from "./page.module.css";
export default function Bespoke() {
  return (
    <div className={classes.page}>
      <section className={classes.wrap} aria-label="The Rebelde way">
        <div className={`container grid ${classes.container}`}>
          <div className={classes.inner}>
            <p className={classes.kicker}>The Rebelde way</p>
            <h1 className={classes.title}>
              Every trip starts with a conversation
            </h1>
            <p className={classes.subtitle}>
              We run one boat, one charter at a time. Each day gets shaped
              around what you actually want, and we handle the rest — the route,
              the paperwork, and the lunch. This is how it works.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
