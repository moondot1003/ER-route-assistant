import { useEffect, useState } from 'react';
import { catalogRepository } from './data/catalogRepository';
import type { Catalog } from './domain/models';
import { getStartingEquipment } from './domain/startingEquipment';
import { weaponTypes, type WeaponTypeId } from './domain/weaponTypes';
import { CharacterSelector } from './components/CharacterSelector';
import { WeaponTypeSelector } from './components/WeaponTypeSelector';
import { StartingEquipmentPanel } from './components/StartingEquipmentPanel';

export default function App() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState('');
  const [selectedWeaponTypeId, setSelectedWeaponTypeId] = useState<WeaponTypeId | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    catalogRepository.loadCatalog().then((loaded) => {
      if (!active) return;
      const firstCharacter = loaded.characters[0];
      const firstWeapon = firstCharacter?.supportedWeaponTypes[0];
      if (!firstCharacter || !firstWeapon) throw new Error('선택 가능한 시연 캐릭터가 없습니다.');
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
  if (!character) return <main className="app-shell"><p role="alert" className="error">캐릭터를 찾을 수 없습니다.</p></main>;

  const selectedType = weaponTypes.find((type) => type.id === selectedWeaponTypeId);
  let startingEquipment;
  try {
    startingEquipment = getStartingEquipment(catalog, selectedWeaponTypeId);
  } catch (cause) {
    return <main className="app-shell"><p role="alert" className="error">{cause instanceof Error ? cause.message : '시작 장비를 찾을 수 없습니다.'}</p></main>;
  }

  function selectCharacter(characterId: string) {
    const nextCharacter = catalog?.characters.find((entry) => entry.id === characterId);
    if (!nextCharacter) return;
    setSelectedCharacterId(characterId);
    setSelectedWeaponTypeId(nextCharacter.supportedWeaponTypes[0] ?? null);
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div className="brand"><span className="brand-mark">ER</span><span>ER-route-assistant</span></div>
        <div className="hero-content">
          <span className="eyebrow">PHASE 1 · DATA FOUNDATION</span>
          <h1>루트의 시작을<br /><em>정확히 선택하세요.</em></h1>
          <p>캐릭터와 출전 무기 유형을 고르면 시작 장비를 확인할 수 있습니다.</p>
        </div>
      </header>

      <div className="disclaimer" role="note">
        <strong>목 데이터 시연</strong>
        <span>캐릭터, 아이템, 재료 수량, 지역 연결, 하이퍼루프 정보는 실제 게임 데이터가 아닙니다. 무기 유형 이름과 시작 장비 규칙은 제공된 프로젝트 요구사항을 따릅니다.</span>
      </div>

      <section className="panel selection-panel" aria-labelledby="selection-title">
        <div className="section-heading">
          <span className="eyebrow">01 / SELECT</span>
          <h2 id="selection-title">출전 설정</h2>
          <p>선택 가능한 무기 유형은 캐릭터마다 다릅니다.</p>
        </div>
        <div className="form-grid">
          <CharacterSelector characters={catalog.characters} value={selectedCharacterId} onChange={selectCharacter} />
          <WeaponTypeSelector supportedTypes={character.supportedWeaponTypes} value={selectedWeaponTypeId} onChange={setSelectedWeaponTypeId} />
        </div>
        <p className="selection-summary">{character.name} · {selectedType?.ko ?? selectedWeaponTypeId} 선택</p>
      </section>

      <StartingEquipmentPanel equipment={startingEquipment} />

      <footer>제작 계산과 루트 평가는 다음 개발 단계에서 추가됩니다.</footer>
    </main>
  );
}
