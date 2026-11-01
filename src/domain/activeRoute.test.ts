import { describe, expect, it } from 'vitest';
import { routesMatch, toggleRouteRegion } from './activeRoute';

const valid = new Set(Array.from({ length: 20 }, (_, index) => `r${index}`));

describe('active route', () => {
  it('appends regions, removes a selected region and closes the visit order gap', () => {
    let route: string[] = [];
    route = toggleRouteRegion(route, 'r0', valid);
    route = toggleRouteRegion(route, 'r1', valid);
    route = toggleRouteRegion(route, 'r2', valid);
    expect(route).toEqual(['r0', 'r1', 'r2']);
    expect(toggleRouteRegion(route, 'r1', valid)).toEqual(['r0', 'r2']);
    expect(route).toEqual(['r0', 'r1', 'r2']);
  });

  it('allows manual routes longer than three regions and compares exact order', () => {
    const route = ['r0', 'r1', 'r2', 'r3'].reduce((current, id) => toggleRouteRegion(current, id, valid), [] as string[]);
    expect(route).toHaveLength(4);
    expect(routesMatch(route, ['r0', 'r1', 'r2', 'r3'])).toBe(true);
    expect(routesMatch(route, ['r1', 'r0', 'r2', 'r3'])).toBe(false);
    expect(() => toggleRouteRegion(route, 'research-center', valid)).toThrow(/선택할 수 없는 지역/);
  });
});
