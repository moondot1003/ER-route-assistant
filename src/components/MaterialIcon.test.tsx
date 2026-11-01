import { describe, expect, it } from 'vitest';
import { MaterialIcon } from './MaterialIcon';

describe('material tile context menu', () => {
  it('prevents the browser menu on the tile and forwards the material ID', () => {
    let prevented = false;
    let toggled = '';
    const icon = MaterialIcon({
      material: { itemId: 'sample-common:고철', name: '고철', quantity: 3,
        acquisition: 'container', unitsPerAcquisition: 2, droneUnitsPerCall: 2 },
      status: 'missing', onToggleDrone: (id) => { toggled = id; },
    });
    icon.props.onContextMenu({ preventDefault: () => { prevented = true; } });
    expect(prevented).toBe(true);
    expect(toggled).toBe('sample-common:고철');
  });
});
