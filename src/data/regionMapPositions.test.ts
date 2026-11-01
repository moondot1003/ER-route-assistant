import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { LumiaMapPanel } from '../components/LumiaMapPanel';
import { mapRegions, regionMapPositions } from './regionMapPositions';
import { regionLootSample } from './regionLootSample';

describe('map marker positions', () => {
  it('covers exactly the 20 current loot region IDs with in-image percentages', () => {
    expect(mapRegions).toHaveLength(20);
    expect(Object.keys(regionMapPositions).sort()).toEqual(regionLootSample.map((region) => region.id).sort());
    expect(mapRegions.every((region) => region.xPercent > 0 && region.xPercent < 100 &&
      region.yPercent > 0 && region.yPercent < 100)).toBe(true);
    expect(mapRegions.some((region) => region.name === '연구소' || region.id === 'research-center')).toBe(false);
  });

  it('renders one button per region with route order and no research center', () => {
    const html = renderToStaticMarkup(createElement(LumiaMapPanel, {
      regions: mapRegions, activeRoute: ['pond', 'hospital', 'temple'], onToggleRegion: () => {},
    }));
    expect(html.match(/<button\b/g)).toHaveLength(20);
    expect(html).toContain('연못 1번째 방문');
    expect(html).toContain('병원 2번째 방문');
    expect(html).toContain('절 3번째 방문');
    expect(html).not.toContain('연구소');
  });
});
