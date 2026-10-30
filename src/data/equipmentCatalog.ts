import type { EquipmentSlot, Rarity } from '../domain/models';
import type { WeaponTypeId } from '../domain/weaponTypes';

/** Factual item fields extracted from the seven specified NamuWiki pages.
 * IDs are local references, not official API codes. Visible stats remain source text.
 */
export interface ExtractedEquipment {
  id: string;
  name: string;
  rarity: Rarity;
  slot: EquipmentSlot;
  weaponTypeId?: WeaponTypeId;
  visibleStatText: string[];
  sourcePage: keyof typeof equipmentSourcePages;
  validationStatus: 'source-extracted' | 'needs-manual-review';
}

export const equipmentSourcePages = {
  "chest": "https://namu.wiki/w/이터널%20리턴/아이템/장비/옷",
  "head": "https://namu.wiki/w/이터널%20리턴/아이템/장비/머리",
  "arm": "https://namu.wiki/w/이터널%20리턴/아이템/장비/팔·장식",
  "legs": "https://namu.wiki/w/이터널%20리턴/아이템/장비/다리",
  "glove": "https://namu.wiki/w/이터널%20리턴/아이템/장비/글러브",
  "bow": "https://namu.wiki/w/이터널%20리턴/아이템/장비/활",
  "bat": "https://namu.wiki/w/이터널%20리턴/아이템/장비/방망이"
} as const;

export const equipmentCatalog: ExtractedEquipment[] = [
  {
    "id": "sample-common:셔츠",
    "name": "셔츠",
    "rarity": "common",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +9"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:승복",
    "name": "승복",
    "rarity": "common",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +9"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:전신 수영복",
    "name": "전신 수영복",
    "rarity": "common",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +9"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:바람막이",
    "name": "바람막이",
    "rarity": "common",
    "slot": "chest",
    "visibleStatText": [
      "공격력 +4",
      "방어력 +3"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:가죽 갑옷",
    "name": "가죽 갑옷",
    "rarity": "uncommon",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +16"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:군복",
    "name": "군복",
    "rarity": "uncommon",
    "slot": "chest",
    "visibleStatText": [
      "공격력 +4",
      "방어력 +12"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:덧댄 로브",
    "name": "덧댄 로브",
    "rarity": "uncommon",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +11",
      "스킬 증폭 +10",
      "쿨다운 감소 +5"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:드레스",
    "name": "드레스",
    "rarity": "uncommon",
    "slot": "chest",
    "visibleStatText": [
      "공격력 +3",
      "방어력 +10"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:사제복",
    "name": "사제복",
    "rarity": "uncommon",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +12",
      "스킬 증폭 +15"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:잠수복",
    "name": "잠수복",
    "rarity": "uncommon",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +10"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:라이더 자켓",
    "name": "라이더 자켓",
    "rarity": "rare",
    "slot": "chest",
    "visibleStatText": [
      "공격력 +15",
      "방어력 +15"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:방탄조끼",
    "name": "방탄조끼",
    "rarity": "rare",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +24",
      "최대 체력 +70"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:사슬 갑옷",
    "name": "사슬 갑옷",
    "rarity": "rare",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +21"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:정장",
    "name": "정장",
    "rarity": "rare",
    "slot": "chest",
    "visibleStatText": [
      "공격력 +10",
      "방어력 +9",
      "생명력 흡수 +8%"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:치파오",
    "name": "치파오",
    "rarity": "rare",
    "slot": "chest",
    "visibleStatText": [
      "공격력 +5",
      "방어력 +13"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:한복",
    "name": "한복",
    "rarity": "rare",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +18",
      "스킬 증폭 +20",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:고위 사제복",
    "name": "고위 사제복",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +24",
      "스킬 증폭 +24",
      "레벨 당 스킬 증폭 +5~100"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:교복",
    "name": "교복",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "레벨 당 공격력 +3~60",
      "방어력 +20",
      "최대 체력 +120",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:광학미채 슈트",
    "name": "광학미채 슈트",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "공격력 +9",
      "레벨 당 공격력 +3~60",
      "방어력 +13",
      "치명타 확률 +24%"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:락커의 자켓",
    "name": "락커의 자켓",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "레벨 당 공격력 +3~60",
      "방어력 +20",
      "방어 관통 +12"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:방화복",
    "name": "방화복",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +25",
      "레벨 당 최대 체력 +16~320",
      "공격 속도 +30%",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:백색 가운",
    "name": "백색 가운",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +25",
      "레벨 당 스킬 증폭 +5~100",
      "최대 체력 +120",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:석양의 갑옷",
    "name": "석양의 갑옷",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +28",
      "레벨 당 최대 체력 +21~420"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:성기사의 갑옷",
    "name": "성기사의 갑옷",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +35",
      "레벨 당 최대 체력 +18~360",
      "체력 재생 +100%"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:아마조네스 아머",
    "name": "아마조네스 아머",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +28",
      "레벨 당 최대 체력 +18~360",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:어사의",
    "name": "어사의",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +25",
      "스킬 증폭 +12",
      "레벨 당 스킬 증폭 +5~100",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:용의 도복",
    "name": "용의 도복",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "레벨 당 공격력 +3~60",
      "방어력 +20",
      "쿨다운 감소 +15",
      "방어 관통 +6"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:제사장의 예복",
    "name": "제사장의 예복",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +22",
      "레벨 당 스킬 증폭 +5~100",
      "쿨다운 감소 +20"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:지휘관의 갑옷",
    "name": "지휘관의 갑옷",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +25",
      "스킬 증폭 +26",
      "레벨 당 스킬 증폭 +5~100"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:집사복",
    "name": "집사복",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "공격력 +12",
      "레벨 당 공격력 +3~60",
      "방어력 +10",
      "공격 속도 +15%",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:창파오",
    "name": "창파오",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "공격력 +3",
      "레벨 당 공격력 +3~60",
      "방어력 +15",
      "공격 속도 +38%"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:턱시도",
    "name": "턱시도",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "레벨 당 공격력 +3~60",
      "방어력 +13",
      "공격 속도 +15%",
      "치명타 확률 +24%"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:chest:EOD 슈트",
    "name": "EOD 슈트",
    "rarity": "epic",
    "slot": "chest",
    "visibleStatText": [
      "방어력 +25",
      "레벨 당 최대 체력 +20~400",
      "체력 재생 +60%",
      "쿨다운 감소 +15"
    ],
    "sourcePage": "chest",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:가면",
    "name": "가면",
    "rarity": "common",
    "slot": "head",
    "visibleStatText": [
      "최대 체력 +20"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:머리띠",
    "name": "머리띠",
    "rarity": "common",
    "slot": "head",
    "visibleStatText": [
      "방어력 +1"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:모자",
    "name": "모자",
    "rarity": "common",
    "slot": "head",
    "visibleStatText": [
      "방어력 +2"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:자전거 헬멧",
    "name": "자전거 헬멧",
    "rarity": "common",
    "slot": "head",
    "visibleStatText": [
      "최대 체력 +30"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:머리테",
    "name": "머리테",
    "rarity": "uncommon",
    "slot": "head",
    "visibleStatText": [
      "방어력 +2"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:베레모",
    "name": "베레모",
    "rarity": "uncommon",
    "slot": "head",
    "visibleStatText": [
      "방어력 +2",
      "쿨다운 감소 +5"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:사슬 코이프",
    "name": "사슬 코이프",
    "rarity": "uncommon",
    "slot": "head",
    "visibleStatText": [
      "방어력 +3"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:안전모",
    "name": "안전모",
    "rarity": "uncommon",
    "slot": "head",
    "visibleStatText": [
      "최대 체력 +60"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:방탄모",
    "name": "방탄모",
    "rarity": "rare",
    "slot": "head",
    "visibleStatText": [
      "방어력 +3",
      "최대 체력 +90",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:소방 헬멧",
    "name": "소방 헬멧",
    "rarity": "rare",
    "slot": "head",
    "visibleStatText": [
      "최대 체력 +100"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:왕관",
    "name": "왕관",
    "rarity": "rare",
    "slot": "head",
    "visibleStatText": [
      "방어력 +4",
      "스킬 증폭 +30",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:투구",
    "name": "투구",
    "rarity": "rare",
    "slot": "head",
    "visibleStatText": [
      "방어력 +3",
      "이동 속도 +2%"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:기사단장의 투구",
    "name": "기사단장의 투구",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "방어력 +12",
      "최대 체력 +100",
      "쿨다운 감소 +15"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:다이아뎀",
    "name": "다이아뎀",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "공격력 +25",
      "쿨다운 감소 +15",
      "방어 관통 +7"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:로빈",
    "name": "로빈",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "공격력 +20",
      "공격 속도 +20%",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:마녀 모자",
    "name": "마녀 모자",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "스킬 증폭 +68",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:마린 햇",
    "name": "마린 햇",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "방어력 +15",
      "최대 체력 +200",
      "체력 재생 +60%"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:모호크 헬멧",
    "name": "모호크 헬멧",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "방어력 +12",
      "최대 체력 +100",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:비질란테",
    "name": "비질란테",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "스킬 증폭 +50",
      "최대 체력 +150",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:수정 티아라",
    "name": "수정 티아라",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "공격력 +17",
      "공격 속도 +20%",
      "치명타 확률 +28%"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:스포츠 선글라스",
    "name": "스포츠 선글라스",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "스킬 증폭 +53",
      "최대 체력 +100",
      "공격 속도 +25%",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:오토바이 헬멧",
    "name": "오토바이 헬멧",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "스킬 증폭 +55",
      "공격 속도 +30%",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:용접 마스크",
    "name": "용접 마스크",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "공격력 +26",
      "방어력 +10",
      "공격 속도 +15%"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:여우 가면",
    "name": "여우 가면",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "공격력 +10",
      "공격 속도 +32%",
      "치명타 확률 +28%"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:전술-OPS 헬멧",
    "name": "전술-OPS 헬멧",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "최대 체력 +120",
      "공격 속도 +30%",
      "쿨다운 감소 +15"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:제국 왕관",
    "name": "제국 왕관",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "스킬 증폭 +63",
      "쿨다운 감소 +15"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:카우보이 모자",
    "name": "카우보이 모자",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "공격력 +28",
      "공격 속도 +35%"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:플라즈마 투구",
    "name": "플라즈마 투구",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "공격력 +35",
      "이동 속도 +2%",
      "방어 관통 +8"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:head:황실 부르고넷",
    "name": "황실 부르고넷",
    "rarity": "epic",
    "slot": "head",
    "visibleStatText": [
      "스킬 증폭 +80",
      "이동 속도 +2%"
    ],
    "sourcePage": "head",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:붕대",
    "name": "붕대",
    "rarity": "common",
    "slot": "arm",
    "visibleStatText": [
      "체력 재생 +20%"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:손목시계",
    "name": "손목시계",
    "rarity": "common",
    "slot": "arm",
    "visibleStatText": [
      "공격 속도 +8%"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:팔찌",
    "name": "팔찌",
    "rarity": "common",
    "slot": "arm",
    "visibleStatText": [
      "방어력 +2"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:가죽 방패",
    "name": "가죽 방패",
    "rarity": "uncommon",
    "slot": "arm",
    "visibleStatText": [
      "방어력 +6"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:고장난 시계",
    "name": "고장난 시계",
    "rarity": "uncommon",
    "slot": "arm",
    "visibleStatText": [
      "쿨다운 감소 +5"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:분대장 완장",
    "name": "분대장 완장",
    "rarity": "uncommon",
    "slot": "arm",
    "visibleStatText": [
      "체력 재생 +25%"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:브레이서",
    "name": "브레이서",
    "rarity": "uncommon",
    "slot": "arm",
    "visibleStatText": [
      "방어력 +5"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:상자",
    "name": "상자",
    "rarity": "uncommon",
    "slot": "arm",
    "visibleStatText": [
      "최대 체력 +30"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:검집",
    "name": "검집",
    "rarity": "rare",
    "slot": "arm",
    "visibleStatText": [
      "공격력 +18"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:금팔찌",
    "name": "금팔찌",
    "rarity": "rare",
    "slot": "arm",
    "visibleStatText": [
      "스킬 증폭 +25"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:바주반드",
    "name": "바주반드",
    "rarity": "rare",
    "slot": "arm",
    "visibleStatText": [
      "방어력 +8"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:진홍 팔찌",
    "name": "진홍 팔찌",
    "rarity": "rare",
    "slot": "arm",
    "visibleStatText": [
      "스킬 증폭 +22"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:궁기병의 화살통",
    "name": "궁기병의 화살통",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "공격력 +25",
      "공격 속도 +30%",
      "이동 속도 +2%"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:기사의 신조",
    "name": "기사의 신조",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "공격력 +22",
      "최대 체력 +150",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:나이팅게일",
    "name": "나이팅게일",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "스킬 증폭 +40",
      "최대 체력 +50",
      "쿨다운 감소 +15",
      "주는 회복 증가 +4%"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:드라우프니르",
    "name": "드라우프니르",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "스킬 증폭 +75"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:미닛맨의 표식",
    "name": "미닛맨의 표식",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "공격력 +24",
      "공격 속도 +18%",
      "치명타 확률 +24%"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:바이탈 센서",
    "name": "바이탈 센서",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "공격 속도 +33%",
      "치명타 확률 +26%"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:백우선",
    "name": "백우선",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "스킬 증폭 +52",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:샤자한의 검집",
    "name": "샤자한의 검집",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "공격력 +38",
      "방어 관통 +9"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:소드 스토퍼",
    "name": "소드 스토퍼",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "방어력 +13",
      "최대 체력 +120",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:슈뢰딩거의 상자",
    "name": "슈뢰딩거의 상자",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "방어력 +10",
      "최대 체력 +150",
      "쿨다운 감소 +15"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:스마트 밴드",
    "name": "스마트 밴드",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "공격력 +30",
      "쿨다운 감소 +15",
      "방어 관통 +7"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:스포츠 시계",
    "name": "스포츠 시계",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "스킬 증폭 +32",
      "공격 속도 +30%"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:아이기스",
    "name": "아이기스",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "방어력 +16",
      "최대 체력 +220"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:오르골",
    "name": "오르골",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "방어력 +10",
      "최대 체력 +150",
      "공격 속도 +30%"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:진리는 나의 빛",
    "name": "진리는 나의 빛",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "방어력 +8",
      "스킬 증폭 +50",
      "최대 체력 +100",
      "쿨다운 감소 +5"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:틴달로스의 팔찌",
    "name": "틴달로스의 팔찌",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "스킬 증폭 +50",
      "쿨다운 감소 +20"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:포이즌드",
    "name": "포이즌드",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "스킬 증폭 +62",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:플라즈마 아크",
    "name": "플라즈마 아크",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "공격력 +22",
      "방어력 +10",
      "공격 속도 +25%"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:arm:해적 깃발",
    "name": "해적 깃발",
    "rarity": "epic",
    "slot": "arm",
    "visibleStatText": [
      "공격력 +25",
      "공격 속도 +25%",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "arm",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:나막신",
    "name": "나막신",
    "rarity": "common",
    "slot": "leg",
    "visibleStatText": [
      "이동 속도 +0.12"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:슬리퍼",
    "name": "슬리퍼",
    "rarity": "common",
    "slot": "leg",
    "visibleStatText": [
      "이동 속도 +0.12"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:운동화",
    "name": "운동화",
    "rarity": "common",
    "slot": "leg",
    "visibleStatText": [
      "이동 속도 +0.12"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:타이즈",
    "name": "타이즈",
    "rarity": "common",
    "slot": "leg",
    "visibleStatText": [
      "이동 속도 +0.12"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:덧댄 슬리퍼",
    "name": "덧댄 슬리퍼",
    "rarity": "uncommon",
    "slot": "leg",
    "visibleStatText": [
      "이동 속도 +0.16",
      "쿨다운 감소 +5"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:부츠",
    "name": "부츠",
    "rarity": "uncommon",
    "slot": "leg",
    "visibleStatText": [
      "체력 재생 +10%",
      "이동 속도 +0.16"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:체인 레깅스",
    "name": "체인 레깅스",
    "rarity": "uncommon",
    "slot": "leg",
    "visibleStatText": [
      "최대 체력 +50",
      "이동 속도 +0.16"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:하이힐",
    "name": "하이힐",
    "rarity": "uncommon",
    "slot": "leg",
    "visibleStatText": [
      "공격력 +2",
      "이동 속도 +0.16"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:힐리스",
    "name": "힐리스",
    "rarity": "uncommon",
    "slot": "leg",
    "visibleStatText": [
      "이동 속도 +0.17",
      "(고유) 방해 효과 저항 +5%"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:무릎 보호대",
    "name": "무릎 보호대",
    "rarity": "rare",
    "slot": "leg",
    "visibleStatText": [
      "방어력 +5",
      "이동 속도 +0.17"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:전투화",
    "name": "전투화",
    "rarity": "rare",
    "slot": "leg",
    "visibleStatText": [
      "체력 재생 +15%",
      "공격 속도 +5%",
      "이동 속도 +0.17"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:강철 무릎 보호대",
    "name": "강철 무릎 보호대",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "방어력 +10",
      "이동 속도 +0.22",
      "(고유) 방해 효과 저항 +20%"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:경량화 부츠",
    "name": "경량화 부츠",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "체력 재생 +25%",
      "공격 속도 +38%",
      "이동 속도 +0.22"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:글레디에이터",
    "name": "글레디에이터",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "공격 속도 +16%",
      "이동 속도 +0.22",
      "치명타 확률 +25%"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:델타 레드",
    "name": "델타 레드",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "스킬 증폭 +18",
      "이동 속도 +0.22",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:등산화",
    "name": "등산화",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "방어력 +8",
      "최대 체력 +100",
      "체력 재생 +50%",
      "이동 속도 +0.22"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:매버릭 러너",
    "name": "매버릭 러너",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "공격력 +20",
      "이동 속도 +0.22",
      "(고유) 방해 효과 저항 +20%"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:부케팔로스",
    "name": "부케팔로스",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "공격력 +8",
      "이동 속도 +0.22",
      "치명타 확률 +25%"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:스텔라 스텝",
    "name": "스텔라 스텝",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "공격력 +15",
      "공격 속도 +10%",
      "이동 속도 +0.22",
      "생명력 흡수 +8%"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:아이젠",
    "name": "아이젠",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "이동 속도 +0.22",
      "방어 관통 +12"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:카우보이 부츠",
    "name": "카우보이 부츠",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "공격력 +18",
      "이동 속도 +0.22",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:클링온 부츠",
    "name": "클링온 부츠",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "체력 재생 +25%",
      "공격 속도 +28%",
      "이동 속도 +0.22"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:타키온 브레이스",
    "name": "타키온 브레이스",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "방어력 +8",
      "이동 속도 +0.22",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:풍화륜",
    "name": "풍화륜",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "스킬 증폭 +25",
      "이동 속도 +0.22",
      "쿨다운 감소 +5"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:legs:SCV",
    "name": "SCV",
    "rarity": "epic",
    "slot": "leg",
    "visibleStatText": [
      "스킬 증폭 +28",
      "이동 속도 +0.22"
    ],
    "sourcePage": "legs",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:목장갑",
    "name": "목장갑",
    "rarity": "common",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +7"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:glove:글러브",
    "name": "글러브",
    "rarity": "uncommon",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +18"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:glove:아이언 너클",
    "name": "아이언 너클",
    "rarity": "uncommon",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +20"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:glove:건틀릿",
    "name": "건틀릿",
    "rarity": "rare",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +28"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:glove:귀골 장갑",
    "name": "귀골 장갑",
    "rarity": "rare",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +35",
      "방어력 +4"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:glove:윙 너클",
    "name": "윙 너클",
    "rarity": "rare",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +20"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:glove:회단 장갑",
    "name": "회단 장갑",
    "rarity": "rare",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +20",
      "스킬 증폭 +43"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:glove:단영촌천투",
    "name": "단영촌천투",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +64",
      "방어력 +6",
      "공격 속도 +30%"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:glove:디바인 피스트",
    "name": "디바인 피스트",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +41",
      "스킬 증폭 +72",
      "최대 체력 +100"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:glove:브레이질 건틀릿",
    "name": "브레이질 건틀릿",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +60",
      "방어력 +6",
      "체력 재생 +60%"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:glove:블러드윙 너클",
    "name": "블러드윙 너클",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +63",
      "최대 체력 +100",
      "이동 속도 +2%"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:glove:빙화현옥수",
    "name": "빙화현옥수",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +32",
      "스킬 증폭 +69",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:glove:소수",
    "name": "소수",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +60",
      "치명타 확률 +20%",
      "치명타 피해량 +5%"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:glove:여래수투",
    "name": "여래수투",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "glove",
    "visibleStatText": [
      "공격력 +32",
      "스킬 증폭 +62",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "glove",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:양궁",
    "name": "양궁",
    "rarity": "common",
    "slot": "weapon",
    "weaponTypeId": "bow",
    "visibleStatText": [
      "공격력 +11"
    ],
    "sourcePage": "bow",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bow:목궁",
    "name": "목궁",
    "rarity": "uncommon",
    "slot": "weapon",
    "weaponTypeId": "bow",
    "visibleStatText": [
      "공격력 +15"
    ],
    "sourcePage": "bow",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bow:장궁",
    "name": "장궁",
    "rarity": "uncommon",
    "slot": "weapon",
    "weaponTypeId": "bow",
    "visibleStatText": [
      "공격력 +17"
    ],
    "sourcePage": "bow",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bow:강궁",
    "name": "강궁",
    "rarity": "rare",
    "slot": "weapon",
    "weaponTypeId": "bow",
    "visibleStatText": [
      "공격력 +30"
    ],
    "sourcePage": "bow",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bow:벽력궁",
    "name": "벽력궁",
    "rarity": "rare",
    "slot": "weapon",
    "weaponTypeId": "bow",
    "visibleStatText": [
      "공격력 +35"
    ],
    "sourcePage": "bow",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bow:컴포지트 보우",
    "name": "컴포지트 보우",
    "rarity": "rare",
    "slot": "weapon",
    "weaponTypeId": "bow",
    "visibleStatText": [
      "공격력 +25"
    ],
    "sourcePage": "bow",
    "validationStatus": "needs-manual-review"
  },
  {
    "id": "wiki:bow:골든래쇼 보우",
    "name": "골든래쇼 보우",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "bow",
    "visibleStatText": [
      "공격력 +43",
      "스킬 증폭 +67",
      "공격 속도 +25%",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "bow",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bow:엘리멘탈 보우",
    "name": "엘리멘탈 보우",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "bow",
    "visibleStatText": [
      "공격력 +43",
      "스킬 증폭 +72",
      "이동 속도 +2%"
    ],
    "sourcePage": "bow",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bow:제베의 활",
    "name": "제베의 활",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "bow",
    "visibleStatText": [
      "공격력 +72",
      "공격 속도 +30%",
      "이동 속도 +2%"
    ],
    "sourcePage": "bow",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bow:트윈보우",
    "name": "트윈보우",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "bow",
    "visibleStatText": [
      "공격력 +65",
      "공격 속도 +40%",
      "생명력 흡수 +10%"
    ],
    "sourcePage": "bow",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bow:편전",
    "name": "편전",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "bow",
    "visibleStatText": [
      "공격력 +57",
      "공격 속도 +20%"
    ],
    "sourcePage": "bow",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:단봉",
    "name": "단봉",
    "rarity": "common",
    "slot": "weapon",
    "weaponTypeId": "bat",
    "visibleStatText": [
      "공격력 +15"
    ],
    "sourcePage": "bat",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bat:쇠파이프",
    "name": "쇠파이프",
    "rarity": "uncommon",
    "slot": "weapon",
    "weaponTypeId": "bat",
    "visibleStatText": [
      "공격력 +22"
    ],
    "sourcePage": "bat",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bat:장봉",
    "name": "장봉",
    "rarity": "uncommon",
    "slot": "weapon",
    "weaponTypeId": "bat",
    "visibleStatText": [
      "공격력 +22"
    ],
    "sourcePage": "bat",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bat:도깨비 방망이",
    "name": "도깨비 방망이",
    "rarity": "rare",
    "slot": "weapon",
    "weaponTypeId": "bat",
    "visibleStatText": [
      "공격력 +27"
    ],
    "sourcePage": "bat",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bat:우산",
    "name": "우산",
    "rarity": "rare",
    "slot": "weapon",
    "weaponTypeId": "bat",
    "visibleStatText": [
      "공격력 +25",
      "스킬 증폭 +53"
    ],
    "sourcePage": "bat",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bat:구원의 여신상",
    "name": "구원의 여신상",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "bat",
    "visibleStatText": [
      "공격력 +75",
      "공격 속도 +30%",
      "생명력 흡수 +10%"
    ],
    "sourcePage": "bat",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bat:금강저",
    "name": "금강저",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "bat",
    "visibleStatText": [
      "공격력 +74",
      "공격 속도 +10%",
      "치명타 확률 +22%",
      "치명타 피해량 +5%"
    ],
    "sourcePage": "bat",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bat:스파이의 우산",
    "name": "스파이의 우산",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "bat",
    "visibleStatText": [
      "공격력 +30",
      "스킬 증폭 +66",
      "쿨다운 감소 +10"
    ],
    "sourcePage": "bat",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bat:타구봉",
    "name": "타구봉",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "bat",
    "visibleStatText": [
      "공격력 +72",
      "공격 속도 +40%"
    ],
    "sourcePage": "bat",
    "validationStatus": "source-extracted"
  },
  {
    "id": "wiki:bat:팔괘장",
    "name": "팔괘장",
    "rarity": "epic",
    "slot": "weapon",
    "weaponTypeId": "bat",
    "visibleStatText": [
      "공격력 +26",
      "스킬 증폭 +70"
    ],
    "sourcePage": "bat",
    "validationStatus": "source-extracted"
  }
];
