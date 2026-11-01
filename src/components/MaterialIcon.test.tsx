import { describe, expect, it } from 'vitest';
import { MaterialIcon } from './MaterialIcon';

describe('material tile context menu', () => {
  it('prevents the browser menu on the tile and forwards the material ID', () => {
    let prevented = false;
    let toggled = '';
    const icon = MaterialIcon({
      material: { itemId: 'sample-common:고철', name: '고철', quantity: 3,
        acquisition: 'container', unitsPerAcquisition: 2, droneUnitsPerCall: 2 },
      status: 'missing', onAdjustDrone: (id, delta) => { toggled = `${id}:${delta}`; },
    });
    icon.props.onContextMenu({ preventDefault: () => { prevented = true; } });
    expect(prevented).toBe(true);
    expect(toggled).toBe('sample-common:고철:1');
  });

  it('decrements designated units from a drone tile without rendering a drone badge', () => {
    let delta = 0;
    const icon = MaterialIcon({
      material: { itemId: 'scrap', name: '고철', quantity: 2,
        acquisition: 'container', unitsPerAcquisition: 2, droneUnitsPerCall: 2 },
      status: 'drone', requiredCalls: 1, plannedUnits: 2,
      onAdjustDrone: (_id, next) => { delta = next; },
    });
    icon.props.onContextMenu({ preventDefault: () => {} });
    expect(delta).toBe(-1);
    expect(icon.props.title).toContain('드론 지정 2개');
    expect(icon.props.title).toContain('드론 1회');
    expect(JSON.stringify(icon)).not.toContain('🚁');
  });
});
