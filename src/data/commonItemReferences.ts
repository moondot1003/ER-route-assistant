import type { EquipmentSlot } from '../domain/models';
import { equipmentCatalog, equipmentSourcePages } from './equipmentCatalog';
import { materialCatalog } from './materialCatalog';
import { regionLootSample, commonItemId, REGION_LOOT_SOURCE } from './regionLootSample';

export interface CommonItemReference {
  id: string;
  name: string;
  rarity: 'common';
  kind: 'equipment' | 'material' | 'unresolved';
  slot?: EquipmentSlot;
  validationStatus: 'equipment-page-extracted' | 'material-page-extracted' | 'player-confirmed' | 'provisional' | 'needs-equipment-source';
  source: typeof REGION_LOOT_SOURCE;
  classificationSource?: string;
}

// Only the starting items have an explicitly supplied equipment classification.
const confirmedEquipment: Partial<Record<string, EquipmentSlot>> = {
  '목장갑': 'weapon', '양궁': 'weapon', '단봉': 'weapon',
  '셔츠': 'chest', '운동화': 'leg',
};
const extractedCommonEquipment = new Map(
  equipmentCatalog.filter((item) => item.rarity === 'common').map((item) => [item.name, item]),
);
const extractedCommonMaterials = new Map(
  materialCatalog.filter((item) => item.rarity === 'common').map((item) => [item.name, item]),
);

// These names are treated as provisional material references for data linking.
// Their exact game classification still needs the equipment source documents.
const provisionalMaterials = new Set([
  '가위', '고무', '고철', '깃털', '덧댄 가죽', '라이터', '리본', '렌즈',
  '못', '배터리', '실', '오일', '옷감', '원석', '유리병',
  '종이', '피아노선', '플라스틱', '화약', '화학품', '흑연',
]);

const names = [...new Set(regionLootSample.flatMap((region) => region.items.map((item) => item.itemName)))].sort();

export const commonItemReferences: CommonItemReference[] = names.map((name) => {
  const extracted = extractedCommonEquipment.get(name);
  const extractedMaterial = extractedCommonMaterials.get(name);
  const slot = extracted?.slot ?? confirmedEquipment[name];
  return {
    id: commonItemId(name), name, rarity: 'common',
    kind: slot ? 'equipment' : extractedMaterial || provisionalMaterials.has(name) ? 'material' : 'unresolved',
    ...(slot ? { slot } : {}),
    validationStatus: extracted ? 'equipment-page-extracted' : extractedMaterial ? 'material-page-extracted' : slot ? 'player-confirmed' : provisionalMaterials.has(name) ? 'provisional' : 'needs-equipment-source',
    source: REGION_LOOT_SOURCE,
    ...(extracted ? { classificationSource: equipmentSourcePages[extracted.sourcePage] } : {}),
    ...(extractedMaterial ? { classificationSource: extractedMaterial.sourceUrl } : {}),
  };
});
