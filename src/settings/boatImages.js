// 3×3 grid. Grid is 300vw × 300svh.
// Each cell is 100vw × 100svh.
// Rows: top=row1, center=row2, bottom=row3.
// left: 0 | 100vw | 200vw per column.

const images = {
  top: [
    { src: "/images/boat/boat-1.webp", type: "side", position: { left: 0 } },
    {
      src: "/images/boat/boat-2.webp",
      type: "side",
      position: { left: "100vw" },
    },
    {
      src: "/images/boat/boat-3.webp",
      type: "side",
      position: { left: "200vw" },
    },
  ],
  center: [
    { src: "/images/boat/boat-4.webp", type: "side", position: { left: 0 } },
    {
      src: "/images/boat/boat-5.webp",
      type: "main",
      position: { left: "100vw" },
    },
    {
      src: "/images/boat/boat-6.webp",
      type: "side",
      position: { left: "200vw" },
    },
  ],
  bottom: [
    { src: "/images/boat/boat-7.webp", type: "side", position: { left: 0 } },
    {
      src: "/images/boat/boat-8.webp",
      type: "side",
      position: { left: "100vw" },
    },
    {
      src: "/images/boat/boat-9.webp",
      type: "side",
      position: { left: "200vw" },
    },
  ],
};

export default images;
