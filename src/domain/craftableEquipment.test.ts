import { describe, expect, it } from 'vitest';
import { materialAvailabilityByRegion } from '../data/materialAvailability';
import { equipmentCatalog } from '../data/equipmentCatalog';
import { classifyCandidateMaterials, findCraftableEquipment } from './craftableEquipment';
import type { PlanMaterial } from './materialPlan';

const availability = new Map([['sample', new Set(['available'])]]);
const material = (itemId: string, quantity: number, units: number, droneAvailable = true): PlanMaterial => ({
  itemId, name: itemId, quantity, acquisition: 'container', unitsPerAcquisition: 1,
  droneUnitsPerCall: units, droneAvailable,
});

describe('craftable equipment candidates', () => {
  it('separates direct, exactly one drone, and unavailable candidates', () => {
    expect(classifyCandidateMaterials([material('available', 2, 1)], ['sample'], availability).kind).toBe('direct');
    expect(classifyCandidateMaterials([material('missing', 2, 2)], ['sample'], availability)).toMatchObject({
      kind: 'oneDrone', droneMaterial: { itemId: 'missing', quantity: 2 },
    });
    expect(classifyCandidateMaterials([material('missing', 3, 2)], ['sample'], availability).kind).toBe('unavailable');
    expect(classifyCandidateMaterials([material('missing', 1, 1), material('other', 1, 1)], ['sample'], availability).kind).toBe('unavailable');
    expect(classifyCandidateMaterials([material('missing', 1, 1, false)], ['sample'], availability).kind).toBe('unavailable');
  });

  it('has no candidates without a route and filters weapons by selected type', () => {
    const empty = findCraftableEquipment([], 'glove', materialAvailabilityByRegion);
    expect(Object.values(empty).every((slot) => slot.direct.length + slot.oneDrone.length === 0)).toBe(true);
    const noWeapon = findCraftableEquipment(['pond', 'hospital', 'temple'], null, materialAvailabilityByRegion);
    expect(noWeapon.weapon).toEqual({ direct: [], oneDrone: [] });
    expect([...noWeapon.chest.direct, ...noWeapon.chest.oneDrone].length).toBeGreaterThan(0);
    const glove = findCraftableEquipment(['pond', 'hospital', 'temple'], 'glove', materialAvailabilityByRegion);
    expect([...glove.weapon.direct, ...glove.weapon.oneDrone].every(({ item }) => item.weaponTypeId === 'glove')).toBe(true);
    expect([...glove.chest.direct, ...glove.chest.oneDrone].every(({ item }) =>
      equipmentCatalog.some((entry) => entry.id === item.id && entry.slot === 'chest' && entry.rarity === 'epic'))).toBe(true);
  });
});
