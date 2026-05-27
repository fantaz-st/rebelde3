"use client";

import classes from "./Expeditions.module.css";
import ExpeditionItem from "./ExpeditionItem";
import items from "@/settings/tours";

export default function Expeditions() {
  return (
    <div className={classes.wrap}>
      <div className={classes.emptyTop} aria-hidden="true" />

      <div className={classes.list}>
        {items.map((item, i) => (
          <ExpeditionItem key={item.key} item={item} index={i} isLast={i === items.length - 1} enableMobileReveal={true} />
        ))}
      </div>
    </div>
  );
}
