import { LUMIA_ISLAND_MAP_IMAGE_PATH } from '../config/mapAssets';
import type { mapRegions } from '../data/regionMapPositions';

interface Props {
  regions: typeof mapRegions;
  activeRoute: readonly string[];
  onToggleRegion: (regionId: string) => void;
}

export function LumiaMapPanel({ regions, activeRoute, onToggleRegion }: Props) {
  return <section className="panel map-panel" aria-label="루미아 섬 지도">
    <div className="map-canvas">
      <img src={LUMIA_ISLAND_MAP_IMAGE_PATH} alt="루미아 섬 지역 선택 지도" />
      {regions.map((region) => {
        const index = activeRoute.indexOf(region.id);
        return <button key={region.id} type="button" className={`map-marker${index >= 0 ? ' map-marker--selected' : ''}`}
          style={{ left: `${region.xPercent}%`, top: `${region.yPercent}%` }}
          aria-label={`${region.name} ${index >= 0 ? `${index + 1}번째 방문, 클릭하여 제거` : '클릭하여 경로에 추가'}`}
          aria-pressed={index >= 0} onClick={() => onToggleRegion(region.id)}>
          {region.name} <span aria-hidden="true">{index >= 0 ? ['①', '②', '③'][index] ?? `${index + 1}` : '□'}</span>
        </button>;
      })}
    </div>
  </section>;
}
