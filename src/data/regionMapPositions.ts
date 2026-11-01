import { regionLootSample } from './regionLootSample';

/** Visually estimated centers on public/maps/lumia-island.png (772 × 981).
 * Compared with references/lumia-island-eng.png; these are UI marker positions,
 * not official map coordinates or verified travel points.
 */
export const regionMapPositions: Record<string, { xPercent: number; yPercent: number }> = {
  'gas-station': { xPercent: 34, yPercent: 12 },
  alley: { xPercent: 55, yPercent: 12 },
  temple: { xPercent: 82, yPercent: 23 },
  'archery-range': { xPercent: 18, yPercent: 24 },
  'police-station': { xPercent: 62, yPercent: 24 },
  school: { xPercent: 30, yPercent: 32 },
  'fire-station': { xPercent: 51, yPercent: 33 },
  stream: { xPercent: 83, yPercent: 36 },
  hotel: { xPercent: 16, yPercent: 42 },
  pond: { xPercent: 65, yPercent: 43 },
  hospital: { xPercent: 91, yPercent: 50 },
  beach: { xPercent: 13, yPercent: 55 },
  forest: { xPercent: 33, yPercent: 56 },
  cemetery: { xPercent: 68, yPercent: 56 },
  uptown: { xPercent: 24, yPercent: 68 },
  chapel: { xPercent: 53, yPercent: 67 },
  factory: { xPercent: 84, yPercent: 73 },
  warehouse: { xPercent: 34, yPercent: 76 },
  harbor: { xPercent: 52, yPercent: 84 },
  barge: { xPercent: 70, yPercent: 90 },
};

export const mapRegions = regionLootSample.map((region) => {
  const position = regionMapPositions[region.id];
  if (!position) throw new Error(`지도 좌표가 없는 지역: ${region.name}`);
  return { id: region.id, name: region.name, ...position };
});
