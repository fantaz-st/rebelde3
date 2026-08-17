export const TIME_SCALE = 1;

export const T = {
  columnsIn: 0, // odd columns rise a full viewport
  tilesIn: 1, // all five columns' tiles cascade, alternating direction
  zoom: 3, // the wall rushes forward, 1 -> 6
  copy: 5.5, // hero copy rises line by line
  handoff: 6.6, // the overlay fades and removes itself
  end: 7.2,
};

/** Real-world seconds until a given timeline beat. */
export const realSeconds = (t) => t / TIME_SCALE;
