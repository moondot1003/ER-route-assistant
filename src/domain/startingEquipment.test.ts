import { describe, expect, it } from 'vitest';
import { mockCatalog } from '../data/mockCatalog';
import { getStartingEquipment } from './startingEquipment';
import { weaponTypes } from './weaponTypes';

describe('Phase 1 mock catalog', () => {
  it('defines the 23 player-provided weapon type names with local IDs', () => {
    expect(weaponTypes).toHaveLength(23);
    expect(new Set(weaponTypes.map((type) => type.id)).size).toBe(23);
  });

  it('shows the selected Common weapon, Shirt, and Sneakers exactly once', () => {
    const gloveStart = getStartingEquipment(mockCatalog, 'glove');
    const bowStart = getStartingEquipment(mockCatalog, 'bow');

    expect(gloveStart.map((item) => item.slot)).toEqual(['weapon', 'chest', 'leg']);
    expect(gloveStart.every((item) => item.rarity === 'common')).toBe(true);
    expect(gloveStart[0].id).not.toBe(bowStart[0].id);
    expect(gloveStart.slice(1).map((item) => item.id)).toEqual(bowStart.slice(1).map((item) => item.id));
  });

  it('provides a starting weapon for each mock character weapon choice', () => {
    for (const character of mockCatalog.characters) {
      expect(character.supportedWeaponTypes.length).toBeGreaterThan(0);
      expect(character.supportedWeaponTypes.length).toBeLessThanOrEqual(4);
      for (const type of character.supportedWeaponTypes) {
        expect(getStartingEquipment(mockCatalog, type)[0].weaponTypeId).toBe(type);
      }
    }
  });
});
