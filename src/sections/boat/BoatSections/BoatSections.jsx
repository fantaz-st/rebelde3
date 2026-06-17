"use client";

import classes from "./BoatSections.module.css";
import BoatSectionItem from "./BoatSectionItem";
import SectionNav from "@/components/SectionNav/SectionNav";
import boatSections from "@/settings/boatSections";

export default function BoatSections() {
  const sections = boatSections.map((item) => ({ id: item.key, label: item.label }));

  return (
    <div className={classes.wrap}>
      <div className={classes.list}>
        <SectionNav sections={sections} containerRef={null} variant="overlay" />
        {boatSections.map((item, i) => (
          <BoatSectionItem
            key={item.key}
            item={item}
            index={i}
            isLast={i === boatSections.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
