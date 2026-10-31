import type { EpicEquipmentSelection, Equipment, EquipmentSlot } from './models';
import type { WeaponTypeId } from './weaponTypes';

export const equipmentSlots: EquipmentSlot[] = ['weapon', 'chest', 'head', 'arm', 'leg'];

export const equipmentSlotLabels: Record<EquipmentSlot, string> = {
  weapon: '무기', chest: '옷', head: '머리', arm: '팔/장식', leg: '다리',
};

export function emptyEpicEquipmentSelection(): EpicEquipmentSelection {
  return { weapon: null, chest: null, head: null, arm: null, leg: null };
}

export function epicEquipmentOptions(
  equipment: readonly Equipment[],
  slot: EquipmentSlot,
  weaponTypeId: WeaponTypeId,
): Equipment[] {
  return equipment
    .filter((item) => item.rarity === 'epic' && item.slot === slot)
    .filter((item) => slot !== 'weapon' || item.weaponTypeId === weaponTypeId)
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'));
}

export function resetEpicEquipmentOnContextChange(
  selection: EpicEquipmentSelection,
  previousValue: string | null,
  nextValue: string,
): EpicEquipmentSelection {
  return previousValue === nextValue ? selection : emptyEpicEquipmentSelection();
}

export function selectEpicEquipment(
  selection: EpicEquipmentSelection,
  slot: EquipmentSlot,
  itemId: string | null,
  weaponTypeId: WeaponTypeId,
  equipment: readonly Equipment[],
): EpicEquipmentSelection {
  if (itemId !== null && !epicEquipmentOptions(equipment, slot, weaponTypeId).some((item) => item.id === itemId)) {
    return selection;
  }
  return { ...selection, [slot]: itemId };
}
