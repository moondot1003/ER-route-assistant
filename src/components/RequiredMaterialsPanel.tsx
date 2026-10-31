import type { MaterialTables } from '../domain/materialPlan';
import { MaterialIcon } from './MaterialIcon';

interface Props {
  tables: MaterialTables;
  hasSelection: boolean;
  error?: string;
}

export function RequiredMaterialsPanel({ tables, hasSelection, error }: Props) {
  return (
    <section className="panel required-materials" aria-labelledby="required-materials-title">
      <div className="section-heading">
        <span className="eyebrow">03 / MATERIALS</span>
        <h2 id="required-materials-title">필요 제작 재료</h2>
      </div>
      {error ? <p role="alert" className="materials-error">제작 재료를 계산할 수 없습니다: {error}</p>
        : !hasSelection ? <p className="materials-empty">장비를 선택하면 필요한 재료가 표시됩니다.</p>
          : <>
            <ul className="material-icons" aria-label="필요 제작 재료">
              {tables.unassigned.map((material) => <MaterialIcon key={material.itemId} material={material} status="unassigned" />)}
              {tables.included.map((material) => <MaterialIcon key={material.itemId} material={material} status="included" />)}
              {tables.missing.map((material) => <MaterialIcon key={material.itemId} material={material} status="missing" />)}
              {tables.drone.map((material) => <MaterialIcon key={material.itemId} material={material} status="drone"
                requiredCalls={material.requiredCalls} plannedUnits={material.plannedUnits} />)}
            </ul>
            <p className="material-notation">재료 아이콘 이미지 미제공 · 문자 표시는 임시입니다. 이름과 수량은 아이콘에 마우스를 올려 확인하세요.</p>
          </>}
    </section>
  );
}
