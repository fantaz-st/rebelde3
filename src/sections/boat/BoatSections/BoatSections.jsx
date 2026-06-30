"use client";

import { useTranslations } from "next-intl";
import classes from "./BoatSections.module.css";
import BoatSectionItem from "./BoatSectionItem";
import BoatSpecs from "@/sections/boat/BoatSpecs/BoatSpecs";
import SectionNav from "@/components/SectionNav/SectionNav";
import boatSections from "@/settings/boatSections";

export default function BoatSections() {
  const t = useTranslations("boatSections.sectionNav");

  const sections = [
    { id: "the-boat",      label: t("theBoat") },
    { id: "comfort-deck",  label: t("comfortDeck") },
    { id: "specifications",label: t("specifications") },
  ];

  return (
    <div className={classes.wrap}>
      <div className={classes.list}>
        <SectionNav sections={sections} containerRef={null} variant="overlay" color="white" />
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
