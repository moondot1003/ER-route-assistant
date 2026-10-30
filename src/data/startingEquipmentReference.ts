import type { WeaponTypeId } from '../domain/weaponTypes';
import { commonItemId } from './regionLootSample';

/** Player-provided starting equipment reference, separate from recipes and loot. */
export const startingEquipmentReference = {
  source: 'player-requirement',
  commonWeaponByType: {
    glove: commonItemId('목장갑'),
    bow: commonItemId('양궁'),
    bat: commonItemId('단봉'),
  } satisfies Partial<Record<WeaponTypeId, string>>,
  shirtItemId: commonItemId('셔츠'),
  sneakersItemId: commonItemId('운동화'),
} as const;
