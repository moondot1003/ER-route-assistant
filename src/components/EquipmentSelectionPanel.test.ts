import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { equipmentCatalog } from '../data/equipmentCatalog';
import { mockCatalog } from '../data/mockCatalog';
import { emptyEpicEquipmentSelection, epicEquipmentOptions } from '../domain/equipmentSelection';
import { CharacterSelector } from './CharacterSelector';
import { EquipmentSelectionPanel } from './EquipmentSelectionPanel';
import { WeaponTypeSelector } from './WeaponTypeSelector';

describe('equipment selection panel', () => {
  it('labels the existing character choices as test subjects', () => {
    const html = renderToStaticMarkup(createElement(CharacterSelector, {
      characters: mockCatalog.characters,
      value: mockCatalog.characters[0].id,
      onChange: () => {},
    }));
    expect(html).toContain('실험체');
    expect(html).toContain('시연 실험체 A');
    expect(html).toContain('시연 실험체 B');
    expect(html).not.toContain('캐릭터');
    const unselected = renderToStaticMarkup(createElement(CharacterSelector, {
      characters: mockCatalog.characters, value: '', onChange: () => {},
    }));
    expect(unselected).toContain('선택 안 함');
    const noWeapon = renderToStaticMarkup(createElement(WeaponTypeSelector, {
      supportedTypes: [], value: null, onChange: () => {},
    }));
    expect(noWeapon).toContain('disabled');
    expect(noWeapon).toContain('선택 안 함');
  });

  it('renders five labeled empty slots and only the active weapon type', () => {
    const html = renderToStaticMarkup(createElement(EquipmentSelectionPanel, {
      equipment: equipmentCatalog,
      weaponTypeId: 'glove',
      selection: emptyEpicEquipmentSelection(),
      onChange: () => {},
      onReset: () => {},
    }));
    expect(html.match(/class="equipment-dropdown"/g)).toHaveLength(5);
    expect(html).toContain('02 / EQUIPMENTS');
    expect(html).toContain('최종 목표 장비');
    expect(html).toContain('0/5 선택');
    expect(html).toContain('초기화');
    expect(html).not.toContain('장비 이름 검색');
    expect(html).not.toContain('type="search"');
    expect(html.match(/비어 있음/g)).toHaveLength(5);
    for (const label of ['무기', '옷', '머리', '팔/장식', '다리']) expect(html).toContain(label);
    expect(html).toContain(epicEquipmentOptions(equipmentCatalog, 'weapon', 'glove')[0].name);
    expect(html).not.toContain(epicEquipmentOptions(equipmentCatalog, 'weapon', 'bow')[0].name);
  });

  it('shows the selected item name with Epic color and no rarity prefix', () => {
    const chest = epicEquipmentOptions(equipmentCatalog, 'chest', 'glove')[0];
    const html = renderToStaticMarkup(createElement(EquipmentSelectionPanel, {
      equipment: equipmentCatalog,
      weaponTypeId: 'glove',
      selection: { ...emptyEpicEquipmentSelection(), chest: chest.id },
      onChange: () => {},
      onReset: () => {},
    }));
    expect(html).toContain('1/5 선택');
    expect(html).toContain(chest.name);
    expect(html).toContain('rarity-epic');
    expect(html).not.toContain('영웅');
    expect(html.match(/비어 있음/g)).toHaveLength(4);
  });

  it('disables only the weapon slot without a selected weapon type', () => {
    const html = renderToStaticMarkup(createElement(EquipmentSelectionPanel, {
      equipment: equipmentCatalog, weaponTypeId: null,
      selection: emptyEpicEquipmentSelection(), onChange: () => {}, onReset: () => {},
    }));
    expect(html.match(/aria-disabled="true"/g)).toHaveLength(1);
    expect(html).toContain('무기 유형 선택 필요');
    expect(html.match(/class="equipment-dropdown"/g)).toHaveLength(5);
  });
});
