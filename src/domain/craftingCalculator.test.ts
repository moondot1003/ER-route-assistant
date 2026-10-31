import { describe, expect, it } from 'vitest';
import { calculateBasicMaterials, type CraftingItem } from './craftingCalculator';
import type { CraftingRecipe } from './models';

// Fictional test graph only; these IDs and recipes are not game data.
const items: CraftingItem[] = [
  { id: 'a', name: '재료 A', rarity: 'common' },
  { id: 'b', name: '재료 B', rarity: 'common' },
  { id: 'shared', name: '공통 중간물', rarity: 'uncommon' },
  { id: 'one', name: '목표 1', rarity: 'epic' },
  { id: 'two', name: '목표 2', rarity: 'epic' },
];
const recipes: CraftingRecipe[] = [
  { resultItemId: 'shared', outputQuantity: 2, ingredients: [{ itemId: 'a', quantity: 1 }] },
  { resultItemId: 'one', outputQuantity: 1, ingredients: [{ itemId: 'shared', quantity: 1 }, { itemId: 'b', quantity: 1 }] },
  { resultItemId: 'two', outputQuantity: 1, ingredients: [{ itemId: 'shared', quantity: 1 }, { itemId: 'b', quantity: 1 }] },
];

describe('basic material calculator', () => {
  it('calculates one target and deducts only applicable starting stock', () => {
    const result = calculateBasicMaterials([{ itemId: 'one', quantity: 1 }], items, recipes, [
      { itemId: 'a', quantity: 1 }, { itemId: 'b', quantity: 2 },
    ]);
    expect(result.basicMaterials).toEqual([]);
    expect(result.surplus).toEqual([{ itemId: 'shared', quantity: 1 }]);
  });

  it('combines shared intermediates before crafting and consumes starting stock once', () => {
    const result = calculateBasicMaterials([
      { itemId: 'one', quantity: 1 }, { itemId: 'two', quantity: 1 },
    ], items, recipes, [{ itemId: 'b', quantity: 1 }]);
    expect(result.basicMaterials).toEqual([
      { itemId: 'a', name: '재료 A', quantity: 1 },
      { itemId: 'b', name: '재료 B', quantity: 1 },
    ]);
    expect(result.surplus).toEqual([]);
  });

  it('uses the ceiling of demand divided by recipe output and tracks leftovers', () => {
    const result = calculateBasicMaterials([{ itemId: 'shared', quantity: 3 }], items, recipes);
    expect(result.basicMaterials).toEqual([{ itemId: 'a', name: '재료 A', quantity: 2 }]);
    expect(result.surplus).toEqual([{ itemId: 'shared', quantity: 1 }]);
  });

  it('responds to changed or cleared targets', () => {
    expect(calculateBasicMaterials([{ itemId: 'one', quantity: 1 }], items, recipes).basicMaterials)
      .toEqual([{ itemId: 'a', name: '재료 A', quantity: 1 }, { itemId: 'b', name: '재료 B', quantity: 1 }]);
    expect(calculateBasicMaterials([{ itemId: 'two', quantity: 1 }], items, recipes).basicMaterials).toHaveLength(2);
    expect(calculateBasicMaterials([], items, recipes).basicMaterials).toEqual([]);
  });

  it('reports missing recipes, unknown IDs, and cycles', () => {
    expect(() => calculateBasicMaterials([{ itemId: 'one', quantity: 1 }], items, recipes.filter((recipe) => recipe.resultItemId !== 'shared')))
      .toThrow(/제작법 누락/);
    expect(() => calculateBasicMaterials([{ itemId: 'one', quantity: 1 }], items, [
      { resultItemId: 'one', outputQuantity: 1, ingredients: [{ itemId: 'missing', quantity: 1 }] },
    ])).toThrow(/존재하지 않는 재료 ID/);
    expect(() => calculateBasicMaterials([{ itemId: 'one', quantity: 1 }], items, [
      { resultItemId: 'one', outputQuantity: 1, ingredients: [{ itemId: 'shared', quantity: 1 }] },
      { resultItemId: 'shared', outputQuantity: 1, ingredients: [{ itemId: 'one', quantity: 1 }] },
    ])).toThrow(/순환 제작법/);
  });
});
