// Image grid for the home Boat section (3×3 mosaic zoom animation).
// Each row maps to: top (above viewport), center (visible), bottom (below viewport).
// `position` uses absolute inset values to tile images across the full viewport.
// `type` controls which clip-path gets applied on scroll:
//   "main"  → the centrepiece image
//   "side"  → flanking images that also inset

const images = {
  top: [
    { src: "/images/boat/felix 37 drone shot 1.jpg", type: "side",  position: { top: 0, left: 0,    width: "33.333vw", height: "100svh" } },
    { src: "/images/boat/boat4.jpg",                 type: "side",  position: { top: 0, left: "33.333vw", width: "33.333vw", height: "100svh" } },
    { src: "/images/boat/felix 37 drone shot 3.jpg", type: "side",  position: { top: 0, left: "66.666vw", width: "33.333vw", height: "100svh" } },
  ],
  center: [
    { src: "/images/boat/boat7.jpg",                               type: "side",  position: { top: 0, left: 0,           width: "33.333vw", height: "100svh" } },
    { src: "/images/boat/felix 37 Rebelde boats.jpg",              type: "main",  position: { top: 0, left: "33.333vw",  width: "33.333vw", height: "100svh" } },
    { src: "/images/boat/boat5.jpg",                               type: "side",  position: { top: 0, left: "66.666vw",  width: "33.333vw", height: "100svh" } },
  ],
  bottom: [
    { src: "/images/boat/boat2.jpg",                 type: "side",  position: { top: 0, left: 0,           width: "33.333vw", height: "100svh" } },
    { src: "/images/boat/felix 37 buoy1.jpg",        type: "side",  position: { top: 0, left: "33.333vw",  width: "33.333vw", height: "100svh" } },
    { src: "/images/boat/boat1.jpg",                 type: "side",  position: { top: 0, left: "66.666vw",  width: "33.333vw", height: "100svh" } },
  ],
};

export default images;
