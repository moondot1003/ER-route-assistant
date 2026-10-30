import type { Catalog, Equipment } from './models';
import type { WeaponTypeId } from './weaponTypes';

export function getStartingEquipment(catalog: Catalog, weaponTypeId: WeaponTypeId): Equipment[] {
  const { commonWeaponByType, shirtItemId, sneakersItemId } = catalog.startingInventory;
  const weaponId = commonWeaponByType[weaponTypeId];
  if (!weaponId) throw new Error('선택한 무기 유형의 시작 무기 데이터가 없습니다.');

  return [weaponId, shirtItemId, sneakersItemId].map((itemId) => {
    const item = catalog.equipment.find((equipment) => equipment.id === itemId);
    if (!item) throw new Error(`시작 장비 데이터가 없습니다: ${itemId}`);
    return item;
  });
}
