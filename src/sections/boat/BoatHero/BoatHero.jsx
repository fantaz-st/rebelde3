import Image from "next/image";
import classes from "./BoatHero.module.css";
import { boatHero } from "@/settings/boatSections";

export default function BoatHero() {
  return (
    <section className={classes.wrap} aria-label="The Boat — Felix 37 Buenaventura">
      <div className={`container grid ${classes.grid}`}>

        <div className={classes.thumb}>
          <Image
            src={boatHero.hero}
            alt="Felix 37 Buenaventura — Rebelde Boats private speedboat on the Adriatic"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 45vw"
            className={classes.thumbImg}
          />
        </div>

        <div className={classes.text}>
          <h1 className={classes.title}>{boatHero.title}</h1>
          <p className={classes.desc}>{boatHero.desc}</p>
        </div>

      </div>

      <div className={classes.sub}>
        <p className={classes.subText}>{boatHero.sub}</p>
      </div>
    </section>
  );
}