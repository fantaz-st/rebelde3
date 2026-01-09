"use client";

import { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    ScrollTrigger.normalizeScroll(true); // enable
    const update = () => ScrollTrigger.update();
    ScrollTrigger.addEventListener("refresh", update);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", update);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        smoothTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
