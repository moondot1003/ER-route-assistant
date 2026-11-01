import { droneDesignationBlockReason, type PlanMaterial } from '../domain/materialPlan';

export type MaterialIconStatus = 'unassigned' | 'included' | 'missing' | 'drone';

interface Props {
  material: PlanMaterial;
  status: MaterialIconStatus;
  requiredCalls?: number;
  plannedUnits?: number;
  onAdjustDrone: (itemId: string, delta: 1 | -1) => void;
}

const acquisitionLabel = { container: '상자 파밍', field: '직접 채집', unknown: '획득 방식 미확인' } as const;
const statusLabel = { unassigned: '루트 미선택', included: '루트 포함', missing: '루트 미포함', drone: '드론 호출 예정' } as const;

export function MaterialIcon({ material, status, requiredCalls, plannedUnits, onAdjustDrone }: Props) {
  const label = `${material.name} ${material.quantity}개 · ${acquisitionLabel[material.acquisition]} · ${statusLabel[status]}`;
  const detail = status === 'drone' && requiredCalls !== undefined && plannedUnits !== undefined
    ? ` · 드론 지정 ${material.quantity}개, 호출당 ${material.droneUnitsPerCall}개, 드론 ${requiredCalls}회, 획득 예정 ${plannedUnits}개` : '';
  const unavailable = status === 'included' ? '경로에서 직접 획득 가능하여 드론 지정 불가'
    : droneDesignationBlockReason(material);
  const tooltip = label + detail + (unavailable ? ` · ${unavailable}` : ' · 우클릭으로 드론 지정/취소');
  return <li className={`material-icon material-icon--${status}`} title={tooltip} aria-label={tooltip}
    onContextMenu={(event) => { event.preventDefault(); onAdjustDrone(material.itemId, status === 'drone' ? -1 : 1); }}>
    <span className="material-icon-mark" aria-hidden="true">{Array.from(material.name).slice(0, 2).join('')}</span>
    {material.quantity > 1 && <span className="material-icon-quantity" aria-hidden="true">×{material.quantity}</span>}
  </li>;
}
