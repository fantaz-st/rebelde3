import classes from "./BespokePillars.module.css";

const pillars = [
  {
    id: "one-charter",
    title: "One charter a day",
    body:
      "Buenaventura runs a single trip per day. No shared groups, no strangers on your boat.",
  },
  {
    id: "owner-run",
    title: "Owned and run by the same people",
    body:
      "My wife and I own the boat. When you email us, you're emailing the owners — not an agency or a call center.",
  },
  {
    id: "family-side",
    title: "The family side of things",
    body:
      "Our parents handle logistics on the ground — lunch reservations, restaurant bookings, transfer coordination — and set up the prosciutto and fruit platter waiting when you board.",
  },
  {
    id: "flex-routes",
    title: "Routes that flex",
    body:
      "Start with one of our four base itineraries or ask about something else entirely. Everything's flexible on the day.",
  },
  {
    id: "five-star",
    title: "Three years, all 5-star reviews",
    body:
      "We started in 2024 and haven't dropped below five stars on any platform yet. Every trip is built on the same principles.",
  },
];

export default function BespokePillars() {
  return (
    <section className={classes.wrap} aria-label="What makes a Rebelde day">
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <p className={classes.eyebrow}>What makes a Rebelde day</p>
          <h2 className={classes.heading}>
            The honest version of what &ldquo;private&rdquo; means around here
          </h2>
        </div>

        <div className={classes.intro}>
          <p>
            Most private boat tours in Split are booked through agencies, run
            on rotating fleets, and follow set routes. Ours don&apos;t. Buenaventura
            is our own boat. My wife and I own her, we run the operation
            ourselves, and every trip we sell is one we&apos;re personally
            responsible for.
          </p>
        </div>

        <ul className={classes.pillars}>
          {pillars.map((p) => (
            <li key={p.id} className={classes.pillar}>
              <h3 className={classes.pillarTitle}>{p.title}</h3>
              <p className={classes.pillarBody}>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
