"use client";

import { useRef } from "react";
import Image from "next/image";
import useRevealPinImages from "@/hooks/useRevealPinImages";
import useParallaxImage from "@/hooks/useParallaxImage";
import classes from "./HomeTeam.module.css";

export default function HomeTeam() {
  const wrapRef = useRef(null);

  const items = [
    {
      key: "t1",
      title: "A family affair",
      desc: "Indonesia is a place of deep family connection. And that extends from our owners to our crew. Together we share our passion for Indonesia with you every day, forging bonds so deep that our journey together always ends in the exchange of deep hugs and even goodbye tears. When you’re on board, you’re family.",
      img: "/images/team/image-1.jpg",
      aspect: "3/4",
    },
    {
      key: "t2",
      title: "An experienced crew",
      desc: "Safety is our number one priority. To ensure the highest standards, we hire the most experienced professionals in the business. Our captain has been working with our owners for nearly 30 years, our hospitality crew comes from well-known hotel brands, and our guides come from extensive guiding backgrounds and have every certification and license required.",
      img: "/images/team/image-3.jpg",
      aspect: "5/4",
    },
    {
      key: "t3",
      title: "Personalized itineraries for every sailing",
      desc: "While most other yachts have set itineraries, we’re completely flexible based on your interests and passions.\n\nAfter all, we’re on water, a place that knows no boundaries.",
      img: "/images/team/image-4.jpg",
      aspect: "3/4",
    },
  ];

  useParallaxImage(wrapRef);
  useRevealPinImages(wrapRef);

  return (
    <section ref={wrapRef} className={classes.homeTeam}>
      <div className={`container ${classes.inner}`}>
        {items.map((it, i) => {
          const flip = i % 2 === 1;

          return (
            <article key={it.key} data-team-block="1" className={`${classes.row} ${flip ? classes.flip : ""}`}>
              <div className={classes.text}>
                <div className={classes.textInner}>
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                </div>
              </div>

              <div className={classes.media}>
                <div className={classes.mediaFrame} style={{ aspectRatio: it.aspect }}>
                  <div data-team-media-inner="1" className={classes.mediaInner}>
                    <Image src={it.img} alt="" fill priority={i === 0} sizes="(max-width: 991px) 100vw, 50vw" className={classes.img} />
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        <div data-reveal-pin="1" className={classes.thumb}>
          <div data-reveal-pin-inner="1" className={classes.thumbInner}>
            <Image src="/images/team/team-main.jpg" alt="" fill sizes="100vw" className={classes.thumbImg} />
          </div>
        </div>
      </div>
    </section>
  );
}
