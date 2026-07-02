"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function AnimatedText({
  children,
  animateOnScroll = true,
  delay = 0,
  className = "",
}) {
  const containerRef = useRef(null);
  const splitRef     = useRef(null);
  const stRef        = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Revert any previous split
      splitRef.current?.revert();

      const split = SplitText.create(containerRef.current, {
        tag:           "span",
        type:          "lines",
        mask:          "lines",
        linesClass:    "split-line",
        lineThreshold: 0.1,
        aria:          "none",
      });
      splitRef.current = split;

      gsap.set(containerRef.current, { autoAlpha: 1 });
      gsap.set(split.lines, { y: "100%" });

      const animProps = {
        y:        "0%",
        duration: 1,
        stagger:  0.1,
        ease:     "power4.out",
        delay,
      };

      if (animateOnScroll) {
        // Store the ScrollTrigger so we can kill only this one on cleanup
        stRef.current = ScrollTrigger.create({
          trigger: containerRef.current,
          start:   "top 75%",
          once:    true,
          onEnter: () => gsap.to(split.lines, animProps),
        });
      } else {
        gsap.to(split.lines, animProps);
      }

      return () => {
        stRef.current?.kill();
        splitRef.current?.revert();
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] },
  );

  const safe = React.Children.toArray(children);

  if (safe.length === 1 && React.isValidElement(safe[0])) {
    const child = safe[0];
    const text  = React.Children.toArray(child.props.children)
      .map((c) => (typeof c === "string" ? c : ""))
      .join("");

    return React.cloneElement(child, {
      ref:          containerRef,
      className:    `${child.props.className || ""} ${className} animated`.trim(),
      role:         "group",
      "aria-label": text,
    });
  }

  const aggregatedText = safe
    .map((c) => (typeof c === "string" ? c : ""))
    .join("");

  return (
    <div
      ref={containerRef}
      className={className}
      role="group"
      aria-label={aggregatedText}
    >
      {children}
    </div>
  );
}
