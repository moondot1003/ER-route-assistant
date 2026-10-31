import { describe, expect, it } from 'vitest';
import { deriveMaterialTables, emptyMaterialPlan, reconcileMaterialPlan, setMaterialPlanRoute, toggleDroneInMaterialPlan, type PlanMaterial } from './materialPlan';

const availability = new Map([
  ['one', new Set(['branch', 'scrap'])],
  ['two', new Set(['flower'])],
]);
const branch = { itemId: 'branch', name: '나뭇가지', quantity: 1, acquisition: 'field', unitsPerAcquisition: 2, droneUnitsPerCall: 2 } as const;
const scrap = { itemId: 'scrap', name: '고철', quantity: 3, acquisition: 'container', unitsPerAcquisition: 2, droneUnitsPerCall: 2 } as const;
const flower = { itemId: 'flower', name: '꽃', quantity: 1, acquisition: 'field', unitsPerAcquisition: 2, droneUnitsPerCall: 2 } as const;

describe('material plan tables', () => {
  it('distinguishes no route from an explicitly empty route', () => {
    const noRoute = deriveMaterialTables([branch], emptyMaterialPlan(), availability);
    expect(noRoute.unassigned).toHaveLength(1);
    expect(noRoute.missing).toEqual([]);
    const selected = deriveMaterialTables([branch], { routeRegionIds: [], droneMaterialIds: [] }, availability);
    expect(selected.unassigned).toEqual([]);
    expect(selected.missing).toHaveLength(1);
  });

  it('uses membership only and calculates acquisition surplus without region quantities', () => {
    const tables = deriveMaterialTables([branch, scrap, flower], { routeRegionIds: ['one'], droneMaterialIds: [] }, availability);
    expect(tables.included.map((item) => item.itemId)).toEqual(['branch', 'scrap']);
    expect(tables.missing.map((item) => item.itemId)).toEqual(['flower']);
    expect(tables.surplus).toEqual([{ itemId: 'branch', quantity: 1 }, { itemId: 'scrap', quantity: 1 }]);
  });

  it('recomputes drone calls and surplus from current demand without accumulating past surplus', () => {
    const plan = { routeRegionIds: ['one'], droneMaterialIds: ['flower'] };
    const first = deriveMaterialTables([flower], plan, availability);
    expect(first.drone).toMatchObject([{ itemId: 'flower', requiredCalls: 1, plannedUnits: 2, droneUnitsPerCall: 2 }]);
    expect(first.surplus).toEqual([{ itemId: 'flower', quantity: 1 }]);
    const twoFlowers: PlanMaterial = { ...flower, quantity: 2 };
    const second = deriveMaterialTables([twoFlowers], plan, availability);
    expect(second.drone[0].requiredCalls).toBe(1);
    expect(second.surplus).toEqual([]);
    const third = deriveMaterialTables([{ ...flower, quantity: 3 }], plan, availability);
    expect(third.drone[0]).toMatchObject({ requiredCalls: 2, plannedUnits: 4 });
    expect(third.surplus).toEqual([{ itemId: 'flower', quantity: 1 }]);
    expect(deriveMaterialTables([twoFlowers], plan, availability).surplus).toEqual([]);
  });

  it('toggles only missing materials and fully clears drone designation on route inclusion', () => {
    const materials = [branch, flower];
    const routeOne = setMaterialPlanRoute(emptyMaterialPlan(), ['one'], materials, availability);
    expect(toggleDroneInMaterialPlan(routeOne, 'branch', materials, availability).droneMaterialIds).toEqual([]);
    const designated = toggleDroneInMaterialPlan(routeOne, 'flower', materials, availability);
    expect(designated.droneMaterialIds).toEqual(['flower']);
    expect(toggleDroneInMaterialPlan(designated, 'flower', materials, availability).droneMaterialIds).toEqual([]);
    const nowIncluded = setMaterialPlanRoute(designated, ['one', 'two'], materials, availability);
    expect(nowIncluded.droneMaterialIds).toEqual([]);
    expect(deriveMaterialTables(materials, nowIncluded, availability).drone).toEqual([]);
    const movedBack = setMaterialPlanRoute(nowIncluded, ['one'], materials, availability);
    expect(deriveMaterialTables(materials, movedBack, availability).missing.map((item) => item.itemId)).toEqual(['flower']);
    expect(movedBack.droneMaterialIds).toEqual([]);
  });

  it('prunes removed materials and rejects unknown regions', () => {
    const plan = { routeRegionIds: ['one'], droneMaterialIds: ['flower'] };
    expect(reconcileMaterialPlan(plan, [branch], availability).droneMaterialIds).toEqual([]);
    expect(() => setMaterialPlanRoute(plan, ['invalid'], [flower], availability)).toThrow(/존재하지 않는 지역 ID/);
  });
});
