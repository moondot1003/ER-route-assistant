import type { RouteRecommendation, RouteRegion } from '../domain/routeRecommendations';

interface Props {
  recommendations: readonly RouteRecommendation[];
  regions: readonly RouteRegion[];
  hasSelection: boolean;
  error?: string;
}

export function RouteRecommendationsPanel({ recommendations, regions, hasSelection, error }: Props) {
  const names = new Map(regions.map((region) => [region.id, region.name]));
  return <section className="panel route-panel" aria-labelledby="route-title">
    <div className="section-heading"><span className="eyebrow">04 / ROUTE</span><h2 id="route-title">추천 루트</h2></div>
    {error ? <p role="alert" className="materials-error">루트를 계산할 수 없습니다: {error}</p>
      : !hasSelection ? <p className="materials-empty">장비를 선택하면 추천 루트가 표시됩니다.</p>
        : recommendations.length === 0 ? <p className="materials-empty">조건에 맞는 루트가 없습니다.</p>
          : <ol className="route-list">
            {recommendations.slice(0, 10).map((route, index) => <li className="route-row" key={route.orderedRegionIds.join('|')}>
              <span className="route-rank">{index + 1}</span>
              <span className="route-areas">{route.orderedRegionIds.map((id) => names.get(id) ?? id).join(' → ')}</span>
              <span className="route-meta">{route.orderedRegionIds.length}지역 · 드론 {route.droneCalls}회{route.droneMaterialName ? ` · ${route.droneMaterialName}` : ''}</span>
            </li>)}
          </ol>}
    <p className="route-note">상자 지역은 고정 샘플, 채집 지역은 플레이어 제공 규칙입니다. 배치량·이동 시간은 반영하지 않습니다.</p>
  </section>;
}
