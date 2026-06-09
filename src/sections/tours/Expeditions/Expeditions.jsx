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

      {/* listRef wraps all the sections — overlay rail floats over it,
          mobile bottom bar uses it for visibility. --nav-count feeds the
          overlay pin-track height. */}
      <div
        className={classes.list}
        ref={listRef}
        style={{ position: "relative", "--nav-count": items.length }}
      >
        <SectionNav sections={sections} containerRef={listRef} overlay />

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
