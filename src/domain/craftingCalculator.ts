import type { CraftingRecipe, Rarity } from './models';

export interface CraftingItem {
  id: string;
  name: string;
  rarity: Rarity;
}

export interface ItemQuantity {
  itemId: string;
  quantity: number;
}

export interface BasicMaterialRequirement extends ItemQuantity {
  name: string;
}

export interface CraftingCalculation {
  basicMaterials: BasicMaterialRequirement[];
  // Surplus is kept visible for later calculations; it is never counted as a basic material.
  surplus: ItemQuantity[];
}

/** Expand all targets together so shared intermediate demand is crafted in one batch. */
export function calculateBasicMaterials(
  targets: readonly ItemQuantity[],
  items: readonly CraftingItem[],
  recipes: readonly CraftingRecipe[],
  startingInventory: readonly ItemQuantity[] = [],
): CraftingCalculation {
  const itemById = new Map(items.map((item) => [item.id, item]));
  const recipeByResult = new Map(recipes.map((recipe) => [recipe.resultItemId, recipe]));
  const demand = new Map<string, number>();
  const owned = new Map<string, number>();
  const state = new Map<string, 'visiting' | 'visited'>();
  const postorder: string[] = [];

  function addQuantity(map: Map<string, number>, { itemId, quantity }: ItemQuantity) {
    if (!Number.isSafeInteger(quantity) || quantity < 0) throw new Error(`잘못된 수량: ${itemId}`);
    if (!itemById.has(itemId)) throw new Error(`존재하지 않는 재료 ID: ${itemId}`);
    const total = (map.get(itemId) ?? 0) + quantity;
    if (!Number.isSafeInteger(total)) throw new Error(`수량 범위 초과: ${itemId}`);
    map.set(itemId, total);
  }

  for (const entry of startingInventory) addQuantity(owned, entry);
  for (const entry of targets) {
    if (entry.quantity > 0) addQuantity(demand, entry);
    else if (!Number.isSafeInteger(entry.quantity) || entry.quantity < 0) throw new Error(`잘못된 수량: ${entry.itemId}`);
  }

  function visit(itemId: string) {
    if (state.get(itemId) === 'visiting') throw new Error(`순환 제작법: ${itemId}`);
    if (state.get(itemId) === 'visited') return;
    const item = itemById.get(itemId);
    if (!item) throw new Error(`존재하지 않는 재료 ID: ${itemId}`);
    state.set(itemId, 'visiting');
    if (item.rarity !== 'common') {
      const recipe = recipeByResult.get(itemId);
      if (!recipe) throw new Error(`제작법 누락: ${item.name} (${itemId})`);
      if (!Number.isSafeInteger(recipe.outputQuantity) || recipe.outputQuantity < 1) {
        throw new Error(`잘못된 제작 결과 수량: ${itemId}`);
      }
      if (recipe.ingredients.length === 0) throw new Error(`제작 재료 누락: ${itemId}`);
      for (const ingredient of recipe.ingredients) {
        if (!Number.isSafeInteger(ingredient.quantity) || ingredient.quantity < 1) {
          throw new Error(`잘못된 제작 재료 수량: ${ingredient.itemId}`);
        }
        visit(ingredient.itemId);
      }
    }
    state.set(itemId, 'visited');
    postorder.push(itemId);
  }

  for (const itemId of demand.keys()) visit(itemId);

  const basicMaterials: BasicMaterialRequirement[] = [];
  const surplus: ItemQuantity[] = [];
  for (const itemId of postorder.reverse()) {
    const item = itemById.get(itemId)!;
    const requested = demand.get(itemId) ?? 0;
    const available = owned.get(itemId) ?? 0;
    const needed = Math.max(0, requested - available);
    if (item.rarity === 'common') {
      if (needed > 0) basicMaterials.push({ itemId, name: item.name, quantity: needed });
      continue;
    }
    if (needed === 0) continue;
    const recipe = recipeByResult.get(itemId)!;
    const crafts = Math.ceil(needed / recipe.outputQuantity);
    const leftover = crafts * recipe.outputQuantity - needed;
    if (leftover > 0) surplus.push({ itemId, quantity: leftover });
    for (const ingredient of recipe.ingredients) {
      addQuantity(demand, { itemId: ingredient.itemId, quantity: ingredient.quantity * crafts });
    }
  }
  basicMaterials.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  return { basicMaterials, surplus };
}
