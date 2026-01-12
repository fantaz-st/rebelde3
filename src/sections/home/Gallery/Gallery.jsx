"use client";

import { useRef } from "react";
import items from "@/components/settings/gallery";
import classes from "./Gallery.module.css";

export default function Gallery() {
  const wrapRef = useRef(null);
  const stickRef = useRef(null);
  const stageRef = useRef(null);
  const startColRef = useRef(null);

  const startItemRefs = useRef([]);
  const endItemRefs = useRef([]);

  return (
    <div className={classes.wrap} ref={wrapRef}>
      <div className={classes.emptyTop} />

      <div className={classes.stick} ref={stickRef}>
        <div className={classes.stickInner}>
          <div className={classes.text}>
            <h3 className={classes.heading}>We craft experiences where the sea is a companion, not a destination.</h3>
            <h3 className={classes.heading}>Every journey is personal. Every wave, a new memory.</h3>
          </div>
        </div>
      </div>

      <section className={classes.gallery}>
        <div className={classes.stage} ref={stageRef}>
          <div className={classes.startCol} ref={startColRef}>
            {items.map((it, i) => (
              <div key={it.id} ref={(el) => (startItemRefs.current[i] = el)} className={`${classes.item} ${classes.startItem}`}>
                <div className={classes.itemInner}>
                  <img src={it.src} alt={it.alt || ""} className={classes.img} />
                </div>
              </div>
            ))}
          </div>

          <div className={classes.endCol}>
            <div className={classes.endList}>
              {items.map((it, i) => (
                <div key={`${it.id}-end`} ref={(el) => (endItemRefs.current[i] = el)} className={`${classes.item} ${classes.endItem}`}>
                  <div className={classes.itemInner}>
                    <img src={it.src} alt={it.alt || ""} className={classes.img} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={classes.emptyBottom} />
    </div>
  );
}
