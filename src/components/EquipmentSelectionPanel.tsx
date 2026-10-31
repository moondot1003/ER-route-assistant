import type { Equipment, EpicEquipmentSelection, EquipmentSlot } from '../domain/models';
import type { WeaponTypeId } from '../domain/weaponTypes';
import { equipmentSlotLabels, equipmentSlots, epicEquipmentOptions } from '../domain/equipmentSelection';

interface Props {
  equipment: Equipment[];
  weaponTypeId: WeaponTypeId;
  selection: EpicEquipmentSelection;
  onChange: (slot: EquipmentSlot, itemId: string | null) => void;
}

export function EquipmentSelectionPanel({ equipment, weaponTypeId, selection, onChange }: Props) {
  const selectedCount = equipmentSlots.filter((slot) => selection[slot] !== null).length;

  return (
    <section className="panel equipment-selection" aria-labelledby="equipment-selection-title">
      <div className="section-heading equipment-selection-heading">
        <div>
          <span className="eyebrow">02 / EQUIPMENTS</span>
          <h2 id="equipment-selection-title">최종 목표 장비</h2>
        </div>
        <span className="selection-count">{selectedCount}/5 선택</span>
      </div>
      <div className="equipment-selection-grid">
        {equipmentSlots.map((slot) => {
          const selected = equipment.find((item) => item.id === selection[slot]);
          const options = epicEquipmentOptions(equipment, slot, weaponTypeId);
          return (
            <div className="equipment-selection-card" key={slot}>
              <label className="field">
                <span className="field-label">{equipmentSlotLabels[slot]}</span>
                <select value={selection[slot] ?? ''} onChange={(event) => onChange(slot, event.target.value || null)}>
                  <option value="">선택 안 함</option>
                  {options.map((item) => <option key={item.id} value={item.id}>{item.name} · 영웅</option>)}
                </select>
              </label>
              <div className="equipment-selection-value">
                {selected ? <><span>{selected.name}</span><strong>영웅</strong></> : <span className="empty-value">비어 있음</span>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
