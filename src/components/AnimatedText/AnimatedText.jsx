"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function AnimatedText({ children, animateOnScroll = true, delay = 0, className = "" }) {
  const containerRef = useRef(null);
  const splitRefs = useRef([]);
  const lines = useRef([]);

  useGSAP(
    () => {
      if (typeof window === "undefined" || !containerRef.current) return;

      // revert any previous splits
      splitRefs.current.forEach((s) => s.revert());
      splitRefs.current = [];
      lines.current = [];

      // create new split (no ARIA injection)
      const split = SplitText.create(containerRef.current, {
        tag: "span",
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        lineThreshold: 0.1,
        aria: "none",
      });
      splitRefs.current.push(split);
      lines.current.push(...split.lines);

      // start state
      gsap.set(containerRef.current, {
        autoAlpha: 1,
      });
      gsap.set(lines.current, { y: "100%" });

      const animationProps = {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
      };

      if (animateOnScroll) {
        gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        });
      } else {
        gsap.to(lines.current, animationProps);
      }

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        splitRefs.current.forEach((s) => s.revert());
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] },
  );

  // handle a single element child
  const safe = React.Children.toArray(children);
  if (safe.length === 1 && React.isValidElement(safe[0])) {
    const child = safe[0];
    // flatten text for aria-label
    const text = React.Children.toArray(child.props.children)
      .map((c) => (typeof c === "string" ? c : ""))
      .join("");

    return React.cloneElement(child, {
      ref: containerRef,
      className: `${child.props.className || ""} ${className} animated`.trim(),
      role: "group",
      "aria-label": text,
      "aria-hidden": "true",
    });
  }

  // fallback wrapper for multiple children
  const aggregatedText = safe.map((c) => (typeof c === "string" ? c : "")).join("");

  return (
    <div ref={containerRef} className={className} role="group" aria-label={aggregatedText} aria-hidden="true" s>
      {children}
    </div>
  );
}
