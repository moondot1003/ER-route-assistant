import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { RouteRecommendationsPanel } from './RouteRecommendationsPanel';

const regions = [{ id: 'pond', name: '연못' }, { id: 'hospital', name: '병원' }];

describe('route panel', () => {
  it('shows selection and no-result messages', () => {
    const empty = renderToStaticMarkup(createElement(RouteRecommendationsPanel, { recommendations: [], regions, hasSelection: false }));
    expect(empty).toContain('장비를 선택하면');
    const noResult = renderToStaticMarkup(createElement(RouteRecommendationsPanel, { recommendations: [], regions, hasSelection: true }));
    expect(noResult).toContain('조건에 맞는 루트가 없습니다');
  });

  it('shows rank, ordered areas, area count and drone material', () => {
    const html = renderToStaticMarkup(createElement(RouteRecommendationsPanel, {
      regions, hasSelection: true, recommendations: [{
        orderedRegionIds: ['pond', 'hospital'], droneCalls: 1,
        droneMaterialId: 'sample-common:고철', droneMaterialName: '고철', earlyMaterialUnits: [3, 1],
      }],
    }));
    expect(html).toContain('04 / ROUTE');
    expect(html).toContain('연못 → 병원');
    expect(html).toContain('2지역 · 드론 1회 · 고철');
    expect(html).toContain('>1</span>');
  });
});
