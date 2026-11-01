import { describe, expect, it } from 'vitest';
import { adjustDroneQuantityInMaterialPlan, deriveMaterialTables, designateCandidateDroneMaterial, droneDesignationBlockReason,
  emptyMaterialPlan, reconcileMaterialPlan, setMaterialPlanRoute, type MaterialPlanState, type PlanMaterial } from './materialPlan';

const availability = new Map([
  ['one', new Set(['branch', 'scrap'])],
  ['two', new Set(['flower'])],
]);
const branch: PlanMaterial = { itemId: 'branch', name: '나뭇가지', quantity: 1, acquisition: 'field', unitsPerAcquisition: 2, droneUnitsPerCall: 2 };
const scrap: PlanMaterial = { itemId: 'scrap', name: '고철', quantity: 3, acquisition: 'container', unitsPerAcquisition: 2, droneUnitsPerCall: 2 };
const flower: PlanMaterial = { itemId: 'flower', name: '꽃', quantity: 1, acquisition: 'field', unitsPerAcquisition: 2, droneUnitsPerCall: 2 };
const rubber: PlanMaterial = { itemId: 'rubber', name: '고무', quantity: 2, acquisition: 'container', unitsPerAcquisition: 1, droneUnitsPerCall: 1 };
const adjust = (plan: MaterialPlanState, itemId: string, delta: 1 | -1, materials: PlanMaterial[]) =>
  adjustDroneQuantityInMaterialPlan(plan, itemId, delta, materials, availability);

describe('material plan tables', () => {
  it('distinguishes no route from an explicitly empty route', () => {
    expect(deriveMaterialTables([branch], emptyMaterialPlan(), availability).unassigned).toEqual([branch]);
    expect(deriveMaterialTables([branch], { routeRegionIds: [], droneQuantities: {} }, availability).missing).toEqual([branch]);
  });

  it('uses membership only and calculates acquisition surplus without region quantities', () => {
    const tables = deriveMaterialTables([branch, scrap, flower], { routeRegionIds: ['one'], droneQuantities: {} }, availability);
    expect(tables.included.map((item) => item.itemId)).toEqual(['branch', 'scrap']);
    expect(tables.missing).toEqual([flower]);
    expect(tables.surplus).toEqual([{ itemId: 'branch', quantity: 1 }, { itemId: 'scrap', quantity: 1 }]);
  });

  it('increments missing rubber one unit at a time and decrements its drone tile', () => {
    const initial = { routeRegionIds: ['one'], droneQuantities: {} };
    const one = adjust(initial, 'rubber', 1, [rubber]);
    expect(deriveMaterialTables([rubber], one, availability)).toMatchObject({
      missing: [{ quantity: 1 }], drone: [{ quantity: 1, requiredCalls: 1 }],
    });
    const two = adjust(one, 'rubber', 1, [rubber]);
    expect(deriveMaterialTables([rubber], two, availability)).toMatchObject({
      missing: [], drone: [{ quantity: 2, requiredCalls: 2 }],
    });
    expect(adjust(two, 'rubber', 1, [rubber]).droneQuantities).toEqual({ rubber: 2 });
    const reduced = adjust(two, 'rubber', -1, [rubber]);
    expect(deriveMaterialTables([rubber], reduced, availability)).toMatchObject({
      missing: [{ quantity: 1 }], drone: [{ quantity: 1 }],
    });
    expect(adjust(reduced, 'rubber', -1, [rubber]).droneQuantities).toEqual({});
  });

  it('uses drone bundle size for calls but keeps designated units separate from overdelivery', () => {
    const plan = { routeRegionIds: ['two'], droneQuantities: { scrap: 1 } };
    expect(deriveMaterialTables([scrap], plan, availability)).toMatchObject({
      missing: [{ quantity: 2 }], drone: [{ quantity: 1, requiredCalls: 1, plannedUnits: 2 }],
      surplus: [{ quantity: 1 }],
    });
    const two = adjust(plan, 'scrap', 1, [scrap]);
    expect(deriveMaterialTables([scrap], two, availability).drone[0]).toMatchObject({ quantity: 2, requiredCalls: 1 });
    const three = adjust(two, 'scrap', 1, [scrap]);
    expect(deriveMaterialTables([scrap], three, availability).drone[0]).toMatchObject({ quantity: 3, requiredCalls: 2 });
  });

  it('clears drone designation when a route includes the material and never restores it', () => {
    const designated = adjust({ routeRegionIds: ['one'], droneQuantities: {} }, 'flower', 1, [flower]);
    const included = setMaterialPlanRoute(designated, ['one', 'two'], [flower], availability);
    expect(included.droneQuantities).toEqual({});
    const missing = setMaterialPlanRoute(included, ['one'], [flower], availability);
    expect(deriveMaterialTables([flower], missing, availability).missing).toEqual([flower]);
  });

  it('keeps valid drone choices on route reset and prunes reduced or removed demand', () => {
    const designated = { routeRegionIds: ['one'], droneQuantities: { flower: 3 } };
    expect(setMaterialPlanRoute(designated, null, [flower], availability).droneQuantities).toEqual({ flower: 1 });
    expect(reconcileMaterialPlan(designated, [], availability).droneQuantities).toEqual({});
    expect(() => setMaterialPlanRoute(designated, ['invalid'], [flower], availability)).toThrow(/존재하지 않는 지역 ID/);
  });

  it('supports designation without a route, including cancellation and re-designation', () => {
    const first = adjust(emptyMaterialPlan(), 'flower', 1, [flower]);
    expect(deriveMaterialTables([flower], first, availability).drone[0]).toMatchObject({ quantity: 1, requiredCalls: 1, plannedUnits: 2 });
    const cancelled = adjust(first, 'flower', -1, [flower]);
    expect(deriveMaterialTables([flower], cancelled, availability).unassigned).toEqual([flower]);
    expect(adjust(cancelled, 'flower', 1, [flower]).droneQuantities).toEqual({ flower: 1 });
  });

  it('blocks included, non-drone, and unknown-quantity materials', () => {
    const unavailable = { ...flower, itemId: 'blocked', droneAvailable: false };
    const unknown = { ...flower, itemId: 'unknown', droneUnitsPerCall: null };
    expect(droneDesignationBlockReason(unavailable)).toMatch(/불가능/);
    expect(droneDesignationBlockReason(unknown)).toMatch(/확인되지/);
    expect(adjust(emptyMaterialPlan(), 'blocked', 1, [unavailable]).droneQuantities).toEqual({});
    expect(adjust(emptyMaterialPlan(), 'unknown', 1, [unknown]).droneQuantities).toEqual({});
    expect(adjust({ routeRegionIds: ['one'], droneQuantities: {} }, 'branch', 1, [branch]).droneQuantities).toEqual({});
  });

  it('auto-designates the final combined shortage and retains other manual quantities', () => {
    const current = { routeRegionIds: ['one'], droneQuantities: { flower: 1, rubber: 1 } };
    const planned = designateCandidateDroneMaterial(current, 'rubber', [{ ...rubber, quantity: 3 }, flower], availability);
    expect(planned.droneQuantities).toEqual({ flower: 1, rubber: 3 });
    const reduced = adjust(planned, 'rubber', -1, [{ ...rubber, quantity: 3 }, flower]);
    expect(reduced.droneQuantities).toEqual({ flower: 1, rubber: 2 });
    expect(designateCandidateDroneMaterial(current, 'branch', [branch, flower, rubber], availability).droneQuantities)
      .toEqual({ flower: 1, rubber: 1 });
  });
});
