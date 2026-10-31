import type { WeaponTypeId } from './weaponTypes';

export type DataSource = 'mock' | 'official-api';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic';
export type EquipmentSlot = 'weapon' | 'chest' | 'head' | 'arm' | 'leg';
export type EpicEquipmentSelection = Record<EquipmentSlot, string | null>;

export interface Character {
  id: string;
  name: string;
  supportedWeaponTypes: WeaponTypeId[];
}

export interface Equipment {
  id: string;
  name: string;
  rarity: Rarity;
  slot: EquipmentSlot;
  weaponTypeId?: WeaponTypeId;
  statBonuses?: Partial<Record<'attackPower' | 'attackSpeed' | 'defense' | 'hp' | 'cooldownReduction', number>>;
}

export interface ContainerMaterial {
  id: string;
  name: string;
  acquisition: 'container';
  unitsPerSuccessfulDrop: number;
}

export interface FieldMaterial {
  id: string;
  name: string;
  acquisition: 'field';
}

export type Material = ContainerMaterial | FieldMaterial;
export type CraftingIngredient = { itemId: string; quantity: number };

export interface CraftingRecipe {
  resultItemId: string;
  outputQuantity: number;
  ingredients: CraftingIngredient[];
}

export interface StartingInventoryDefinition {
  commonWeaponByType: Partial<Record<WeaponTypeId, string>>;
  shirtItemId: string;
  sneakersItemId: string;
}

export interface AreaMaterialAvailability {
  materialId: string;
  availableUnits: number | null;
}

export interface ContainerGroup {
  id: string;
  // null means that group-specific quantity has not been verified.
  materials: AreaMaterialAvailability[];
}

export interface LootArea {
  id: string;
  name: string;
  containerMaterials: AreaMaterialAvailability[];
  fieldMaterials: AreaMaterialAvailability[];
  containerGroups: ContainerGroup[];
  adjacentAreaIds: string[];
  hasHyperloop: boolean;
  destinationSpawnPoints?: [string, string, string, string];
}

export interface DroneDelivery {
  materialId: string;
  quantity: number;
  equipmentSlot?: EquipmentSlot;
}

export interface RouteSelection {
  characterId: string;
  weaponTypeId: WeaponTypeId;
  epicEquipmentIds: Record<EquipmentSlot, string>;
  orderedAreaIds: string[];
  droneDelivery?: DroneDelivery;
}

export interface Catalog {
  source: DataSource;
  characters: Character[];
  equipment: Equipment[];
  materials: Material[];
  recipes: CraftingRecipe[];
  startingInventory: StartingInventoryDefinition;
  areas: LootArea[];
}
