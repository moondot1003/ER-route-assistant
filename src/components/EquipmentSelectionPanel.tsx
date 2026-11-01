import type { Equipment, EpicEquipmentSelection, EquipmentSlot } from '../domain/models';
import type { WeaponTypeId } from '../domain/weaponTypes';
import { equipmentSlotLabels, equipmentSlots, epicEquipmentOptions } from '../domain/equipmentSelection';

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
              <label className="field">
                <span className="field-label">{equipmentSlotLabels[slot]}</span>
                <select value={selection[slot] ?? ''} disabled={slot === 'weapon' && weaponTypeId === null}
                  onChange={(event) => onChange(slot, event.target.value || null)}>
                  <option value="">{slot === 'weapon' && weaponTypeId === null ? '무기 유형 선택 필요' : '선택 안 함'}</option>
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
