import { describe, expect, it } from 'vitest';
import { emptyEpicEquipmentSelection, resetEpicEquipmentOnContextChange } from '../domain/equipmentSelection';
import { acquisitionForBasicMaterial, calculateSelectedEquipmentMaterials, startingInventoryForWeapon } from './craftingRequirements';
import { equipmentCatalog } from './equipmentCatalog';

describe('selected equipment material requirements', () => {
  it('uses the real recipe IDs and deducts the matching starting weapon', () => {
    const selection = { ...emptyEpicEquipmentSelection(), weapon: 'wiki:glove:소수' };
    expect(calculateSelectedEquipmentMaterials(selection, 'glove').basicMaterials.map((item) => [item.name, item.quantity]))
      .toEqual([['고무', 1], ['돌멩이', 1], ['유리병', 1]]);
    expect(startingInventoryForWeapon('glove')).toEqual([
      { itemId: 'sample-common:목장갑', quantity: 1 },
      { itemId: 'sample-common:셔츠', quantity: 1 },
      { itemId: 'sample-common:운동화', quantity: 1 },
    ]);
  });

  it('keeps recipe output and acquisition bundle sizes independent', () => {
    expect(acquisitionForBasicMaterial({ itemId: 'sample-common:고철', name: '고철', quantity: 3 }))
      .toMatchObject({ acquisition: 'container', unitsPerAcquisition: 2, droneUnitsPerCall: 2, quantity: 3 });
    expect(acquisitionForBasicMaterial({ itemId: 'sample-field:돌멩이', name: '돌멩이', quantity: 1 }))
      .toMatchObject({ acquisition: 'field', unitsPerAcquisition: 2, droneUnitsPerCall: 2 });
    expect(acquisitionForBasicMaterial({ itemId: 'sample-common:고무', name: '고무', quantity: 1 }))
      .toMatchObject({ acquisition: 'container', unitsPerAcquisition: 1, droneUnitsPerCall: 1 });
    expect(acquisitionForBasicMaterial({ itemId: 'sample-common:가죽', name: '가죽', quantity: 1 }))
      .toMatchObject({ acquisition: 'unknown', unitsPerAcquisition: null, droneUnitsPerCall: null });
  });

  it('clears the calculation after a context change and recalculates newly selected equipment', () => {
    const selected = { ...emptyEpicEquipmentSelection(), weapon: 'wiki:glove:소수' };
    expect(calculateSelectedEquipmentMaterials(selected, 'glove').basicMaterials.length).toBeGreaterThan(0);
    const cleared = resetEpicEquipmentOnContextChange(selected, 'glove', 'bow');
    expect(calculateSelectedEquipmentMaterials(cleared, 'bow').basicMaterials).toEqual([]);
    expect(() => calculateSelectedEquipmentMaterials(selected, 'bow')).toThrow(/현재 부위·무기 유형/);
    const bow = { ...cleared, weapon: 'wiki:bow:트윈보우' };
    expect(calculateSelectedEquipmentMaterials(bow, 'bow').basicMaterials.length).toBeGreaterThan(0);
  });

  it('expands every registered Epic item using the integrated recipe graph', () => {
    const epicItems = equipmentCatalog.filter((item) => item.rarity === 'epic');
    expect(epicItems).toHaveLength(84);
    for (const item of epicItems) {
      const selection = { ...emptyEpicEquipmentSelection(), [item.slot]: item.id };
      const weaponType = item.weaponTypeId ?? 'glove';
      const result = calculateSelectedEquipmentMaterials(selection, weaponType);
      expect(result.basicMaterials.every((material) => material.quantity > 0)).toBe(true);
    }
  });
});
