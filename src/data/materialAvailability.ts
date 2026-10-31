import type { MaterialAvailability } from '../domain/materialPlan';
import { fieldGatheringRules } from './fieldGatheringRules';
import { regionLootSample } from './regionLootSample';

/** Membership only: the source's region-wide quantities are intentionally ignored. */
export const materialAvailabilityByRegion: MaterialAvailability = (() => {
  const byRegion = new Map(regionLootSample.map((region) => [
    region.id,
    new Set(region.items.map((item) => item.itemId)),
  ]));
  for (const rule of fieldGatheringRules) {
    for (const regionId of rule.availableRegionIds) {
      const materials = byRegion.get(regionId);
      if (!materials) throw new Error(`채집 규칙의 지역 ID가 없습니다: ${regionId}`);
      materials.add(rule.materialId);
    }
  }
  return byRegion;
})();
