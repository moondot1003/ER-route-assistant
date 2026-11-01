import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { RouteRecommendationsPanel } from './RouteRecommendationsPanel';

const regions = [{ id: 'pond', name: '연못' }, { id: 'hospital', name: '병원' }];
const controls = { activeRoute: [] as string[], includeDroneRoutes: true, onIncludeDroneRoutesChange: () => {}, onSelectRoute: () => {} };

describe('route panel', () => {
  it('shows selection and no-result messages', () => {
    const empty = renderToStaticMarkup(createElement(RouteRecommendationsPanel, { recommendations: [], regions, hasSelection: false, ...controls }));
    expect(empty).toContain('장비를 선택하면');
    const noResult = renderToStaticMarkup(createElement(RouteRecommendationsPanel, { recommendations: [], regions, hasSelection: true, ...controls }));
    expect(noResult).toContain('조건에 맞는 루트가 없습니다');
  });

  it('shows rank, ordered areas, area count and drone material', () => {
    const html = renderToStaticMarkup(createElement(RouteRecommendationsPanel, {
      regions, hasSelection: true, ...controls, activeRoute: ['pond', 'hospital'], recommendations: [{
        orderedRegionIds: ['pond', 'hospital'], droneCalls: 1,
        droneMaterialId: 'sample-common:고철', droneMaterialName: '고철', earlyMaterialUnits: [3, 1],
      }],
    }));
    expect(html).toContain('04 / ROUTE');
    expect(html).toContain('연못 → 병원');
    expect(html).toContain('2지역 · 드론 1회 · 고철');
    expect(html).toContain('>1</span>');
    expect(html).toContain('route-row--active');
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain('드론 호출 포함');
    const reversed = renderToStaticMarkup(createElement(RouteRecommendationsPanel, {
      regions, hasSelection: true, ...controls, activeRoute: ['hospital', 'pond'], recommendations: [{
        orderedRegionIds: ['pond', 'hospital'], droneCalls: 1,
        droneMaterialId: 'sample-common:고철', droneMaterialName: '고철', earlyMaterialUnits: [3, 1],
      }],
    }));
    expect(reversed).not.toContain('route-row--active');
  });
});
