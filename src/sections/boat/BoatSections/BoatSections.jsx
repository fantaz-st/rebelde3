"use client";

import SectionList from "@/components/SectionList/SectionList";
import BoatSpecs from "@/sections/boat/BoatSpecs/BoatSpecs";
import rawItems from "@/settings/boatSections";

export default function BoatSections() {
  // Normalise boatSections.js shape → SectionItem shape
  const items = rawItems.map((it) => ({
    key:      it.key,
    hero:     it.heroImg,
    label:    it.label,
    intro:    it.intro,
    subText:  it.subText,
    imgLarge: it.imgLarge,
    imgSmall: it.imgSmall,
    ctaImg:   it.ctaImg,
    ctaText:  it.ctaText,
    gallery:  it.gallery,
  }));

  const navSections = [
    { id: "the-boat",       label: "The Boat" },
    { id: "comfort-deck",   label: "Comfort & Deck" },
    { id: "specifications", label: "Specifications" },
  ];

  return (
    <SectionList
      items={items}
      navSections={navSections}
      ctaLabel={"Check Availability"}
      footer={
        <div id="specifications">
          <BoatSpecs />
        </div>
      }
    />
  );
}
