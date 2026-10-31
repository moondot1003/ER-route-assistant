import type { Catalog, ContainerGroup } from '../domain/models';

// Every value below is for a fictional demonstration. No area, item, or character
// identifier here is an Eternal Return API identifier.
const groups = (area: string, quantities: Array<[number, number]>): ContainerGroup[] =>
  quantities.map(([scrap, fabric], index) => ({
    id: `${area}-group-${index + 1}`,
    materials: [
      { materialId: 'mock-scrap', availableUnits: scrap },
      { materialId: 'mock-fabric', availableUnits: fabric },
    ],
  }));

export const mockCatalog: Catalog = {
  source: 'mock',
  characters: [
    { id: 'mock-character-a', name: '시연 실험체 A', supportedWeaponTypes: ['glove', 'bow'] },
    { id: 'mock-character-b', name: '시연 실험체 B', supportedWeaponTypes: ['bat'] },
  ],
  equipment: [
    { id: 'mock-common-glove', name: '시연용 글러브', rarity: 'common', slot: 'weapon', weaponTypeId: 'glove' },
    { id: 'mock-common-bow', name: '시연용 활', rarity: 'common', slot: 'weapon', weaponTypeId: 'bow' },
    { id: 'mock-common-bat', name: '시연용 방망이', rarity: 'common', slot: 'weapon', weaponTypeId: 'bat' },
    { id: 'mock-shirt', name: 'Shirt (시연용)', rarity: 'common', slot: 'chest' },
    { id: 'mock-sneakers', name: 'Sneakers (시연용)', rarity: 'common', slot: 'leg' },
  ],
  materials: [
    { id: 'mock-scrap', name: '고철 (시연용)', acquisition: 'container', unitsPerSuccessfulDrop: 2 },
    { id: 'mock-fabric', name: '시연용 천', acquisition: 'container', unitsPerSuccessfulDrop: 1 },
    { id: 'mock-branch', name: '나뭇가지 (시연용)', acquisition: 'field' },
    { id: 'mock-stone', name: '돌멩이 (시연용)', acquisition: 'field' },
    { id: 'mock-flower', name: '꽃 (시연용)', acquisition: 'field' },
  ],
  // Phase 1 defines recipe types only. Recipe contents will be added with crafting UI.
  recipes: [],
  startingInventory: {
    commonWeaponByType: {
      glove: 'mock-common-glove',
      bow: 'mock-common-bow',
      bat: 'mock-common-bat',
    },
    shirtItemId: 'mock-shirt',
    sneakersItemId: 'mock-sneakers',
  },
  areas: [
    {
      id: 'mock-area-a', name: '가상 시연 구역 A',
      containerMaterials: [
        { materialId: 'mock-scrap', availableUnits: 8 },
        { materialId: 'mock-fabric', availableUnits: 6 },
      ],
      fieldMaterials: [
        { materialId: 'mock-branch', availableUnits: 4 },
        { materialId: 'mock-stone', availableUnits: 4 },
      ],
      containerGroups: groups('mock-area-a', [[2, 1], [2, 2], [2, 1], [2, 2]]),
      adjacentAreaIds: ['mock-area-b'],
      hasHyperloop: true,
    },
    {
      id: 'mock-area-b', name: '가상 시연 구역 B',
      containerMaterials: [
        { materialId: 'mock-scrap', availableUnits: 8 },
        { materialId: 'mock-fabric', availableUnits: 4 },
      ],
      fieldMaterials: [
        { materialId: 'mock-branch', availableUnits: 4 },
        { materialId: 'mock-stone', availableUnits: 4 },
      ],
      containerGroups: groups('mock-area-b', [[2, 1], [2, 1], [2, 1], [2, 1]]),
      adjacentAreaIds: ['mock-area-a', 'mock-area-c'],
      hasHyperloop: false,
    },
    {
      id: 'mock-area-c', name: '가상 시연 구역 C',
      containerMaterials: [
        { materialId: 'mock-scrap', availableUnits: 8 },
        { materialId: 'mock-fabric', availableUnits: 4 },
      ],
      fieldMaterials: [
        { materialId: 'mock-branch', availableUnits: 4 },
        { materialId: 'mock-stone', availableUnits: 4 },
        { materialId: 'mock-flower', availableUnits: 2 },
      ],
      containerGroups: groups('mock-area-c', [[2, 1], [2, 1], [2, 1], [2, 1]]),
      adjacentAreaIds: ['mock-area-b'],
      hasHyperloop: false,
    },
  ],
};
