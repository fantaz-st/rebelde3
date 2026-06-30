"use client";

import { useRef } from "react";
import classes from "./Expeditions.module.css";
import ExpeditionItem from "./ExpeditionItem";
import SectionNav from "@/components/SectionNav/SectionNav";
import items from "@/settings/tours";

export default function Expeditions() {
  const listRef = useRef(null);

  const sections = items.map((item) => ({ id: item.key, label: item.label }));

  return (
    <div className={classes.wrap}>
      <div className={classes.emptyTop} aria-hidden="true" />

      <div className={classes.list} ref={listRef}>
        <SectionNav
          sections={sections}
          containerRef={null}
          variant="overlay" color="white"
        />

        {items.map((item, i) => (
          <ExpeditionItem
            key={item.key}
            item={item}
            index={i}
            isLast={i === items.length - 1}
            enableMobileReveal={true}
          />
        ))}
      </div>
    </div>
  );
}
