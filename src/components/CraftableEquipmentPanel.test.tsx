import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { equipmentCatalog } from '../data/equipmentCatalog';
import { materialAvailabilityByRegion } from '../data/materialAvailability';
import { findCraftableEquipment } from '../domain/craftableEquipment';
import { emptyEpicEquipmentSelection } from '../domain/equipmentSelection';
import { CraftableEquipmentPanel } from './CraftableEquipmentPanel';

describe('craftable equipment panel', () => {
  it('renders five dropdowns, no-route prompt and disabled weapon without type', () => {
    const html = renderToStaticMarkup(createElement(CraftableEquipmentPanel, {
      candidates: findCraftableEquipment([], null, materialAvailabilityByRegion),
      equipment: equipmentCatalog, selection: emptyEpicEquipmentSelection(), weaponTypeId: null,
      hasRoute: false, droneQuantities: {}, onChange: () => {}, onReset: () => {},
    }));
    expect(html.match(/class="equipment-dropdown"/g)).toHaveLength(5);
    expect(html.match(/aria-disabled="true"/g)).toHaveLength(1);
    expect(html).toContain('경로를 선택하면');
    expect(html).toContain('초기화');
  });

  it('keeps a selected item visible and marks it unavailable after a route change', () => {
    const item = equipmentCatalog.find((entry) => entry.slot === 'chest' && entry.rarity === 'epic')!;
    const html = renderToStaticMarkup(createElement(CraftableEquipmentPanel, {
      candidates: findCraftableEquipment([], null, materialAvailabilityByRegion),
      equipment: equipmentCatalog, selection: { ...emptyEpicEquipmentSelection(), chest: item.id },
      weaponTypeId: null, hasRoute: true, droneQuantities: {}, onChange: () => {}, onReset: () => {},
    }));
    expect(html).toContain(item.name);
    expect(html).toContain('현재 경로에서 제작 불가');
    expect(html).toContain('rarity-epic');
  });

  it('lists direct items before dimmed one-drone items with the missing material name', () => {
    const chest = equipmentCatalog.filter((entry) => entry.slot === 'chest' && entry.rarity === 'epic');
    const candidates = findCraftableEquipment([], null, materialAvailabilityByRegion);
    candidates.chest.direct = [{ item: chest[0], droneMaterial: null }];
    candidates.chest.oneDrone = [{ item: chest[1], droneMaterial: { itemId: 'cloth', name: '옷감', quantity: 1 } }];
    const html = renderToStaticMarkup(createElement(CraftableEquipmentPanel, {
      candidates, equipment: equipmentCatalog, selection: emptyEpicEquipmentSelection(), weaponTypeId: null,
      hasRoute: true, droneQuantities: {}, onChange: () => {}, onReset: () => {},
    }));
    expect(html.indexOf(chest[0].name)).toBeLessThan(html.indexOf(chest[1].name));
    expect(html).toContain(`${chest[1].name}<span> [옷감]</span>`);
    expect(html).toContain('dropdown-option--muted');
    expect(html).not.toContain('영웅');
  });

  it('marks a selected conditional candidate until its drone quantity is designated', () => {
    const item = equipmentCatalog.find((entry) => entry.slot === 'chest' && entry.rarity === 'epic')!;
    const candidates = findCraftableEquipment([], null, materialAvailabilityByRegion);
    candidates.chest.oneDrone = [{ item, droneMaterial: { itemId: 'cloth', name: '옷감', quantity: 2 } }];
    const props = { candidates, equipment: equipmentCatalog,
      selection: { ...emptyEpicEquipmentSelection(), chest: item.id }, weaponTypeId: null,
      hasRoute: true, onChange: () => {}, onReset: () => {} };
    const needed = renderToStaticMarkup(createElement(CraftableEquipmentPanel, { ...props, droneQuantities: { cloth: 1 } }));
    const covered = renderToStaticMarkup(createElement(CraftableEquipmentPanel, { ...props, droneQuantities: { cloth: 2 } }));
    expect(needed).toContain('드론 배송 필요');
    expect(covered).not.toContain('드론 배송 필요');
  });
});
