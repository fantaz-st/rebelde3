import classes from "./BespokeProcess.module.css";

const steps = [
  {
    n: "01",
    title: "Get in touch",
    body:
      "Send us a message with your dates, group size, and what you have in mind — even if it's just \"we want to see the Blue Cave\" or \"we've never been on a boat before, what do you recommend?\" We reply within a few hours during the season.",
  },
  {
    n: "02",
    title: "Shape the day",
    body:
      "We'll suggest a route, walk you through logistics, and help with the calls you can't easily make yourself — restaurant reservations, transfer arrangements, dietary requests. If you want to swap a stop or extend the day, we adjust.",
  },
  {
    n: "03",
    title: "Confirm and pay a deposit",
    body:
      "A €400 deposit secures the date. The rest is settled on the day. We handle the paperwork, insurance, and permits — you don't see any of it.",
  },
  {
    n: "04",
    title: "The day itself",
    body:
      "We meet at the pickup point, the crew walks you through the boat, and we go. Everything's already sorted. Your job is to enjoy it.",
  },
];

export default function BespokeProcess() {
  return (
    <section className={classes.wrap} aria-label="How it works">
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <p className={classes.eyebrow}>How it works</p>
          <h2 className={classes.heading}>Four steps, no surprises</h2>
        </div>

        <ol className={classes.steps}>
          {steps.map((s) => (
            <li key={s.n} className={classes.step}>
              <span className={classes.stepNumber} aria-hidden="true">{s.n}</span>
              <div className={classes.stepContent}>
                <h3 className={classes.stepTitle}>{s.title}</h3>
                <p className={classes.stepBody}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
