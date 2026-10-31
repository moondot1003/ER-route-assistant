import { calculateBasicMaterials, type BasicMaterialRequirement, type CraftingCalculation, type CraftingItem, type ItemQuantity } from '../domain/craftingCalculator';
import { equipmentSlots } from '../domain/equipmentSelection';
import type { EpicEquipmentSelection } from '../domain/models';
import type { WeaponTypeId } from '../domain/weaponTypes';
import { commonItemReferences } from './commonItemReferences';
import { craftingRecipes } from './craftingRecipes';
import { equipmentCatalog } from './equipmentCatalog';
import { materialCatalog } from './materialCatalog';
import { materialRecipes } from './materialRecipes';
import { regionLootSample, commonItemId } from './regionLootSample';
import { startingEquipmentReference } from './startingEquipmentReference';

const itemById = new Map<string, CraftingItem>();
for (const item of [...commonItemReferences, ...materialCatalog, ...equipmentCatalog]) {
  itemById.set(item.id, { id: item.id, name: item.name, rarity: item.rarity });
}
const allRecipes = [...craftingRecipes, ...materialRecipes];
const containerItemIds = new Set(regionLootSample.flatMap((region) => region.items.map((item) => item.itemId)));
const materialById = new Map(materialCatalog.map((material) => [material.id, material]));

export function startingInventoryForWeapon(weaponTypeId: WeaponTypeId): ItemQuantity[] {
  const weaponId = startingEquipmentReference.commonWeaponByType[weaponTypeId as keyof typeof startingEquipmentReference.commonWeaponByType];
  if (!weaponId) throw new Error(`시작 장비 대응표에 없는 무기 유형: ${weaponTypeId}`);
  return [weaponId, startingEquipmentReference.shirtItemId, startingEquipmentReference.sneakersItemId]
    .map((itemId) => ({ itemId, quantity: 1 }));
}

/** Production adapter for the selected equipment IDs; each call is independent of UI state. */
export function calculateSelectedEquipmentMaterials(
  selection: EpicEquipmentSelection,
  weaponTypeId: WeaponTypeId,
): CraftingCalculation {
  const targets = equipmentSlots.flatMap((slot) => {
    const itemId = selection[slot];
    if (!itemId) return [];
    const equipment = equipmentCatalog.find((item) => item.id === itemId);
    if (!equipment || equipment.rarity !== 'epic' || equipment.slot !== slot ||
      (slot === 'weapon' && equipment.weaponTypeId !== weaponTypeId)) {
      throw new Error(`선택한 장비가 현재 부위·무기 유형과 맞지 않습니다: ${itemId}`);
    }
    return [{ itemId, quantity: 1 }];
  });
  return calculateBasicMaterials(targets, [...itemById.values()], allRecipes, startingInventoryForWeapon(weaponTypeId));
}

export type AcquisitionMethod = 'container' | 'field' | 'unknown';
export interface AcquiredMaterial extends BasicMaterialRequirement {
  acquisition: AcquisitionMethod;
  unitsPerAcquisition: number | null;
  droneAvailable: true;
  droneUnitsPerCall: number | null;
}

/** Pickup bundles and recipe outputQuantity are deliberately separate data. */
export function acquisitionForBasicMaterial(material: BasicMaterialRequirement): AcquiredMaterial {
  const catalogEntry = materialById.get(material.itemId);
  const acquisition: AcquisitionMethod = catalogEntry?.acquisition === 'field' ? 'field'
    : containerItemIds.has(material.itemId) || catalogEntry?.acquisition === 'container' ? 'container'
      : 'unknown';
  const unitsPerAcquisition = acquisition === 'field' ? 2
    : acquisition === 'container' ? material.itemId === commonItemId('고철') ? 2 : 1
      : null;
  // Every Common basic item is drone eligible; field materials and scrap have a two-unit bundle.
  const droneUnitsPerCall = acquisition === 'unknown' ? null
    : acquisition === 'field' || material.itemId === commonItemId('고철') ? 2 : 1;
  return { ...material, acquisition, unitsPerAcquisition, droneAvailable: true, droneUnitsPerCall };
}
