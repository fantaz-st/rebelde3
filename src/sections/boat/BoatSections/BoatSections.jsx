"use client";

import classes from "./BoatSections.module.css";
import BoatSectionItem from "./BoatSectionItem";
import BoatSpecs from "@/sections/boat/BoatSpecs/BoatSpecs";
import SectionNav from "@/components/SectionNav/SectionNav";
import boatSections from "@/settings/boatSections";

const SPECS_NAV = { id: "specifications", label: "Specifications" };

export default function BoatSections() {
  const sections = [
    ...boatSections.map((item) => ({ id: item.key, label: item.label })),
    SPECS_NAV,
  ];

  return (
    <div className={classes.wrap}>
      <div className={classes.list}>
        <SectionNav sections={sections} containerRef={null} variant="overlay" />
        {boatSections.map((item, i) => (
          <BoatSectionItem
            key={item.key}
            item={item}
            index={i}
            isLast={false}
          />
        ))}
        <div id="specifications">
          <BoatSpecs />
        </div>
      </div>
    </div>
  );
}