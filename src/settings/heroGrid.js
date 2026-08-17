const dir = "/images/hero";

export const heroGrid = [
  `${dir}/image1.webp`,
  `${dir}/image2.webp`,
  `${dir}/image3.webp`,
  `${dir}/image4.webp`,
  `${dir}/image5.webp`,
  `${dir}/image6.webp`,
  `${dir}/image7.webp`,
  `${dir}/image8.webp`,
  `${dir}/image9.webp`,
  `${dir}/image10.webp`,
  `${dir}/image11.webp`,
  `${dir}/image12.webp`,
  `${dir}/image13.webp`,
  `${dir}/image14.webp`,
  `${dir}/image15.webp`,
];

/** Centre tile of the centre column — index 12 is image13. */
export const HERO_INDEX = 12;

/** Column c (0-4), row r (0-4) -> image. Columns 4 and 5 reuse 1 and 2. */
export const tileFor = (c, r) => heroGrid[((c % 3) * 5 + r) % heroGrid.length];

export default heroGrid;
