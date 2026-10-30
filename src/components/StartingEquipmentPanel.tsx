import type { Equipment } from '../domain/models';

const slotLabels: Record<'weapon' | 'chest' | 'leg', string> = {
  weapon: '무기', chest: '옷', leg: '다리',
};

interface Props { equipment: Equipment[] }

export function StartingEquipmentPanel({ equipment }: Props) {
  return (
    <section className="panel" aria-labelledby="starting-title">
      <div className="section-heading">
        <span className="eyebrow">STARTING INVENTORY</span>
        <h2 id="starting-title">시작 장비</h2>
        <p>선택한 무기 유형에 따라 Common 무기가 바뀝니다. 머리와 팔/장식은 비어 있습니다.</p>
      </div>
      <div className="equipment-grid">
        {equipment.map((item) => (
          <div className="equipment-card" key={item.id}>
            <span className="equipment-slot">{slotLabels[item.slot as keyof typeof slotLabels]}</span>
            <strong>{item.name}</strong>
            <span className="rarity">COMMON · 시작 시 보유</span>
          </div>
        ))}
        <div className="equipment-card empty"><span className="equipment-slot">머리</span><strong>비어 있음</strong></div>
        <div className="equipment-card empty"><span className="equipment-slot">팔/장식</span><strong>비어 있음</strong></div>
      </div>
    </section>
  );
}
