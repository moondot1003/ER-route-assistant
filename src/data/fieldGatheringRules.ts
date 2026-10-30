import { regionLootSample } from './regionLootSample';

/** Player-provided route rules. No field quantity cap is inferred or stored. */
export interface FieldGatheringRule {
  materialId: string;
  materialName: string;
  availableRegionIds: string[];
  supplyForRouteFeasibility: 'unlimited';
  source: 'player-requirement';
}

const everyRegionId = regionLootSample.map((region) => region.id);

export const fieldGatheringRules: FieldGatheringRule[] = [
  { materialId: 'sample-field:나뭇가지', materialName: '나뭇가지', availableRegionIds: everyRegionId, supplyForRouteFeasibility: 'unlimited', source: 'player-requirement' },
  { materialId: 'sample-field:돌멩이', materialName: '돌멩이', availableRegionIds: everyRegionId, supplyForRouteFeasibility: 'unlimited', source: 'player-requirement' },
  { materialId: 'sample-field:꽃', materialName: '꽃', availableRegionIds: ['pond', 'stream', 'uptown', 'temple', 'cemetery', 'forest'], supplyForRouteFeasibility: 'unlimited', source: 'player-requirement' },
];
