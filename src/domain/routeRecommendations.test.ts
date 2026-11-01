import { describe, expect, it } from 'vitest';
import type { PlanMaterial } from './materialPlan';
import { evaluateOrderedRoute, recommendRoutes, type RouteRegion } from './routeRecommendations';

const item = (itemId: string, quantity = 1, droneUnitsPerCall = 1): PlanMaterial => ({
  itemId, name: itemId, quantity, acquisition: 'container', unitsPerAcquisition: 1, droneUnitsPerCall,
});
const regions: RouteRegion[] = [
  { id: 'a', name: '가 지역' }, { id: 'b', name: '나 지역' },
  { id: 'c', name: '다 지역' }, { id: 'd', name: '라 지역' },
  { id: 'e', name: '마 지역' },
];
const availability = new Map(regions.map((region, index) => [region.id, new Set([String(index)])]));

describe('route recommendations', () => {
  it('recommends with a partial build and changes results when requirements change', () => {
    const first = recommendRoutes([item('0')], regions, availability);
    const second = recommendRoutes([item('1')], regions, availability);
    expect(first[0].orderedRegionIds).toEqual(['a']);
    expect(second[0].orderedRegionIds).toEqual(['b']);
    expect(recommendRoutes([], regions, availability)).toEqual([]);
  });

  it('allows at most three regions and one drone call', () => {
    const four = recommendRoutes([item('0'), item('1'), item('2'), item('3')], regions, availability);
    expect(four.length).toBeGreaterThan(0);
    expect(four.every((route) => route.orderedRegionIds.length <= 3 && route.droneCalls <= 1)).toBe(true);
    expect(four.every((route) => route.orderedRegionIds.length === 3 && route.droneCalls === 1)).toBe(true);
    expect(recommendRoutes([item('0'), item('1'), item('2'), item('3'), item('4')], regions, availability)).toEqual([]);
    expect(evaluateOrderedRoute([item('0')], ['a', 'b', 'c', 'd'], availability)).toBeNull();
  });

  it('accepts exactly one drone bundle and rejects a greater shortfall', () => {
    const onlyA = new Map([['a', new Set(['present'])]]);
    expect(evaluateOrderedRoute([item('present'), item('missing', 2, 2)], ['a'], onlyA))
      .toMatchObject({ droneCalls: 1, droneMaterialId: 'missing' });
    expect(evaluateOrderedRoute([item('present'), item('missing', 3, 2)], ['a'], onlyA)).toBeNull();
    expect(evaluateOrderedRoute([item('present'), item('missing', 1, 1), item('another')], ['a'], onlyA)).toBeNull();
    expect(evaluateOrderedRoute([item('present'), item('missing', 1, 0)], ['a'], onlyA)).toBeNull();
  });

  it('sorts by region count before drone count, then favors zero drones within that count', () => {
    const twoAreas = regions.slice(0, 2);
    const data = new Map([['a', new Set(['x'])], ['b', new Set(['y'])]]);
    const result = recommendRoutes([item('x'), item('y')], twoAreas, data);
    expect(result.map((route) => [route.orderedRegionIds.length, route.droneCalls])).toEqual([[1, 1], [1, 1], [2, 0]]);
    const withCombined = recommendRoutes([item('x'), item('y')], [...twoAreas, { id: 'c', name: '다 지역' }],
      new Map([...data, ['c', new Set(['x', 'y'])]]));
    expect(withCombined[0]).toMatchObject({ orderedRegionIds: ['c'], droneCalls: 0 });
  });

  it('scores required units in the first obtainable region without double counting', () => {
    const data = new Map([['a', new Set(['x'])], ['b', new Set(['x', 'y'])]]);
    const materials = [item('x', 2), item('y')];
    expect(evaluateOrderedRoute(materials, ['a', 'b'], data)?.earlyMaterialUnits).toEqual([2, 1]);
    expect(evaluateOrderedRoute(materials, ['b', 'a'], data)?.earlyMaterialUnits).toEqual([3, 0]);
    const result = recommendRoutes(materials, regions.slice(0, 2), data);
    expect(result.find((route) => route.orderedRegionIds.length === 2)?.orderedRegionIds).toEqual(['b', 'a']);
  });

  it('keeps one best order per combination and breaks equal scores by Korean area name', () => {
    const data = new Map([['a', new Set(['x'])], ['b', new Set(['x'])]]);
    const result = recommendRoutes([item('x')], regions.slice(0, 2), data);
    expect(result.map((route) => route.orderedRegionIds)).toEqual([['a'], ['b'], ['a', 'b']]);
    expect(result).toHaveLength(3);
  });

  it('limits the returned list to ten distinct combinations', () => {
    const availableEverywhere = new Map(regions.map((region) => [region.id, new Set(['x'])]));
    const result = recommendRoutes([item('x')], regions, availableEverywhere);
    expect(result).toHaveLength(10);
    expect(new Set(result.map((route) => [...route.orderedRegionIds].sort().join('|'))).size).toBe(10);
  });

  it('filters drone routes from all candidates before selecting the top twenty', () => {
    const manyRegions = Array.from({ length: 24 }, (_, index) => ({ id: `r${index}`, name: `지역 ${index}` }));
    const data = new Map(manyRegions.map((region, index) => [region.id, new Set([index < 12 ? 'x' : 'y'])]));
    const result = recommendRoutes([item('x'), item('y')], manyRegions, data, 20, false);
    expect(result).toHaveLength(20);
    expect(result.every((route) => route.droneCalls === 0 && route.orderedRegionIds.length === 2)).toBe(true);
  });

  it('rotates starting regions within the same area-count and drone tier', () => {
    const areaSet = regions.slice(0, 4);
    const data = new Map([
      ['a', new Set(['x', 'y'])], ['b', new Set(['y', 'z'])],
      ['c', new Set(['x', 'z'])], ['d', new Set(['x', 'y'])],
    ]);
    const twoAreaZeroDrone = recommendRoutes([item('x'), item('y'), item('z')], areaSet, data, 20)
      .filter((route) => route.orderedRegionIds.length === 2 && route.droneCalls === 0);
    expect(new Set(twoAreaZeroDrone.slice(0, 3).map((route) => route.orderedRegionIds[0])).size).toBe(3);
  });
});
