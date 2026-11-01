import { useEffect, useMemo, useState } from 'react';
import { catalogRepository } from './data/catalogRepository';
import { equipmentCatalog } from './data/equipmentCatalog';
import { acquisitionForBasicMaterial, calculateSelectedEquipmentMaterials } from './data/craftingRequirements';
import { selectEpicEquipment } from './domain/equipmentSelection';
import type { Catalog } from './domain/models';
import { weaponTypes, type WeaponTypeId } from './domain/weaponTypes';
import { CharacterSelector } from './components/CharacterSelector';
import { EquipmentSelectionPanel } from './components/EquipmentSelectionPanel';
import { CraftableEquipmentPanel } from './components/CraftableEquipmentPanel';
import { RequiredMaterialsPanel } from './components/RequiredMaterialsPanel';
import { LumiaMapPanel } from './components/LumiaMapPanel';
import { WeaponTypeSelector } from './components/WeaponTypeSelector';
import { adjustDroneQuantityInMaterialPlan, deriveMaterialTables, designateCandidateDroneMaterial, reconcileMaterialPlan, setMaterialPlanRoute } from './domain/materialPlan';
import { findCraftableEquipment } from './domain/craftableEquipment';
import type { EquipmentSlot } from './domain/models';
import { materialAvailabilityByRegion } from './data/materialAvailability';
import { regionLootSample } from './data/regionLootSample';
import { recommendRoutes } from './domain/routeRecommendations';
import { RouteRecommendationsPanel } from './components/RouteRecommendationsPanel';
import { mapRegions } from './data/regionMapPositions';
import { toggleRouteRegion } from './domain/activeRoute';
import { changeCharacterSelection, changeWeaponSelection, emptySelectionState, resetEquipmentSelection, resetSurvivorSelection } from './domain/selectionState';

const validRegionIds = new Set(regionLootSample.map((region) => region.id));

export default function App() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [selection, setSelection] = useState(emptySelectionState);
  const { characterId: selectedCharacterId, weaponTypeId: selectedWeaponTypeId, equipment: selectedEpicEquipment } = selection;
  const [activeRoute, setActiveRoute] = useState<string[]>([]);
  const [droneQuantities, setDroneQuantities] = useState<Record<string, number>>({});
  const [includeDroneRoutes, setIncludeDroneRoutes] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    catalogRepository.loadCatalog().then((loaded) => {
      if (!active) return;
      setCatalog(loaded);
    }).catch((cause: unknown) => {
      if (active) setError(cause instanceof Error ? cause.message : '데이터를 불러오지 못했습니다.');
    });
    return () => { active = false; };
  }, []);

  const { materials, materialError } = useMemo(() => {
    try {
      return { materials: calculateSelectedEquipmentMaterials(selectedEpicEquipment, selectedWeaponTypeId)
        .basicMaterials.map(acquisitionForBasicMaterial), materialError: '' };
    } catch (cause) {
      return { materials: [] as ReturnType<typeof acquisitionForBasicMaterial>[],
        materialError: cause instanceof Error ? cause.message : '알 수 없는 계산 오류' };
    }
  }, [selectedEpicEquipment, selectedWeaponTypeId]);
  const routeRegionIds = activeRoute.length > 0 ? activeRoute : null;
  const materialPlan = useMemo(() => reconcileMaterialPlan(
    { routeRegionIds, droneQuantities }, materials, materialAvailabilityByRegion,
  ), [routeRegionIds, droneQuantities, materials]);
  useEffect(() => {
    if (JSON.stringify(droneQuantities) !== JSON.stringify(materialPlan.droneQuantities)) {
      setDroneQuantities(materialPlan.droneQuantities);
    }
  }, [droneQuantities, materialPlan]);

  const craftable = useMemo(() => findCraftableEquipment(
    activeRoute, selectedWeaponTypeId, materialAvailabilityByRegion,
  ), [activeRoute, selectedWeaponTypeId]);

  if (error) return <main className="app-shell"><p role="alert" className="error">{error}</p></main>;
  if (!catalog) return <main className="app-shell"><p>시연 데이터를 불러오는 중…</p></main>;

  const character = catalog.characters.find((entry) => entry.id === selectedCharacterId);
  if (selectedCharacterId && !character) return <main className="app-shell"><p role="alert" className="error">실험체를 찾을 수 없습니다.</p></main>;

  const selectedType = weaponTypes.find((type) => type.id === selectedWeaponTypeId);
  const materialTables = deriveMaterialTables(materials, materialPlan, materialAvailabilityByRegion);
  const hasSelection = Object.values(selectedEpicEquipment).some(Boolean);
  let routeError = materialError;
  let recommendations: ReturnType<typeof recommendRoutes> = [];
  if (hasSelection && !routeError) {
    try {
      recommendations = recommendRoutes(materials, regionLootSample, materialAvailabilityByRegion, 20, includeDroneRoutes);
    } catch (cause) {
      routeError = cause instanceof Error ? cause.message : '알 수 없는 추천 오류';
    }
  }

  function selectCharacter(characterId: string) {
    if (characterId && !catalog?.characters.some((entry) => entry.id === characterId)) return;
    setSelection((current) => changeCharacterSelection(current, characterId));
  }

  function selectWeaponType(weaponTypeId: WeaponTypeId | null) {
    if (weaponTypeId !== null && !character?.supportedWeaponTypes.includes(weaponTypeId)) return;
    setSelection((current) => changeWeaponSelection(current, weaponTypeId));
  }

  function updateRoute(nextRoute: string[]) {
    setActiveRoute(nextRoute);
    setDroneQuantities((current) => setMaterialPlanRoute(
      { routeRegionIds, droneQuantities: current }, nextRoute.length > 0 ? nextRoute : null,
      materials, materialAvailabilityByRegion,
    ).droneQuantities);
  }

  function selectCraftable(slot: EquipmentSlot, itemId: string | null) {
    const nextEquipment = selectEpicEquipment(selectedEpicEquipment, slot, itemId, selectedWeaponTypeId, equipmentCatalog);
    setSelection((current) => ({ ...current, equipment: nextEquipment }));
    if (!itemId) return;
    const candidate = [...craftable[slot].oneDrone].find((entry) => entry.item.id === itemId);
    if (!candidate?.droneMaterial) return;
    const combined = calculateSelectedEquipmentMaterials(nextEquipment, selectedWeaponTypeId)
      .basicMaterials.map(acquisitionForBasicMaterial);
    setDroneQuantities((current) => designateCandidateDroneMaterial(
      { routeRegionIds, droneQuantities: current }, candidate.droneMaterial!.itemId,
      combined, materialAvailabilityByRegion,
    ).droneQuantities);
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <h1 className="brand"><span className="brand-mark">ER</span><span>ER-route-assistant</span></h1>
        <p className="hero-subtitle">아글라이아 연구노트 · 이터널 리턴 루트 메이커</p>
      </header>

      <div className="disclaimer" role="note">
        <strong>데이터 출처</strong>
        <span>실험체는 가상 데이터입니다. 장비 이름·등급은 수집 자료와 플레이어의 게임 내 확인 결과를 사용하며, 공식 API로 검증한 현재 패치 데이터는 아닙니다.</span>
      </div>

      <div className="workspace-grid">
        <div className="workspace-column">
          <section className="panel selection-panel" aria-labelledby="selection-title">
            <div className="section-heading section-heading-with-action">
              <div><span className="eyebrow">01 / SURVIVORS</span><h2 id="selection-title">실험체 및 무기 유형 선택</h2></div>
              <button className="reset-button" type="button" onClick={() => setSelection(resetSurvivorSelection())}>초기화</button>
            </div>
            <div className="form-grid">
              <CharacterSelector characters={catalog.characters} value={selectedCharacterId} onChange={selectCharacter} />
              <WeaponTypeSelector supportedTypes={character?.supportedWeaponTypes ?? []} value={selectedWeaponTypeId} onChange={selectWeaponType} />
            </div>
            <p className="selection-summary">{character ? `${character.name} · ${selectedType?.ko ?? '무기 유형 선택 안 함'}` : '실험체 선택 안 함'}</p>
          </section>

          <EquipmentSelectionPanel
            equipment={equipmentCatalog}
            weaponTypeId={selectedWeaponTypeId}
            selection={selectedEpicEquipment}
            onChange={(slot, itemId) => setSelection((current) => ({ ...current, equipment:
              selectEpicEquipment(current.equipment, slot, itemId, current.weaponTypeId, equipmentCatalog) }))}
            onReset={() => setSelection((current) => resetEquipmentSelection(current))}
          />

          <section className="panel placeholder-panel" aria-labelledby="build-ups-title">
            <div className="section-heading"><span className="eyebrow">05 / BUILD-UPS</span><h2 id="build-ups-title">전설 장비 교체 계획</h2></div>
          </section>
        </div>

        <div className="workspace-column">
          <LumiaMapPanel regions={mapRegions} activeRoute={activeRoute} onResetRoute={() => updateRoute([])}
            onToggleRegion={(regionId) => updateRoute(toggleRouteRegion(activeRoute, regionId, validRegionIds))}>
            <CraftableEquipmentPanel candidates={craftable} equipment={equipmentCatalog}
              selection={selectedEpicEquipment} weaponTypeId={selectedWeaponTypeId} hasRoute={activeRoute.length > 0}
              droneQuantities={materialPlan.droneQuantities}
              onChange={selectCraftable} onReset={() => setSelection((current) => resetEquipmentSelection(current))} />
          </LumiaMapPanel>

          <RequiredMaterialsPanel
            tables={materialTables}
            hasSelection={hasSelection}
            onAdjustDrone={(itemId, delta) => setDroneQuantities((current) => adjustDroneQuantityInMaterialPlan(
              { routeRegionIds, droneQuantities: current }, itemId, delta, materials, materialAvailabilityByRegion,
            ).droneQuantities)}
            error={materialError}
          />

          {activeRoute.length > 0 && materialTables.missing.length > 0 &&
            <p className="route-shortfall-note">현재 경로에 없는 재료는 부족으로 표시됩니다. 재료를 우클릭해 드론 배송을 지정할 수 있습니다.</p>}

          <RouteRecommendationsPanel recommendations={recommendations} regions={regionLootSample}
            hasSelection={hasSelection} activeRoute={activeRoute} includeDroneRoutes={includeDroneRoutes}
            onIncludeDroneRoutesChange={setIncludeDroneRoutes} onSelectRoute={updateRoute} error={routeError} />
        </div>
      </div>

      <footer>Eternal Return 및 관련 게임 자산의 권리는 님블뉴런 등 해당 권리자에게 있습니다. 본 앱은 비공식·비상업적 대학 과제이며 공식 제휴·승인 서비스가 아닙니다.</footer>
    </main>
  );
}
