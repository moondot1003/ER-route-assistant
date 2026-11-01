import { describe, expect, it } from 'vitest';
import { deriveMaterialTables, droneDesignationBlockReason, emptyMaterialPlan, reconcileMaterialPlan, setMaterialPlanRoute, toggleDroneInMaterialPlan, type PlanMaterial } from './materialPlan';

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

  it('toggles drone designation without a route and returns to unassigned on cancellation', () => {
    const first = toggleDroneInMaterialPlan(emptyMaterialPlan(), 'flower', [flower], availability);
    expect(first.droneMaterialIds).toEqual(['flower']);
    expect(deriveMaterialTables([flower], first, availability).drone).toMatchObject([{ requiredCalls: 1, plannedUnits: 2 }]);
    const cancelled = toggleDroneInMaterialPlan(first, 'flower', [flower], availability);
    expect(cancelled.droneMaterialIds).toEqual([]);
    expect(deriveMaterialTables([flower], cancelled, availability).unassigned).toEqual([flower]);
    expect(toggleDroneInMaterialPlan(cancelled, 'flower', [flower], availability).droneMaterialIds).toEqual(['flower']);
  });

  it('rejects unavailable or unknown-quantity drone materials with a reason', () => {
    const unavailable: PlanMaterial = { ...flower, itemId: 'blocked', droneAvailable: false };
    const unknown: PlanMaterial = { ...flower, itemId: 'unknown', droneUnitsPerCall: null };
    expect(droneDesignationBlockReason(unavailable)).toMatch(/불가능/);
    expect(droneDesignationBlockReason(unknown)).toMatch(/확인되지/);
    expect(toggleDroneInMaterialPlan(emptyMaterialPlan(), 'blocked', [unavailable], availability).droneMaterialIds).toEqual([]);
    expect(toggleDroneInMaterialPlan(emptyMaterialPlan(), 'unknown', [unknown], availability).droneMaterialIds).toEqual([]);
  });

  it('removes no-longer-needed drone choices and does not restore them after a route change', () => {
    const designated = toggleDroneInMaterialPlan(emptyMaterialPlan(), 'flower', [flower], availability);
    expect(reconcileMaterialPlan(designated, [], availability).droneMaterialIds).toEqual([]);
    const included = setMaterialPlanRoute(designated, ['two'], [flower], availability);
    expect(included.droneMaterialIds).toEqual([]);
    const missingAgain = setMaterialPlanRoute(included, ['one'], [flower], availability);
    expect(deriveMaterialTables([flower], missingAgain, availability).missing).toEqual([flower]);
    expect(missingAgain.droneMaterialIds).toEqual([]);
  });
});
