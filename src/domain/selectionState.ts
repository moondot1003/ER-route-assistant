import { emptyEpicEquipmentSelection } from './equipmentSelection';
import type { EpicEquipmentSelection } from './models';
import type { WeaponTypeId } from './weaponTypes';

export interface SelectionState {
  characterId: string;
  weaponTypeId: WeaponTypeId | null;
  equipment: EpicEquipmentSelection;
}

export function emptySelectionState(): SelectionState {
  return { characterId: '', weaponTypeId: null, equipment: emptyEpicEquipmentSelection() };
}

export function resetSurvivorSelection(): SelectionState {
  return emptySelectionState();
}

export function resetEquipmentSelection(state: SelectionState): SelectionState {
  return { ...state, equipment: emptyEpicEquipmentSelection() };
}

export function changeCharacterSelection(state: SelectionState, characterId: string): SelectionState {
  return state.characterId === characterId ? state
    : { characterId, weaponTypeId: null, equipment: emptyEpicEquipmentSelection() };
}

export function changeWeaponSelection(state: SelectionState, weaponTypeId: WeaponTypeId | null): SelectionState {
  return state.weaponTypeId === weaponTypeId ? state
    : { ...state, weaponTypeId, equipment: emptyEpicEquipmentSelection() };
}
