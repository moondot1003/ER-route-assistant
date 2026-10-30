// App-local identifiers only. These are not official Eternal Return API codes.
export const weaponTypes = [
  { id: 'glove', en: 'Glove', ko: '글러브' },
  { id: 'tonfa', en: 'Tonfa', ko: '톤파' },
  { id: 'bat', en: 'Bat', ko: '방망이' },
  { id: 'hammer', en: 'Hammer', ko: '망치' },
  { id: 'whip', en: 'Whip', ko: '채찍' },
  { id: 'throw', en: 'Throw', ko: '투척' },
  { id: 'shuriken', en: 'Shuriken', ko: '암기' },
  { id: 'bow', en: 'Bow', ko: '활' },
  { id: 'crossbow', en: 'Crossbow', ko: '석궁' },
  { id: 'pistol', en: 'Pistol', ko: '권총' },
  { id: 'assault-rifle', en: 'Assault Rifle', ko: '돌격 소총' },
  { id: 'sniper-rifle', en: 'Sniper Rifle', ko: '저격총' },
  { id: 'axe', en: 'Axe', ko: '도끼' },
  { id: 'dagger', en: 'Dagger', ko: '단검' },
  { id: 'two-handed-sword', en: 'Two-Handed Sword', ko: '양손검' },
  { id: 'dual-swords', en: 'Dual Swords', ko: '쌍검' },
  { id: 'spear', en: 'Spear', ko: '창' },
  { id: 'nunchaku', en: 'Nunchaku', ko: '쌍절곤' },
  { id: 'rapier', en: 'Rapier', ko: '레이피어' },
  { id: 'guitar', en: 'Guitar', ko: '기타' },
  { id: 'camera', en: 'Camera', ko: '카메라' },
  { id: 'arcana', en: 'Arcana', ko: '아르카나' },
  { id: 'vf-prosthetic', en: 'VF Prosthetic', ko: 'VF의수' },
] as const;

export type WeaponTypeId = (typeof weaponTypes)[number]['id'];
