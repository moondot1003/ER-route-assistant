import { describe, expect, it } from 'vitest';
import { commonItemReferences } from './commonItemReferences';
import { craftingRecipes } from './craftingRecipes';
import { equipmentCatalog, equipmentSourcePages } from './equipmentCatalog';
import { fieldGatheringRules } from './fieldGatheringRules';
import { materialCatalog } from './materialCatalog';
import { materialRecipes } from './materialRecipes';
import { startingEquipmentReference } from './startingEquipmentReference';
import { unresolvedIngredientReferences } from './unresolvedIngredientReferences';

const itemById = new Map(equipmentCatalog.map((item) => [item.id, item]));
const materialById = new Map(materialCatalog.map((item) => [item.id, item]));
const recipeByResult = new Map([...craftingRecipes, ...materialRecipes].map((recipe) => [recipe.resultItemId, recipe]));
const knownReferenceIds = new Set([
  ...equipmentCatalog.map((item) => item.id),
  ...materialCatalog.map((item) => item.id),
  ...commonItemReferences.map((item) => item.id),
  ...fieldGatheringRules.map((rule) => rule.materialId),
  ...unresolvedIngredientReferences.map((item) => item.id),
]);

// Validation only: this never feeds the application or computes route requirements.
function countCommonUnits(itemId: string, quantity = 1, visiting = new Set<string>()): number | null {
  if (itemId.startsWith('unresolved:')) return null;
  const item = itemById.get(itemId) ?? materialById.get(itemId);
  if (!item) return knownReferenceIds.has(itemId) ? quantity : null;
  if (item.rarity === 'common') return quantity;
  if (visiting.has(itemId)) throw new Error(`순환 제작법: ${itemId}`);
  const recipe = recipeByResult.get(itemId);
  if (!recipe) return null;
  const craftCount = Math.ceil(quantity / recipe.outputQuantity);
  visiting.add(itemId);
  let total = 0;
  for (const ingredient of recipe.ingredients) {
    const amount = countCommonUnits(ingredient.itemId, ingredient.quantity * craftCount, visiting);
    if (amount === null) {
      visiting.delete(itemId);
      return null;
    }
    total += amount;
  }
  visiting.delete(itemId);
  return total;
}

describe('seven-page equipment extraction', () => {
  it('has unique IDs, supported slots and rarities, source pages, and visible stat text', () => {
    expect(equipmentCatalog).toHaveLength(153);
    expect(itemById.size).toBe(equipmentCatalog.length);
    for (const item of equipmentCatalog) {
      expect(['common', 'uncommon', 'rare', 'epic']).toContain(item.rarity);
      expect(['weapon', 'chest', 'head', 'arm', 'leg']).toContain(item.slot);
      expect(equipmentSourcePages[item.sourcePage]).toMatch(/^https:\/\/namu\.wiki\//);
      expect(item.visibleStatText.length).toBeGreaterThan(0);
      if (item.slot === 'weapon') expect(['glove', 'bow', 'bat']).toContain(item.weaponTypeId);
    }
    expect(equipmentCatalog.filter((item) => item.rarity === 'epic')).toHaveLength(84);
  });

  it('preserves direct recipes and resolves every ingredient to a named or flagged reference', () => {
    expect(craftingRecipes).toHaveLength(135);
    expect(materialRecipes).toHaveLength(18);
    expect(recipeByResult.size).toBe(craftingRecipes.length + materialRecipes.length);
    expect(unresolvedIngredientReferences).toHaveLength(0);
    for (const recipe of [...craftingRecipes, ...materialRecipes]) {
      expect(itemById.has(recipe.resultItemId) || materialById.has(recipe.resultItemId)).toBe(true);
      expect(recipe.ingredients).toHaveLength(2);
      expect(Number.isInteger(recipe.outputQuantity) && recipe.outputQuantity > 0).toBe(true);
      for (const ingredient of recipe.ingredients) {
        expect(knownReferenceIds.has(ingredient.itemId)).toBe(true);
        expect(ingredient.quantity).toBe(1);
      }
    }
    const incompleteDirectRecipes = equipmentCatalog
      .filter((item) => item.rarity !== 'common' && !recipeByResult.has(item.id));
    expect(incompleteDirectRecipes).toHaveLength(0);
    expect(itemById.get('wiki:bow:컴포지트 보우')?.validationStatus).toBe('needs-manual-review');
  });

  it('records material rarities and output quantities without excluded items', () => {
    expect(materialCatalog).toHaveLength(51);
    expect(new Set(materialCatalog.map((item) => item.id)).size).toBe(51);
    expect(materialCatalog.filter((item) => item.rarity === 'common')).toHaveLength(33);
    expect(materialCatalog.filter((item) => item.rarity === 'uncommon')).toHaveLength(16);
    expect(materialCatalog.filter((item) => item.rarity === 'rare')).toHaveLength(2);
    expect(materialCatalog.some((item) => ['진홍의 샤드', '새벽빛 샤드'].includes(item.name))).toBe(false);
    expect(materialRecipes.find((recipe) => recipe.resultItemId === 'material:유리 조각')?.outputQuantity).toBe(2);
    expect(materialRecipes.find((recipe) => recipe.resultItemId === 'material:황금')?.outputQuantity).toBe(2);
    const glassRecipe = materialRecipes.find((recipe) => recipe.resultItemId === 'material:유리 조각')!;
    const craftCount = Math.ceil(3 / glassRecipe.outputQuantity);
    expect(glassRecipe.ingredients.map((ingredient) => [ingredient.itemName, ingredient.quantity * craftCount])).toEqual([
      ['유리병', 2], ['돌멩이', 2],
    ]);
  });

  it('uses in-game confirmed recipes for Sosu and Composite Bow', () => {
    const sosu = craftingRecipes.find((recipe) => recipe.resultItemId === 'wiki:glove:소수')!;
    const compositeBow = craftingRecipes.find((recipe) => recipe.resultItemId === 'wiki:bow:컴포지트 보우')!;
    const glove = craftingRecipes.find((recipe) => recipe.resultItemId === 'wiki:glove:글러브')!;
    const woodBow = craftingRecipes.find((recipe) => recipe.resultItemId === 'wiki:bow:목궁')!;
    expect(sosu.ingredients.map((ingredient) => ingredient.itemId)).toEqual([
      'wiki:glove:글러브', 'material:유리 조각',
    ]);
    expect(compositeBow.ingredients.map((ingredient) => ingredient.itemId)).toEqual([
      'wiki:bow:목궁', 'sample-common:못',
    ]);
    expect(glove.ingredients.map((ingredient) => ingredient.itemId)).toEqual([
      'sample-common:목장갑', 'sample-common:고무',
    ]);
    expect(woodBow.ingredients.map((ingredient) => ingredient.itemId)).toEqual([
      'sample-common:양궁', 'sample-common:피아노선',
    ]);
    for (const recipe of [sosu, compositeBow]) {
      expect(recipe.verifiedRecipeSource).toBe('실제 게임 내 확인');
      expect(recipe.sourceDiscrepancy).toContain('나무위키');
    }
    expect(countCommonUnits(sosu.resultItemId)).toBe(4);
    expect(countCommonUnits(compositeBow.resultItemId)).toBe(3);
    expect(countCommonUnits('wiki:bow:트윈보우')).toBe(4);
    expect(materialRecipes.find((recipe) => recipe.resultItemId === 'material:유리 조각')?.outputQuantity).toBe(2);
    expect(startingEquipmentReference.commonWeaponByType).toEqual({
      glove: 'sample-common:목장갑',
      bow: 'sample-common:양궁',
      bat: 'sample-common:단봉',
    });
    expect(startingEquipmentReference.shirtItemId).toBe('sample-common:셔츠');
    expect(startingEquipmentReference.sneakersItemId).toBe('sample-common:운동화');
  });

  it('has no circular crafting paths and expands every Epic item to four Common units', () => {
    for (const item of equipmentCatalog) countCommonUnits(item.id);
    for (const item of materialCatalog) countCommonUnits(item.id);
    const epicResults = equipmentCatalog.filter((item) => item.rarity === 'epic')
      .map((item) => ({ name: item.name, units: countCommonUnits(item.id) }));
    expect(epicResults.filter((result) => result.units === 4)).toHaveLength(84);
    expect(epicResults.filter((result) => result.units === null)).toHaveLength(0);
    expect(epicResults.filter((result) => result.units !== null && result.units !== 4)).toHaveLength(0);
  });
});
