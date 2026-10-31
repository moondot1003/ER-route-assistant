import { useEffect, useState } from 'react';
import { catalogRepository } from './data/catalogRepository';
import { equipmentCatalog } from './data/equipmentCatalog';
import { emptyEpicEquipmentSelection, resetEpicEquipmentOnContextChange, selectEpicEquipment } from './domain/equipmentSelection';
import type { Catalog, EpicEquipmentSelection } from './domain/models';
import { weaponTypes, type WeaponTypeId } from './domain/weaponTypes';
import { CharacterSelector } from './components/CharacterSelector';
import { EquipmentSelectionPanel } from './components/EquipmentSelectionPanel';
import { WeaponTypeSelector } from './components/WeaponTypeSelector';

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
        <div className="brand"><span className="brand-mark">ER</span><span>ER-route-assistant</span></div>
        <div className="hero-content">
          <h1>장비 구성</h1>
        </div>
      </header>

      <div className="disclaimer" role="note">
        <strong>데이터 출처</strong>
        <span>실험체는 가상 데이터입니다. 장비 이름·등급은 수집 자료와 플레이어의 게임 내 확인 결과를 사용하며, 공식 API로 검증한 현재 패치 데이터는 아닙니다.</span>
      </div>

      <section className="panel selection-panel" aria-labelledby="selection-title">
        <div className="section-heading">
          <span className="eyebrow">01 / TEST SUBJECT</span>
          <h2 id="selection-title">출전 설정</h2>
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

      <footer>제작 계산과 루트 평가는 다음 개발 단계에서 추가됩니다.</footer>
    </main>
  );
}
