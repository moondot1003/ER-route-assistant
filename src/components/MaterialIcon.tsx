import type { PlanMaterial } from '../domain/materialPlan';

export type MaterialIconStatus = 'unassigned' | 'included' | 'missing' | 'drone';

interface Props {
  material: PlanMaterial;
  status: MaterialIconStatus;
  requiredCalls?: number;
  plannedUnits?: number;
}

const acquisitionLabel = { container: '상자 파밍', field: '직접 채집', unknown: '획득 방식 미확인' } as const;
const statusLabel = { unassigned: '루트 미선택', included: '루트 포함', missing: '루트 미포함', drone: '드론 호출 예정' } as const;

export function MaterialIcon({ material, status, requiredCalls, plannedUnits }: Props) {
  const label = `${material.name} ${material.quantity}개 · ${acquisitionLabel[material.acquisition]} · ${statusLabel[status]}`;
  const detail = status === 'drone' && requiredCalls !== undefined && plannedUnits !== undefined
    ? ` · 드론 ${requiredCalls}회, 획득 예정 ${plannedUnits}개` : '';
  return <li className={`material-icon material-icon--${status}`} title={label + detail} aria-label={label + detail}>
    <span className="material-icon-mark" aria-hidden="true">{Array.from(material.name).slice(0, 2).join('')}</span>
    {material.quantity > 1 && <span className="material-icon-quantity" aria-hidden="true">×{material.quantity}</span>}
    {status === 'drone' && <span className="material-icon-drone" aria-hidden="true">🚁</span>}
  </li>;
}
