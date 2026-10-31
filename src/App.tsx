import { useEffect, useState } from 'react';
import { catalogRepository } from './data/catalogRepository';
import { equipmentCatalog } from './data/equipmentCatalog';
import { acquisitionForBasicMaterial, calculateSelectedEquipmentMaterials } from './data/craftingRequirements';
import { emptyEpicEquipmentSelection, resetEpicEquipmentOnContextChange, selectEpicEquipment } from './domain/equipmentSelection';
import type { Catalog, EpicEquipmentSelection } from './domain/models';
import { weaponTypes, type WeaponTypeId } from './domain/weaponTypes';
import { CharacterSelector } from './components/CharacterSelector';
import { EquipmentSelectionPanel } from './components/EquipmentSelectionPanel';
import { RequiredMaterialsPanel } from './components/RequiredMaterialsPanel';
import { LumiaMapPanel } from './components/LumiaMapPanel';
import { WeaponTypeSelector } from './components/WeaponTypeSelector';
import { emptyMaterialPlan, deriveMaterialTables } from './domain/materialPlan';
import { materialAvailabilityByRegion } from './data/materialAvailability';

const initialMaterialPlan = emptyMaterialPlan();

export default function App() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState('');
  const [selectedWeaponTypeId, setSelectedWeaponTypeId] = useState<WeaponTypeId | null>(null);
  const [selectedEpicEquipment, setSelectedEpicEquipment] = useState<EpicEquipmentSelection>(emptyEpicEquipmentSelection);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    catalogRepository.loadCatalog().then((loaded) => {
      if (!active) return;
      const firstCharacter = loaded.characters[0];
      const firstWeapon = firstCharacter?.supportedWeaponTypes[0];
      if (!firstCharacter || !firstWeapon) throw new Error('선택 가능한 시연 실험체가 없습니다.');
      setCatalog(loaded);
      setSelectedCharacterId(firstCharacter.id);
      setSelectedWeaponTypeId(firstWeapon);
    }).catch((cause: unknown) => {
      if (active) setError(cause instanceof Error ? cause.message : '데이터를 불러오지 못했습니다.');
    });
    return () => { active = false; };
  }, []);

  if (error) return <main className="app-shell"><p role="alert" className="error">{error}</p></main>;
  if (!catalog || !selectedWeaponTypeId) return <main className="app-shell"><p>시연 데이터를 불러오는 중…</p></main>;

  const character = catalog.characters.find((entry) => entry.id === selectedCharacterId);
  if (!character) return <main className="app-shell"><p role="alert" className="error">실험체를 찾을 수 없습니다.</p></main>;

  const selectedType = weaponTypes.find((type) => type.id === selectedWeaponTypeId);
  let materials = [] as ReturnType<typeof acquisitionForBasicMaterial>[];
  let materialError = '';
  try {
    materials = calculateSelectedEquipmentMaterials(selectedEpicEquipment, selectedWeaponTypeId)
      .basicMaterials.map(acquisitionForBasicMaterial);
  } catch (cause) {
    materialError = cause instanceof Error ? cause.message : '알 수 없는 계산 오류';
  }
  const materialTables = deriveMaterialTables(materials, initialMaterialPlan, materialAvailabilityByRegion);

  function selectCharacter(characterId: string) {
    const nextCharacter = catalog?.characters.find((entry) => entry.id === characterId);
    if (!nextCharacter || characterId === selectedCharacterId) return;
    const nextWeaponType = selectedWeaponTypeId && nextCharacter.supportedWeaponTypes.includes(selectedWeaponTypeId)
      ? selectedWeaponTypeId : nextCharacter.supportedWeaponTypes[0];
    setSelectedCharacterId(characterId);
    setSelectedWeaponTypeId(nextWeaponType ?? null);
    setSelectedEpicEquipment((current) => resetEpicEquipmentOnContextChange(current, selectedCharacterId, characterId));
  }

  function selectWeaponType(weaponTypeId: WeaponTypeId) {
    if (!character?.supportedWeaponTypes.includes(weaponTypeId) || weaponTypeId === selectedWeaponTypeId) return;
    setSelectedWeaponTypeId(weaponTypeId);
    setSelectedEpicEquipment((current) => resetEpicEquipmentOnContextChange(current, selectedWeaponTypeId, weaponTypeId));
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
            <div className="section-heading">
              <span className="eyebrow">01 / SURVIVORS</span>
              <h2 id="selection-title">실험체 및 무기 유형 선택</h2>
            </div>
            <div className="form-grid">
              <CharacterSelector characters={catalog.characters} value={selectedCharacterId} onChange={selectCharacter} />
              <WeaponTypeSelector supportedTypes={character.supportedWeaponTypes} value={selectedWeaponTypeId} onChange={selectWeaponType} />
            </div>
            <p className="selection-summary">{character.name} · {selectedType?.ko ?? selectedWeaponTypeId} 선택</p>
          </section>

          <EquipmentSelectionPanel
            equipment={equipmentCatalog}
            weaponTypeId={selectedWeaponTypeId}
            selection={selectedEpicEquipment}
            onChange={(slot, itemId) => setSelectedEpicEquipment((current) =>
              selectEpicEquipment(current, slot, itemId, selectedWeaponTypeId, equipmentCatalog))}
          />

          <section className="panel placeholder-panel" aria-labelledby="build-ups-title">
            <div className="section-heading"><span className="eyebrow">05 / BUILD-UPS</span><h2 id="build-ups-title">전설 장비 교체 계획</h2></div>
          </section>
        </div>

        <div className="workspace-column">
          <LumiaMapPanel />

          <RequiredMaterialsPanel
            tables={materialTables}
            hasSelection={Object.values(selectedEpicEquipment).some(Boolean)}
            error={materialError}
          />

          <section className="panel placeholder-panel" aria-labelledby="route-title">
            <div className="section-heading"><span className="eyebrow">04 / ROUTE</span><h2 id="route-title">루트 분석</h2></div>
          </section>
        </div>
      </div>

      <footer>지역 선택과 루트 분석은 준비 중입니다.</footer>
    </main>
  );
}
