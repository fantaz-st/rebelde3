"use client";

import { useTranslations } from "next-intl";
import SectionList from "@/components/SectionList/SectionList";
import BoatSpecs from "@/sections/boat/BoatSpecs/BoatSpecs";
import rawItems from "@/settings/boatSections";

export default function BoatSections() {
  const t  = useTranslations("boatSectionItems");
  const tn = useTranslations("boatSections");

  // Normalise boatSections.js shape → SectionItem shape
  const items = rawItems.map((it) => ({
    key:      it.key,
    hero:     it.heroImg,
    label:    t(`${it.key}.label`),
    intro:    t(`${it.key}.intro`),
    subText:  t(`${it.key}.subText`),
    imgLarge: it.imgLarge,
    imgSmall: it.imgSmall,
    ctaImg:   it.ctaImg,
    ctaText:  t(`${it.key}.ctaText`),
    gallery:  it.gallery,
  }));

  const navSections = [
    { id: "the-boat",       label: tn("sectionNav.theBoat") },
    { id: "comfort-deck",   label: tn("sectionNav.comfortDeck") },
    { id: "specifications", label: tn("sectionNav.specifications") },
  ];

  return (
    <SectionList
      items={items}
      navSections={navSections}
      ctaLabel={tn("checkAvailability")}
      footer={
        <div id="specifications">
          <BoatSpecs />
        </div>
      }
    />
  );
}
