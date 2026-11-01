import type { Equipment, EpicEquipmentSelection, EquipmentSlot } from '../domain/models';
import type { WeaponTypeId } from '../domain/weaponTypes';
import { equipmentSlotLabels, equipmentSlots, epicEquipmentOptions } from '../domain/equipmentSelection';
import { EquipmentDropdown } from './EquipmentDropdown';

interface Props {
  equipment: Equipment[];
  weaponTypeId: WeaponTypeId | null;
  selection: EpicEquipmentSelection;
  onChange: (slot: EquipmentSlot, itemId: string | null) => void;
  onReset: () => void;
}

export function EquipmentSelectionPanel({ equipment, weaponTypeId, selection, onChange, onReset }: Props) {
  const selectedCount = equipmentSlots.filter((slot) => selection[slot] !== null).length;

  return (
    <section className="panel equipment-selection" aria-labelledby="equipment-selection-title">
      <div className="section-heading equipment-selection-heading">
        <div>
          <span className="eyebrow">02 / EQUIPMENTS</span>
          <h2 id="equipment-selection-title">최종 목표 장비</h2>
        </div>
        <div className="section-actions"><span className="selection-count">{selectedCount}/5 선택</span>
          <button className="reset-button" type="button" onClick={onReset}>초기화</button></div>
      </div>
      <div className="equipment-selection-grid">
        {equipmentSlots.map((slot) => {
          const selected = equipment.find((item) => item.id === selection[slot]);
          const options = epicEquipmentOptions(equipment, slot, weaponTypeId);
          return (
            <div className="equipment-selection-card" key={slot}>
              <EquipmentDropdown label={equipmentSlotLabels[slot]} value={selection[slot]} selectedItem={selected}
                disabled={slot === 'weapon' && weaponTypeId === null}
                direct={options.map((item) => ({ item }))} directLabel={null} onChange={(itemId) => onChange(slot, itemId)} />
              <div className="equipment-selection-value">
                {selected ? <span className={`rarity-${selected.rarity}`}>{selected.name}</span> : <span className="empty-value">비어 있음</span>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
