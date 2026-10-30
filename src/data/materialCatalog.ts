/** General, uncommon and rare materials from the specified source page.
 * IDs are local references. No Heroic/Cobalt/deleted/shard entries are included.
 */
export type MaterialRarity = 'common' | 'uncommon' | 'rare';
export interface ExtractedMaterial {
  id: string;
  name: string;
  rarity: MaterialRarity;
  acquisition: 'container' | 'field' | 'unspecified';
  sourceUrl: string;
  validationStatus: 'source-extracted';
}

export const materialCatalog: ExtractedMaterial[] = [
  {
    "id": "sample-common:가죽",
    "name": "가죽",
    "rarity": "common",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-field:꽃",
    "name": "꽃",
    "rarity": "common",
    "acquisition": "field",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-field:나뭇가지",
    "name": "나뭇가지",
    "rarity": "common",
    "acquisition": "field",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-field:돌멩이",
    "name": "돌멩이",
    "rarity": "common",
    "acquisition": "field",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:가위",
    "name": "가위",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:거북이 등딱지",
    "name": "거북이 등딱지",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:고무",
    "name": "고무",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:고철",
    "name": "고철",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:곡괭이",
    "name": "곡괭이",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:깃털",
    "name": "깃털",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:덧댄 가죽",
    "name": "덧댄 가죽",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:라이터",
    "name": "라이터",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:리본",
    "name": "리본",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:마패",
    "name": "마패",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:만년필",
    "name": "만년필",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:못",
    "name": "못",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:배터리",
    "name": "배터리",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:쇠구슬",
    "name": "쇠구슬",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:실",
    "name": "실",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:십자가",
    "name": "십자가",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:쌍안경",
    "name": "쌍안경",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:얼음",
    "name": "얼음",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:오일",
    "name": "오일",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:옷감",
    "name": "옷감",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:원석",
    "name": "원석",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:유리병",
    "name": "유리병",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:종이",
    "name": "종이",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:트럼프 카드",
    "name": "트럼프 카드",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:플라스틱",
    "name": "플라스틱",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:피아노선",
    "name": "피아노선",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:화약",
    "name": "화약",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:화학품",
    "name": "화학품",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "sample-common:흑연",
    "name": "흑연",
    "rarity": "common",
    "acquisition": "container",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:기름먹인 천",
    "name": "기름먹인 천",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:다이아몬드",
    "name": "다이아몬드",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:독약",
    "name": "독약",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:루비",
    "name": "루비",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:비파단도",
    "name": "비파단도",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:운명의 꽃",
    "name": "운명의 꽃",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:유리 조각",
    "name": "유리 조각",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:이온 전지",
    "name": "이온 전지",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:재",
    "name": "재",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:전자 부품",
    "name": "전자 부품",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:정교한 도면",
    "name": "정교한 도면",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:철사",
    "name": "철사",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:철판",
    "name": "철판",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:하드커버",
    "name": "하드커버",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:화살통",
    "name": "화살통",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:황금",
    "name": "황금",
    "rarity": "uncommon",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:모터",
    "name": "모터",
    "rarity": "rare",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  },
  {
    "id": "material:아이테르 깃털",
    "name": "아이테르 깃털",
    "rarity": "rare",
    "acquisition": "unspecified",
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "source-extracted"
  }
];
