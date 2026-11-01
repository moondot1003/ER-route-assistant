import { deriveMaterialTables, type MaterialAvailability, type PlanMaterial } from './materialPlan';

export interface RouteRegion {
  id: string;
  name: string;
}

export interface RouteRecommendation {
  orderedRegionIds: string[];
  droneCalls: 0 | 1;
  droneMaterialId: string | null;
  droneMaterialName: string | null;
  /** Required units first obtainable in each visited region, without double counting. */
  earlyMaterialUnits: number[];
}

function compareByPriority(a: RouteRecommendation, b: RouteRecommendation, names: ReadonlyMap<string, string>): number {
  const countDifference = a.orderedRegionIds.length - b.orderedRegionIds.length;
  if (countDifference) return countDifference;
  if (a.droneCalls !== b.droneCalls) return a.droneCalls - b.droneCalls;
  for (let index = 0; index < a.orderedRegionIds.length; index += 1) {
    const scoreDifference = b.earlyMaterialUnits[index] - a.earlyMaterialUnits[index];
    if (scoreDifference) return scoreDifference;
  }
  for (let index = 0; index < a.orderedRegionIds.length; index += 1) {
    const nameDifference = names.get(a.orderedRegionIds[index])!.localeCompare(names.get(b.orderedRegionIds[index])!, 'ko');
    if (nameDifference) return nameDifference;
  }
  return a.orderedRegionIds.join('|').localeCompare(b.orderedRegionIds.join('|'));
}

/** A visited region supplies a material type without a regional quantity cap. */
export function evaluateOrderedRoute(
  materials: readonly PlanMaterial[],
  orderedRegionIds: readonly string[],
  availability: MaterialAvailability,
): RouteRecommendation | null {
  if (orderedRegionIds.length < 1 || orderedRegionIds.length > 3 ||
    new Set(orderedRegionIds).size !== orderedRegionIds.length) return null;
  const tables = deriveMaterialTables(materials, { routeRegionIds: [...orderedRegionIds], droneMaterialIds: [] }, availability);
  if (tables.missing.length > 1) return null;
  const missing = tables.missing[0];
  if (missing && (!Number.isSafeInteger(missing.droneUnitsPerCall) ||
    missing.droneUnitsPerCall === null || missing.droneUnitsPerCall < missing.quantity)) return null;

  const counted = new Set<string>();
  const earlyMaterialUnits = orderedRegionIds.map((regionId) => {
    const available = availability.get(regionId)!;
    let units = 0;
    for (const material of materials) {
      if (available.has(material.itemId) && !counted.has(material.itemId)) {
        counted.add(material.itemId);
        units += material.quantity;
      }
    }
    return units;
  });
  return {
    orderedRegionIds: [...orderedRegionIds],
    droneCalls: missing ? 1 : 0,
    droneMaterialId: missing?.itemId ?? null,
    droneMaterialName: missing?.name ?? null,
    earlyMaterialUnits,
  };
}

function permutations(ids: readonly string[]): string[][] {
  if (ids.length === 1) return [[ids[0]]];
  return ids.flatMap((id, index) => permutations(ids.filter((_, otherIndex) => otherIndex !== index))
    .map((tail) => [id, ...tail]));
}

/** Rotate starting areas within equal region-count/drone tiers. */
function diversifyStartingAreas(sorted: RouteRecommendation[]): RouteRecommendation[] {
  const result: RouteRecommendation[] = [];
  for (let start = 0; start < sorted.length;) {
    let end = start + 1;
    while (end < sorted.length && sorted[end].orderedRegionIds.length === sorted[start].orderedRegionIds.length &&
      sorted[end].droneCalls === sorted[start].droneCalls) end += 1;
    const byStart = new Map<string, RouteRecommendation[]>();
    for (const route of sorted.slice(start, end)) {
      const first = route.orderedRegionIds[0];
      const group = byStart.get(first) ?? [];
      group.push(route);
      byStart.set(first, group);
    }
    while ([...byStart.values()].some((group) => group.length > 0)) {
      for (const group of byStart.values()) {
        const next = group.shift();
        if (next) result.push(next);
      }
    }
    start = end;
  }
  return result;
}

/** One best visiting order per region combination; filter before taking the limit. */
export function recommendRoutes(
  materials: readonly PlanMaterial[],
  regions: readonly RouteRegion[],
  availability: MaterialAvailability,
  limit = 10,
  includeDroneRoutes = true,
): RouteRecommendation[] {
  if (materials.length === 0 || limit <= 0) return [];
  const names = new Map(regions.map((region) => [region.id, region.name]));
  if (names.size !== regions.length) throw new Error('중복 지역 ID가 있습니다.');
  const bestByCombination: RouteRecommendation[] = [];

  function visitCombinations(startIndex: number, chosen: string[]) {
    if (chosen.length > 0) {
      const best = permutations(chosen)
        .map((ordered) => evaluateOrderedRoute(materials, ordered, availability))
        .filter((candidate): candidate is RouteRecommendation => candidate !== null)
        .sort((a, b) => compareByPriority(a, b, names))[0];
      if (best) bestByCombination.push(best);
    }
    if (chosen.length === 3) return;
    for (let index = startIndex; index < regions.length; index += 1) {
      visitCombinations(index + 1, [...chosen, regions[index].id]);
    }
  }

  visitCombinations(0, []);
  const eligible = includeDroneRoutes ? bestByCombination : bestByCombination.filter((route) => route.droneCalls === 0);
  return diversifyStartingAreas(eligible.sort((a, b) => compareByPriority(a, b, names))).slice(0, limit);
}
