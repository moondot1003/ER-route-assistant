import { describe, expect, it } from 'vitest';
import { emptyEpicEquipmentSelection } from '../domain/equipmentSelection';
import { recommendRoutes } from '../domain/routeRecommendations';
import { acquisitionForBasicMaterial, calculateSelectedEquipmentMaterials } from './craftingRequirements';
import { materialAvailabilityByRegion } from './materialAvailability';
import { regionLootSample } from './regionLootSample';

describe('integrated route suggestions', () => {
  it('uses the selected single Epic item and updates recommendations for a changed weapon', () => {
    const glove = { ...emptyEpicEquipmentSelection(), weapon: 'wiki:glove:소수' };
    const bow = { ...emptyEpicEquipmentSelection(), weapon: 'wiki:bow:트윈보우' };
    const forSelection = (selection: typeof glove, weaponType: 'glove' | 'bow') => recommendRoutes(
      calculateSelectedEquipmentMaterials(selection, weaponType).basicMaterials.map(acquisitionForBasicMaterial),
      regionLootSample,
      materialAvailabilityByRegion,
    );
    const gloveRoutes = forSelection(glove, 'glove');
    const bowRoutes = forSelection(bow, 'bow');
    expect(gloveRoutes.length).toBeGreaterThan(0);
    expect(bowRoutes.length).toBeGreaterThan(0);
    expect(gloveRoutes.map((route) => route.orderedRegionIds)).not.toEqual(bowRoutes.map((route) => route.orderedRegionIds));
    expect(gloveRoutes.every((route) => route.orderedRegionIds.length <= 3 && route.droneCalls <= 1)).toBe(true);
  });
});
