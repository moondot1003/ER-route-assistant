import { acquisitionForBasicMaterial, calculateSelectedEquipmentMaterials } from '../data/craftingRequirements';
import { equipmentCatalog } from '../data/equipmentCatalog';
import type { Equipment, EquipmentSlot } from './models';
import type { WeaponTypeId } from './weaponTypes';
import { emptyEpicEquipmentSelection, equipmentSlots, epicEquipmentOptions } from './equipmentSelection';
import { deriveMaterialTables, droneDesignationBlockReason, type MaterialAvailability, type PlanMaterial } from './materialPlan';

export interface CraftableCandidate {
  item: Equipment;
  droneMaterial: { itemId: string; name: string; quantity: number } | null;
}

export type CraftableCandidates = Record<EquipmentSlot, { direct: CraftableCandidate[]; oneDrone: CraftableCandidate[] }>;

export function classifyCandidateMaterials(materials: readonly PlanMaterial[], routeRegionIds: readonly string[],
  availability: MaterialAvailability): { kind: 'direct' | 'oneDrone' | 'unavailable'; droneMaterial: CraftableCandidate['droneMaterial'] } {
  const missing = deriveMaterialTables(materials,
    { routeRegionIds: [...routeRegionIds], droneQuantities: {} }, availability).missing;
  if (missing.length === 0) return { kind: 'direct', droneMaterial: null };
  if (missing.length === 1 && droneDesignationBlockReason(missing[0]) === null &&
    missing[0].droneUnitsPerCall !== null && missing[0].quantity <= missing[0].droneUnitsPerCall) {
    return { kind: 'oneDrone', droneMaterial: {
      itemId: missing[0].itemId, name: missing[0].name, quantity: missing[0].quantity,
    } };
  }
  return { kind: 'unavailable', droneMaterial: null };
}

/** Evaluate every item alone, with its own starting inventory and without the manual drone plan. */
export function findCraftableEquipment(
  routeRegionIds: readonly string[], weaponTypeId: WeaponTypeId | null,
  availability: MaterialAvailability,
): CraftableCandidates {
  const result: CraftableCandidates = {
    weapon: { direct: [], oneDrone: [] }, chest: { direct: [], oneDrone: [] },
    head: { direct: [], oneDrone: [] }, arm: { direct: [], oneDrone: [] }, leg: { direct: [], oneDrone: [] },
  };
  if (routeRegionIds.length === 0) return result;
  for (const slot of equipmentSlots) {
    for (const item of epicEquipmentOptions(equipmentCatalog, slot, weaponTypeId)) {
      try {
        const selection = { ...emptyEpicEquipmentSelection(), [slot]: item.id };
        const materials = calculateSelectedEquipmentMaterials(selection, weaponTypeId)
          .basicMaterials.map(acquisitionForBasicMaterial);
        const classified = classifyCandidateMaterials(materials, routeRegionIds, availability);
        if (classified.kind === 'direct') result[slot].direct.push({ item, droneMaterial: null });
        else if (classified.kind === 'oneDrone') result[slot].oneDrone.push({ item, droneMaterial: classified.droneMaterial });
      } catch {
        // An incomplete recipe is not a candidate; existing material panel reports selected-item errors.
      }
    }
  }
  return result;
}
