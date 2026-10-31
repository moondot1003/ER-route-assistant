import { describe, expect, it } from 'vitest';
import { materialAvailabilityByRegion } from './materialAvailability';
import { regionLootSample } from './regionLootSample';

describe('material availability index', () => {
  it('uses 20 region IDs, container item IDs and separate field gathering rules', () => {
    expect(materialAvailabilityByRegion.size).toBe(20);
    for (const region of regionLootSample) {
      const available = materialAvailabilityByRegion.get(region.id)!;
      expect(available).toBeDefined();
      for (const entry of region.items) expect(available.has(entry.itemId)).toBe(true);
      expect(available.has('sample-field:돌멩이')).toBe(true);
      expect(available.has('sample-field:나뭇가지')).toBe(true);
    }
    expect(materialAvailabilityByRegion.get('pond')?.has('sample-field:꽃')).toBe(true);
    expect(materialAvailabilityByRegion.get('harbor')?.has('sample-field:꽃')).toBe(false);
  });
});
