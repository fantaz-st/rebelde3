"use client";

import SectionNav from "@/components/SectionNav/SectionNav";
import SectionItem from "./SectionItem";
import classes from "./SectionList.module.css";

/**
 * Renders a SectionNav overlay + a list of SectionItem components.
 *
 * Props:
 *  items      — normalised SectionItem data array
 *  navSections — { id, label }[] for the SectionNav
 *  ctaLabel   — button label passed to every SectionItem
 *  footer     — optional node rendered after all items (e.g. BoatSpecs)
 */
export default function SectionList({ items, navSections, ctaLabel, footer }) {
  return (
    <div className={classes.wrap}>
      <div className={classes.list}>
        <SectionNav sections={navSections} variant="overlay" color="blue" />

        {items.map((item, i) => (
          <SectionItem
            key={item.key}
            item={item}
            index={i}
            isLast={i === items.length - 1 && !footer}
            ctaLabel={ctaLabel}
          />
        ))}

        {footer && (
          <div className={classes.footer}>{footer}</div>
        )}
      </div>
    </div>
  );
}
