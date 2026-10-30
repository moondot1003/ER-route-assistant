import { weaponTypes, type WeaponTypeId } from '../domain/weaponTypes';

interface Props {
  supportedTypes: WeaponTypeId[];
  value: WeaponTypeId;
  onChange: (weaponTypeId: WeaponTypeId) => void;
}

export function WeaponTypeSelector({ supportedTypes, value, onChange }: Props) {
  return (
    <label className="field">
      <span className="field-label">출전 무기 유형</span>
      <select value={value} onChange={(event) => onChange(event.target.value as WeaponTypeId)}>
        {supportedTypes.map((typeId) => {
          const type = weaponTypes.find((weaponType) => weaponType.id === typeId);
          return <option key={typeId} value={typeId}>{type?.ko ?? typeId}</option>;
        })}
      </select>
    </label>
  );
}
