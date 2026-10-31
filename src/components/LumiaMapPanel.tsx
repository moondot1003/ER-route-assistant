import { LUMIA_ISLAND_MAP_IMAGE_PATH } from '../config/mapAssets';

export function LumiaMapPanel() {
  return <section className="panel map-panel" aria-label="루미아 섬 지도">
    <img src={LUMIA_ISLAND_MAP_IMAGE_PATH} alt="루미아 섬 지도. 지역 선택 기능은 준비 중입니다." />
  </section>;
}
