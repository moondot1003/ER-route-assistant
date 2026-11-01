export interface PlanMaterial {
  itemId: string;
  name: string;
  quantity: number;
  acquisition: 'container' | 'field' | 'unknown';
  unitsPerAcquisition: number | null;
  droneAvailable?: boolean;
  droneUnitsPerCall: number | null;
}

/** null means no route has been selected; [] means an explicitly empty route. */
export interface MaterialPlanState {
  routeRegionIds: string[] | null;
  droneQuantities: Record<string, number>;
}

export interface DronePlannedMaterial extends PlanMaterial {
  droneUnitsPerCall: number;
  requiredCalls: number;
  plannedUnits: number;
}

export interface MaterialSurplus {
  itemId: string;
  quantity: number;
}

export interface MaterialTables {
  included: PlanMaterial[];
  missing: PlanMaterial[];
  drone: DronePlannedMaterial[];
  surplus: MaterialSurplus[];
  unassigned: PlanMaterial[];
}

export type MaterialAvailability = ReadonlyMap<string, ReadonlySet<string>>;

export const emptyMaterialPlan = (): MaterialPlanState => ({ routeRegionIds: null, droneQuantities: {} });

function validPositiveUnit(unit: number | null): unit is number {
  return unit !== null && Number.isSafeInteger(unit) && unit > 0;
}

export function droneDesignationBlockReason(material: PlanMaterial): string | null {
  if (material.droneAvailable === false) return '드론 배송이 불가능한 재료입니다.';
  if (!validPositiveUnit(material.droneUnitsPerCall)) return '드론 1회 획득 수량이 확인되지 않았습니다.';
  return null;
}

/** Recompute four logical tables from current demand and plan; surplus is never accumulated. */
export function deriveMaterialTables(
  materials: readonly PlanMaterial[],
  plan: MaterialPlanState,
  availability: MaterialAvailability,
): MaterialTables {
  const tables: MaterialTables = { included: [], missing: [], drone: [], surplus: [], unassigned: [] };
  if (plan.routeRegionIds !== null) {
    for (const regionId of plan.routeRegionIds) {
      if (!availability.has(regionId)) throw new Error(`존재하지 않는 지역 ID: ${regionId}`);
    }
  }
  const seen = new Set<string>();
  for (const material of materials) {
    if (seen.has(material.itemId)) throw new Error(`중복 재료 ID: ${material.itemId}`);
    seen.add(material.itemId);
    if (!Number.isSafeInteger(material.quantity) || material.quantity < 1) {
      throw new Error(`잘못된 필요 수량: ${material.itemId}`);
    }
    const obtainable = plan.routeRegionIds?.some((regionId) => availability.get(regionId)!.has(material.itemId)) ?? false;
    if (obtainable) {
      tables.included.push(material);
      if (validPositiveUnit(material.unitsPerAcquisition)) {
        const acquired = Math.ceil(material.quantity / material.unitsPerAcquisition) * material.unitsPerAcquisition;
        if (acquired > material.quantity) tables.surplus.push({ itemId: material.itemId, quantity: acquired - material.quantity });
      }
    } else {
      const requested = plan.droneQuantities[material.itemId] ?? 0;
      const droneQuantity = droneDesignationBlockReason(material) === null && Number.isSafeInteger(requested)
        ? Math.max(0, Math.min(material.quantity, requested)) : 0;
      const remaining = material.quantity - droneQuantity;
      if (remaining > 0) {
        (plan.routeRegionIds === null ? tables.unassigned : tables.missing).push({ ...material, quantity: remaining });
      }
      if (droneQuantity === 0 || !validPositiveUnit(material.droneUnitsPerCall)) continue;
      const requiredCalls = Math.ceil(droneQuantity / material.droneUnitsPerCall);
      const plannedUnits = requiredCalls * material.droneUnitsPerCall;
      tables.drone.push({ ...material, quantity: droneQuantity, droneUnitsPerCall: material.droneUnitsPerCall, requiredCalls, plannedUnits });
      if (plannedUnits > droneQuantity) tables.surplus.push({ itemId: material.itemId, quantity: plannedUnits - droneQuantity });
    }
  }
  return tables;
}

/** Drop drone choices that are no longer required or have become route obtainable. */
export function reconcileMaterialPlan(
  plan: MaterialPlanState,
  materials: readonly PlanMaterial[],
  availability: MaterialAvailability,
): MaterialPlanState {
  const tables = deriveMaterialTables(materials, plan, availability);
  return { ...plan, droneQuantities: Object.fromEntries(tables.drone.map((material) => [material.itemId, material.quantity])) };
}

export function setMaterialPlanRoute(
  plan: MaterialPlanState,
  routeRegionIds: readonly string[] | null,
  materials: readonly PlanMaterial[],
  availability: MaterialAvailability,
): MaterialPlanState {
  return reconcileMaterialPlan({ ...plan, routeRegionIds: routeRegionIds === null ? null : [...routeRegionIds] }, materials, availability);
}

/** A manual drone plan has no call-count cap; included materials cannot be designated. */
export function adjustDroneQuantityInMaterialPlan(
  plan: MaterialPlanState,
  itemId: string,
  delta: 1 | -1,
  materials: readonly PlanMaterial[],
  availability: MaterialAvailability,
): MaterialPlanState {
  const current = reconcileMaterialPlan(plan, materials, availability);
  const candidate = materials.find((material) => material.itemId === itemId);
  if (!candidate || droneDesignationBlockReason(candidate) !== null ||
    current.routeRegionIds?.some((regionId) => availability.get(regionId)?.has(itemId))) return current;
  const next = Math.max(0, Math.min(candidate.quantity, (current.droneQuantities[itemId] ?? 0) + delta));
  const droneQuantities = { ...current.droneQuantities };
  if (next === 0) delete droneQuantities[itemId];
  else droneQuantities[itemId] = next;
  return { ...current, droneQuantities };
}

/** Designate the full combined-build shortage for one candidate, preserving other manual choices. */
export function designateCandidateDroneMaterial(
  plan: MaterialPlanState,
  itemId: string,
  materials: readonly PlanMaterial[],
  availability: MaterialAvailability,
): MaterialPlanState {
  const current = reconcileMaterialPlan(plan, materials, availability);
  const target = materials.find((material) => material.itemId === itemId);
  if (!target || droneDesignationBlockReason(target) !== null ||
    current.routeRegionIds?.some((regionId) => availability.get(regionId)?.has(itemId))) return current;
  return reconcileMaterialPlan({ ...current, droneQuantities: {
    ...current.droneQuantities,
    [itemId]: Math.max(current.droneQuantities[itemId] ?? 0, target.quantity),
  } }, materials, availability);
}
