import type { CraftableCandidates } from '../domain/craftableEquipment';
import { equipmentSlotLabels, equipmentSlots } from '../domain/equipmentSelection';
import type { Equipment, EquipmentSlot, EpicEquipmentSelection } from '../domain/models';
import type { WeaponTypeId } from '../domain/weaponTypes';
import { EquipmentDropdown } from './EquipmentDropdown';

interface Props {
  candidates: CraftableCandidates;
  equipment: readonly Equipment[];
  selection: EpicEquipmentSelection;
  weaponTypeId: WeaponTypeId | null;
  hasRoute: boolean;
  droneQuantities: Readonly<Record<string, number>>;
  onChange: (slot: EquipmentSlot, itemId: string | null) => void;
  onReset: () => void;
}

export function CraftableEquipmentPanel({ candidates, equipment, selection, weaponTypeId, hasRoute, droneQuantities, onChange, onReset }: Props) {
  return <section className="craftable-panel" aria-label="제작 가능 장비">
    <div className="craftable-heading"><h3>제작 가능 장비</h3><button type="button" className="reset-button" onClick={onReset}>초기화</button></div>
    {!hasRoute && <p className="craftable-note">경로를 선택하면 제작 가능 후보가 표시됩니다.</p>}
    <div className="craftable-fields">
      {equipmentSlots.map((slot) => {
        const selectedItem = equipment.find((item) => item.id === selection[slot]);
        const direct = candidates[slot].direct;
        const oneDrone = candidates[slot].oneDrone;
        const unavailable = !!selectedItem && hasRoute && ![...direct, ...oneDrone].some((candidate) => candidate.item.id === selectedItem.id);
        const conditional = oneDrone.find((candidate) => candidate.item.id === selectedItem?.id)?.droneMaterial;
        const warning = unavailable ? '현재 경로에서 제작 불가'
          : conditional && (droneQuantities[conditional.itemId] ?? 0) < conditional.quantity ? '드론 배송 필요' : undefined;
        return <EquipmentDropdown key={slot} label={equipmentSlotLabels[slot]} value={selection[slot]}
          selectedItem={selectedItem} unavailable={unavailable} warning={warning} disabled={slot === 'weapon' && weaponTypeId === null}
          direct={direct.map(({ item }) => ({ item }))}
          oneDrone={oneDrone.map(({ item, droneMaterial }) => ({ item, detail: droneMaterial?.name, muted: true }))}
          onChange={(itemId) => onChange(slot, itemId)} />;
      })}
    </div>
  </section>;
}
