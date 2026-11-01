import { weaponTypes, type WeaponTypeId } from '../domain/weaponTypes';

interface Props {
  supportedTypes: WeaponTypeId[];
  value: WeaponTypeId | null;
  onChange: (weaponTypeId: WeaponTypeId | null) => void;
}

export function WeaponTypeSelector({ supportedTypes, value, onChange }: Props) {
  return (
    <label className="field">
      <span className="field-label">출전 무기 유형</span>
      <select value={value ?? ''} disabled={supportedTypes.length === 0}
        onChange={(event) => onChange(event.target.value ? event.target.value as WeaponTypeId : null)}>
        <option value="">선택 안 함</option>
        {supportedTypes.map((typeId) => {
          const type = weaponTypes.find((weaponType) => weaponType.id === typeId);
          return <option key={typeId} value={typeId}>{type?.ko ?? typeId}</option>;
        })}
      </select>
    </label>
  );
}
