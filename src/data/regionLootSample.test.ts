import { describe, expect, it } from 'vitest';
import { commonItemReferences } from './commonItemReferences';
import { fieldGatheringRules } from './fieldGatheringRules';
import { regionLootSample } from './regionLootSample';
import { startingEquipmentReference } from './startingEquipmentReference';

const excluded = new Set(['냉동 피자', '빵', '초콜릿', '구급상자']);
const fieldNames = new Set(['나뭇가지', '돌멩이', '꽃']);

describe('user-transcribed region loot sample', () => {
  it('contains exactly 20 uniquely identified regions and the 362 source-matched entries', () => {
    expect(regionLootSample).toHaveLength(20);
    expect(new Set(regionLootSample.map((region) => region.id)).size).toBe(20);
    expect(new Set(regionLootSample.map((region) => region.name))).toEqual(new Set([
      '항구', '창고', '연못', '개울', '모래사장', '고급 주택가', '골목길', '주유소', '호텔', '경찰서',
      '소방서', '병원', '절', '양궁장', '묘지', '숲', '공장', '성당', '학교', '바지선',
    ]));
    expect(regionLootSample.reduce((total, region) => total + region.items.length, 0)).toBe(362);
  });

  it('contains positive, unique, resolvable container entries and no excluded or field items', () => {
    const references = new Set(commonItemReferences.map((item) => item.id));
    for (const region of regionLootSample) {
      expect(new Set(region.items.map((item) => item.itemId)).size).toBe(region.items.length);
      for (const entry of region.items) {
        expect(Number.isInteger(entry.quantity) && entry.quantity > 0).toBe(true);
        expect(references.has(entry.itemId)).toBe(true);
        expect(excluded.has(entry.itemName)).toBe(false);
        expect(fieldNames.has(entry.itemName)).toBe(false);
      }
    }
  });

  it('preserves representative supplied region-wide quantities', () => {
    const quantity = (regionName: string, itemName: string) =>
      regionLootSample.find((region) => region.name === regionName)?.items.find((item) => item.itemName === itemName)?.quantity;
    expect(quantity('항구', '고철')).toBe(19);
    expect(quantity('주유소', '목장갑')).toBe(8);
    expect(quantity('절', '운동화')).toBe(10);
    expect(quantity('바지선', '렌즈')).toBe(8);
  });

  it('keeps the complete 20-region source-matched quantity snapshot unchanged', () => {
    const snapshot = regionLootSample
      .map((region) => `${region.id}|${region.items.map((item) => `${item.itemName}:${item.quantity}`).join('|')}`)
      .join('\n');
    let hash = 2166136261;
    for (let index = 0; index < snapshot.length; index += 1) {
      hash = Math.imul(hash ^ snapshot.charCodeAt(index), 16777619) >>> 0;
    }
    expect(hash.toString(16)).toBe('7dbd267a');
  });

  it('keeps field gathering and starting equipment separate from loot quantities', () => {
    const allIds = new Set(regionLootSample.map((region) => region.id));
    const [branch, stone, flower] = fieldGatheringRules;
    expect(branch.availableRegionIds).toHaveLength(20);
    expect(stone.availableRegionIds).toHaveLength(20);
    expect(new Set(flower.availableRegionIds)).toEqual(new Set(['pond', 'stream', 'uptown', 'temple', 'cemetery', 'forest']));
    for (const rule of fieldGatheringRules) {
      expect(rule.supplyForRouteFeasibility).toBe('unlimited');
      expect(rule.availableRegionIds.every((id) => allIds.has(id))).toBe(true);
    }
    const references = new Set(commonItemReferences.map((item) => item.id));
    expect(Object.values(startingEquipmentReference.commonWeaponByType).every((id) => references.has(id))).toBe(true);
    expect(references.has(startingEquipmentReference.shirtItemId)).toBe(true);
    expect(references.has(startingEquipmentReference.sneakersItemId)).toBe(true);
    expect(startingEquipmentReference.commonWeaponByType).toEqual({
      glove: 'sample-common:목장갑', bow: 'sample-common:양궁', bat: 'sample-common:단봉',
    });
    expect(startingEquipmentReference.shirtItemId).toBe('sample-common:셔츠');
    expect(startingEquipmentReference.sneakersItemId).toBe('sample-common:운동화');
  });
});
