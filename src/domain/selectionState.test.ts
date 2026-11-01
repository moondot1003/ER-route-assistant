import { describe, expect, it } from 'vitest';
import { emptyEpicEquipmentSelection } from './equipmentSelection';
import { changeCharacterSelection, changeWeaponSelection, emptySelectionState, resetEquipmentSelection, resetSurvivorSelection } from './selectionState';

const filled = {
  characterId: 'mock-character-a', weaponTypeId: 'glove' as const,
  equipment: { ...emptyEpicEquipmentSelection(), weapon: 'weapon', chest: 'chest' },
};

describe('selection resets', () => {
  it('starts without a survivor or weapon and resets all selection fields', () => {
    expect(emptySelectionState()).toEqual({ characterId: '', weaponTypeId: null, equipment: emptyEpicEquipmentSelection() });
    expect(resetSurvivorSelection()).toEqual(emptySelectionState());
    expect(changeCharacterSelection(filled, '')).toEqual(emptySelectionState());
  });

  it('clears only equipment for the equipment reset', () => {
    expect(resetEquipmentSelection(filled)).toEqual({
      characterId: filled.characterId, weaponTypeId: filled.weaponTypeId, equipment: emptyEpicEquipmentSelection(),
    });
  });

  it('resets equipment on real context changes and preserves it on duplicate selection', () => {
    expect(changeCharacterSelection(filled, filled.characterId)).toBe(filled);
    expect(changeWeaponSelection(filled, filled.weaponTypeId)).toBe(filled);
    expect(changeCharacterSelection(filled, 'mock-character-b')).toEqual({
      characterId: 'mock-character-b', weaponTypeId: null, equipment: emptyEpicEquipmentSelection(),
    });
    expect(changeWeaponSelection(filled, null).equipment).toEqual(emptyEpicEquipmentSelection());
  });
});
