import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import type { MaterialTables } from '../domain/materialPlan';
import { RequiredMaterialsPanel } from './RequiredMaterialsPanel';

const basic = { acquisition: 'container' as const, unitsPerAcquisition: 1, droneUnitsPerCall: 1 };
const emptyTables = (): MaterialTables => ({ included: [], missing: [], drone: [], surplus: [], unassigned: [] });

describe('required materials panel', () => {
  it('keeps the empty prompt and shows compact quantities and tooltip details', () => {
    const empty = renderToStaticMarkup(createElement(RequiredMaterialsPanel, { tables: emptyTables(), hasSelection: false, onAdjustDrone: () => {} }));
    expect(empty).toContain('03 / MATERIALS');
    expect(empty).toContain('장비를 선택하면');
    const tables = emptyTables();
    tables.unassigned = [
      { ...basic, itemId: 'a', name: '고무', quantity: 1 },
      { ...basic, itemId: 'b', name: '고철', quantity: 3 },
      { itemId: 'c', name: '꽃', quantity: 1, acquisition: 'field', unitsPerAcquisition: 2, droneUnitsPerCall: 2 },
    ];
    const html = renderToStaticMarkup(createElement(RequiredMaterialsPanel, { tables, hasSelection: true, onAdjustDrone: () => {} }));
    expect(html).toContain('title="고무 1개 · 상자 파밍 · 루트 미선택');
    expect(html).toContain('title="꽃 1개 · 직접 채집 · 루트 미선택');
    expect(html).toContain('×3');
    expect(html).not.toContain('×1');
    expect(html).toContain('문자 표시는 임시');
    expect(html).toContain('재료를 우클릭하면 드론 배송을 지정하거나 취소할 수 있습니다.');
  });

  it('renders missing and drone borders, with drone quantities at the end', () => {
    const tables = emptyTables();
    tables.included = [{ ...basic, itemId: 'a', name: '고무', quantity: 1 }];
    tables.missing = [{ ...basic, itemId: 'b', name: '라이터', quantity: 1 }];
    tables.drone = [{ ...basic, itemId: 'c', name: '못', quantity: 2, requiredCalls: 2, plannedUnits: 2 }];
    const html = renderToStaticMarkup(createElement(RequiredMaterialsPanel, { tables, hasSelection: true, onAdjustDrone: () => {} }));
    expect(html).toContain('material-icon--included');
    expect(html).toContain('material-icon--missing');
    expect(html).toContain('material-icon--drone');
    expect(html).not.toContain('🚁');
    expect(html).toContain('드론 지정 2개');
    expect(html).toContain('호출당 1개, 드론 2회, 획득 예정 2개');
    expect(html.indexOf('material-icon--drone')).toBeGreaterThan(html.indexOf('material-icon--missing'));
  });

  it('shows why a material cannot be designated for drone delivery', () => {
    const tables = emptyTables();
    tables.unassigned = [{ ...basic, itemId: 'a', name: '미확인', quantity: 1,
      acquisition: 'unknown', droneUnitsPerCall: null }];
    const html = renderToStaticMarkup(createElement(RequiredMaterialsPanel, { tables, hasSelection: true, onAdjustDrone: () => {} }));
    expect(html).toContain('드론 1회 획득 수량이 확인되지 않았습니다.');
  });
});
