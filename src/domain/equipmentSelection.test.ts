import { describe, expect, it } from 'vitest';
import { equipmentCatalog } from '../data/equipmentCatalog';
import { mockCatalog } from '../data/mockCatalog';
import {
  emptyEpicEquipmentSelection, equipmentSlots, epicEquipmentOptions,
  resetEpicEquipmentOnContextChange, selectEpicEquipment,
} from './equipmentSelection';

function filledSelection() {
  return equipmentSlots.reduce((selection, slot) => {
    const item = epicEquipmentOptions(equipmentCatalog, slot, 'glove')[0];
    return selectEpicEquipment(selection, slot, item.id, 'glove', equipmentCatalog);
  }, emptyEpicEquipmentSelection());
}

describe('Epic equipment selection', () => {
  it('offers five slots with only matching Epic equipment', () => {
    expect(equipmentSlots).toEqual(['weapon', 'chest', 'head', 'arm', 'leg']);
    for (const slot of equipmentSlots) {
      const options = epicEquipmentOptions(equipmentCatalog, slot, 'glove');
      expect(options.length).toBeGreaterThan(0);
      expect(options.every((item) => item.rarity === 'epic' && item.slot === slot)).toBe(true);
    }
  });

  it('filters weapons for character A glove/bow and character B bat', () => {
    expect(mockCatalog.characters[0].supportedWeaponTypes).toEqual(['glove', 'bow']);
    expect(mockCatalog.characters[1].supportedWeaponTypes).toEqual(['bat']);
    expect(mockCatalog.characters.map((character) => character.name)).toEqual(['시연 실험체 A', '시연 실험체 B']);
    for (const type of ['glove', 'bow', 'bat'] as const) {
      const weapons = epicEquipmentOptions(equipmentCatalog, 'weapon', type);
      expect(weapons.length).toBeGreaterThan(0);
      expect(weapons.every((item) => item.weaponTypeId === type)).toBe(true);
    }
    const gloveIds = epicEquipmentOptions(equipmentCatalog, 'weapon', 'glove').map((item) => item.id);
    const bowIds = epicEquipmentOptions(equipmentCatalog, 'weapon', 'bow').map((item) => item.id);
    const batIds = epicEquipmentOptions(equipmentCatalog, 'weapon', 'bat').map((item) => item.id);
    expect(new Set([...gloveIds, ...bowIds, ...batIds]).size).toBe(gloveIds.length + bowIds.length + batIds.length);
  });

  it('selects and clears equipment while rejecting the wrong slot or rarity', () => {
    const chest = epicEquipmentOptions(equipmentCatalog, 'chest', 'glove')[0];
    const first = selectEpicEquipment(emptyEpicEquipmentSelection(), 'chest', chest.id, 'glove', equipmentCatalog);
    expect(first.chest).toBe(chest.id);
    expect(selectEpicEquipment(first, 'head', chest.id, 'glove', equipmentCatalog)).toBe(first);
    expect(selectEpicEquipment(first, 'chest', 'sample-common:셔츠', 'glove', equipmentCatalog)).toBe(first);
    expect(selectEpicEquipment(first, 'chest', null, 'glove', equipmentCatalog).chest).toBeNull();
  });

  it('resets all five slots on a changed test subject and allows reselection', () => {
    const selected = filledSelection();
    expect(equipmentSlots.every((slot) => selected[slot] !== null)).toBe(true);
    expect(resetEpicEquipmentOnContextChange(selected, 'mock-character-a', 'mock-character-a')).toBe(selected);
    const cleared = resetEpicEquipmentOnContextChange(selected, 'mock-character-a', 'mock-character-b');
    expect(cleared).toEqual(emptyEpicEquipmentSelection());
    const bat = epicEquipmentOptions(equipmentCatalog, 'weapon', 'bat')[0];
    expect(selectEpicEquipment(cleared, 'weapon', bat.id, 'bat', equipmentCatalog).weapon).toBe(bat.id);
  });

  it('resets all five slots on a changed weapon type but retains the same type', () => {
    const selected = filledSelection();
    expect(resetEpicEquipmentOnContextChange(selected, 'glove', 'glove')).toBe(selected);
    const cleared = resetEpicEquipmentOnContextChange(selected, 'glove', 'bow');
    expect(cleared).toEqual(emptyEpicEquipmentSelection());
    const bow = epicEquipmentOptions(equipmentCatalog, 'weapon', 'bow')[0];
    expect(selectEpicEquipment(cleared, 'weapon', bow.id, 'bow', equipmentCatalog).weapon).toBe(bow.id);
  });
});
