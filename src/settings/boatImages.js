// 3×3 grid. Grid is 300vw × 300svh.
// Each cell is 100vw × 100svh.
// Rows: top=row1, center=row2, bottom=row3.
// left: 0 | 100vw | 200vw per column.

const images = {
  top: [
    { src: "/images/boat/felix 37 drone shot 1.jpg", type: "side", position: { left: 0 } },
    { src: "/images/boat/boat4.jpg",                 type: "side", position: { left: "100vw" } },
    { src: "/images/boat/felix 37 drone shot 3.jpg", type: "side", position: { left: "200vw" } },
  ],
  center: [
    { src: "/images/boat/boat7.jpg",                  type: "side", position: { left: 0 } },
    { src: "/images/boat/felix 37 Rebelde boats.jpg", type: "main", position: { left: "100vw" } },
    { src: "/images/boat/boat5.jpg",                  type: "side", position: { left: "200vw" } },
  ],
  bottom: [
    { src: "/images/boat/boat2.jpg",          type: "side", position: { left: 0 } },
    { src: "/images/boat/felix 37 buoy1.jpg", type: "side", position: { left: "100vw" } },
    { src: "/images/boat/boat1.jpg",          type: "side", position: { left: "200vw" } },
  ],
};

export default images;