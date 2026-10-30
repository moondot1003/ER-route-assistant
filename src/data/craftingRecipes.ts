import type { CraftingRecipe } from '../domain/models';
import { equipmentSourcePages } from './equipmentCatalog';

/** One direct crafting step per source item. This is not a flattened calculator. */
export interface ExtractedRecipe extends CraftingRecipe {
  ingredients: Array<{ itemId: string; itemName: string; quantity: number }>;
  sourcePage: keyof typeof equipmentSourcePages;
  validationStatus: 'direct-tree-extracted' | 'incomplete-ingredient-source' | 'in-game-verified';
  verifiedRecipeSource?: '실제 게임 내 확인';
  sourceDiscrepancy?: string;
}

export const craftingRecipes: ExtractedRecipe[] = [
  {
    "resultItemId": "wiki:chest:가죽 갑옷",
    "ingredients": [
      {
        "itemId": "sample-common:셔츠",
        "itemName": "셔츠",
        "quantity": 1
      },
      {
        "itemId": "sample-common:덧댄 가죽",
        "itemName": "덧댄 가죽",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:군복",
    "ingredients": [
      {
        "itemId": "sample-common:셔츠",
        "itemName": "셔츠",
        "quantity": 1
      },
      {
        "itemId": "sample-field:나뭇가지",
        "itemName": "나뭇가지",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:덧댄 로브",
    "ingredients": [
      {
        "itemId": "sample-common:셔츠",
        "itemName": "셔츠",
        "quantity": 1
      },
      {
        "itemId": "sample-common:붕대",
        "itemName": "붕대",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:드레스",
    "ingredients": [
      {
        "itemId": "sample-common:셔츠",
        "itemName": "셔츠",
        "quantity": 1
      },
      {
        "itemId": "sample-common:가위",
        "itemName": "가위",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:사제복",
    "ingredients": [
      {
        "itemId": "sample-common:셔츠",
        "itemName": "셔츠",
        "quantity": 1
      },
      {
        "itemId": "sample-common:십자가",
        "itemName": "십자가",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:잠수복",
    "ingredients": [
      {
        "itemId": "sample-common:셔츠",
        "itemName": "셔츠",
        "quantity": 1
      },
      {
        "itemId": "sample-common:고무",
        "itemName": "고무",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:라이더 자켓",
    "ingredients": [
      {
        "itemId": "wiki:chest:군복",
        "itemName": "군복",
        "quantity": 1
      },
      {
        "itemId": "sample-common:화학품",
        "itemName": "화학품",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:방탄조끼",
    "ingredients": [
      {
        "itemId": "wiki:chest:군복",
        "itemName": "군복",
        "quantity": 1
      },
      {
        "itemId": "sample-common:플라스틱",
        "itemName": "플라스틱",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:사슬 갑옷",
    "ingredients": [
      {
        "itemId": "wiki:chest:가죽 갑옷",
        "itemName": "가죽 갑옷",
        "quantity": 1
      },
      {
        "itemId": "sample-common:실",
        "itemName": "실",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:정장",
    "ingredients": [
      {
        "itemId": "wiki:chest:군복",
        "itemName": "군복",
        "quantity": 1
      },
      {
        "itemId": "sample-common:리본",
        "itemName": "리본",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:치파오",
    "ingredients": [
      {
        "itemId": "wiki:chest:드레스",
        "itemName": "드레스",
        "quantity": 1
      },
      {
        "itemId": "sample-common:옷감",
        "itemName": "옷감",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:한복",
    "ingredients": [
      {
        "itemId": "wiki:chest:덧댄 로브",
        "itemName": "덧댄 로브",
        "quantity": 1
      },
      {
        "itemId": "sample-field:꽃",
        "itemName": "꽃",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:고위 사제복",
    "ingredients": [
      {
        "itemId": "wiki:chest:사제복",
        "itemName": "사제복",
        "quantity": 1
      },
      {
        "itemId": "material:기름먹인 천",
        "itemName": "기름먹인 천",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:교복",
    "ingredients": [
      {
        "itemId": "wiki:chest:군복",
        "itemName": "군복",
        "quantity": 1
      },
      {
        "itemId": "material:정교한 도면",
        "itemName": "정교한 도면",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:광학미채 슈트",
    "ingredients": [
      {
        "itemId": "wiki:chest:잠수복",
        "itemName": "잠수복",
        "quantity": 1
      },
      {
        "itemId": "material:유리 조각",
        "itemName": "유리 조각",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:락커의 자켓",
    "ingredients": [
      {
        "itemId": "wiki:chest:라이더 자켓",
        "itemName": "라이더 자켓",
        "quantity": 1
      },
      {
        "itemId": "sample-common:쇠구슬",
        "itemName": "쇠구슬",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:방화복",
    "ingredients": [
      {
        "itemId": "wiki:chest:정장",
        "itemName": "정장",
        "quantity": 1
      },
      {
        "itemId": "sample-common:플라스틱",
        "itemName": "플라스틱",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:백색 가운",
    "ingredients": [
      {
        "itemId": "wiki:chest:라이더 자켓",
        "itemName": "라이더 자켓",
        "quantity": 1
      },
      {
        "itemId": "sample-common:붕대",
        "itemName": "붕대",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:석양의 갑옷",
    "ingredients": [
      {
        "itemId": "wiki:chest:사슬 갑옷",
        "itemName": "사슬 갑옷",
        "quantity": 1
      },
      {
        "itemId": "sample-common:원석",
        "itemName": "원석",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:성기사의 갑옷",
    "ingredients": [
      {
        "itemId": "wiki:chest:사슬 갑옷",
        "itemName": "사슬 갑옷",
        "quantity": 1
      },
      {
        "itemId": "sample-common:십자가",
        "itemName": "십자가",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:아마조네스 아머",
    "ingredients": [
      {
        "itemId": "wiki:chest:사슬 갑옷",
        "itemName": "사슬 갑옷",
        "quantity": 1
      },
      {
        "itemId": "sample-common:가위",
        "itemName": "가위",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:어사의",
    "ingredients": [
      {
        "itemId": "wiki:chest:한복",
        "itemName": "한복",
        "quantity": 1
      },
      {
        "itemId": "sample-common:마패",
        "itemName": "마패",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:용의 도복",
    "ingredients": [
      {
        "itemId": "wiki:chest:치파오",
        "itemName": "치파오",
        "quantity": 1
      },
      {
        "itemId": "sample-common:거북이 등딱지",
        "itemName": "거북이 등딱지",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:제사장의 예복",
    "ingredients": [
      {
        "itemId": "wiki:chest:사제복",
        "itemName": "사제복",
        "quantity": 1
      },
      {
        "itemId": "material:비파단도",
        "itemName": "비파단도",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:지휘관의 갑옷",
    "ingredients": [
      {
        "itemId": "wiki:chest:가죽 갑옷",
        "itemName": "가죽 갑옷",
        "quantity": 1
      },
      {
        "itemId": "material:다이아몬드",
        "itemName": "다이아몬드",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:집사복",
    "ingredients": [
      {
        "itemId": "wiki:chest:정장",
        "itemName": "정장",
        "quantity": 1
      },
      {
        "itemId": "sample-common:깃털",
        "itemName": "깃털",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:창파오",
    "ingredients": [
      {
        "itemId": "wiki:chest:치파오",
        "itemName": "치파오",
        "quantity": 1
      },
      {
        "itemId": "sample-common:깃털",
        "itemName": "깃털",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:턱시도",
    "ingredients": [
      {
        "itemId": "wiki:chest:정장",
        "itemName": "정장",
        "quantity": 1
      },
      {
        "itemId": "sample-common:옷감",
        "itemName": "옷감",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:chest:EOD 슈트",
    "ingredients": [
      {
        "itemId": "wiki:chest:방탄조끼",
        "itemName": "방탄조끼",
        "quantity": 1
      },
      {
        "itemId": "sample-common:고무",
        "itemName": "고무",
        "quantity": 1
      }
    ],
    "sourcePage": "chest",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:머리테",
    "ingredients": [
      {
        "itemId": "sample-common:머리띠",
        "itemName": "머리띠",
        "quantity": 1
      },
      {
        "itemId": "sample-field:나뭇가지",
        "itemName": "나뭇가지",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:베레모",
    "ingredients": [
      {
        "itemId": "sample-common:모자",
        "itemName": "모자",
        "quantity": 1
      },
      {
        "itemId": "sample-common:가위",
        "itemName": "가위",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:사슬 코이프",
    "ingredients": [
      {
        "itemId": "sample-common:모자",
        "itemName": "모자",
        "quantity": 1
      },
      {
        "itemId": "sample-common:실",
        "itemName": "실",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:안전모",
    "ingredients": [
      {
        "itemId": "sample-common:자전거 헬멧",
        "itemName": "자전거 헬멧",
        "quantity": 1
      },
      {
        "itemId": "sample-field:돌멩이",
        "itemName": "돌멩이",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:방탄모",
    "ingredients": [
      {
        "itemId": "wiki:head:베레모",
        "itemName": "베레모",
        "quantity": 1
      },
      {
        "itemId": "sample-common:자전거 헬멧",
        "itemName": "자전거 헬멧",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:소방 헬멧",
    "ingredients": [
      {
        "itemId": "wiki:head:안전모",
        "itemName": "안전모",
        "quantity": 1
      },
      {
        "itemId": "sample-common:플라스틱",
        "itemName": "플라스틱",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:왕관",
    "ingredients": [
      {
        "itemId": "sample-common:모자",
        "itemName": "모자",
        "quantity": 1
      },
      {
        "itemId": "material:황금",
        "itemName": "황금",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:투구",
    "ingredients": [
      {
        "itemId": "sample-common:가면",
        "itemName": "가면",
        "quantity": 1
      },
      {
        "itemId": "material:철판",
        "itemName": "철판",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:기사단장의 투구",
    "ingredients": [
      {
        "itemId": "wiki:head:투구",
        "itemName": "투구",
        "quantity": 1
      },
      {
        "itemId": "sample-common:고무",
        "itemName": "고무",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:다이아뎀",
    "ingredients": [
      {
        "itemId": "wiki:head:머리테",
        "itemName": "머리테",
        "quantity": 1
      },
      {
        "itemId": "material:황금",
        "itemName": "황금",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:로빈",
    "ingredients": [
      {
        "itemId": "sample-common:머리띠",
        "itemName": "머리띠",
        "quantity": 1
      },
      {
        "itemId": "material:아이테르 깃털",
        "itemName": "아이테르 깃털",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:마녀 모자",
    "ingredients": [
      {
        "itemId": "wiki:head:머리테",
        "itemName": "머리테",
        "quantity": 1
      },
      {
        "itemId": "material:하드커버",
        "itemName": "하드커버",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:마린 햇",
    "ingredients": [
      {
        "itemId": "wiki:head:베레모",
        "itemName": "베레모",
        "quantity": 1
      },
      {
        "itemId": "material:운명의 꽃",
        "itemName": "운명의 꽃",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:모호크 헬멧",
    "ingredients": [
      {
        "itemId": "wiki:head:소방 헬멧",
        "itemName": "소방 헬멧",
        "quantity": 1
      },
      {
        "itemId": "sample-common:못",
        "itemName": "못",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:비질란테",
    "ingredients": [
      {
        "itemId": "wiki:head:소방 헬멧",
        "itemName": "소방 헬멧",
        "quantity": 1
      },
      {
        "itemId": "sample-common:화약",
        "itemName": "화약",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:수정 티아라",
    "ingredients": [
      {
        "itemId": "wiki:head:머리테",
        "itemName": "머리테",
        "quantity": 1
      },
      {
        "itemId": "material:루비",
        "itemName": "루비",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:스포츠 선글라스",
    "ingredients": [
      {
        "itemId": "sample-common:가면",
        "itemName": "가면",
        "quantity": 1
      },
      {
        "itemId": "material:모터",
        "itemName": "모터",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:오토바이 헬멧",
    "ingredients": [
      {
        "itemId": "sample-common:자전거 헬멧",
        "itemName": "자전거 헬멧",
        "quantity": 1
      },
      {
        "itemId": "material:모터",
        "itemName": "모터",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:용접 마스크",
    "ingredients": [
      {
        "itemId": "wiki:head:방탄모",
        "itemName": "방탄모",
        "quantity": 1
      },
      {
        "itemId": "sample-common:플라스틱",
        "itemName": "플라스틱",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:여우 가면",
    "ingredients": [
      {
        "itemId": "sample-common:가면",
        "itemName": "가면",
        "quantity": 1
      },
      {
        "itemId": "material:아이테르 깃털",
        "itemName": "아이테르 깃털",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:전술-OPS 헬멧",
    "ingredients": [
      {
        "itemId": "wiki:head:방탄모",
        "itemName": "방탄모",
        "quantity": 1
      },
      {
        "itemId": "sample-common:배터리",
        "itemName": "배터리",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:제국 왕관",
    "ingredients": [
      {
        "itemId": "wiki:head:왕관",
        "itemName": "왕관",
        "quantity": 1
      },
      {
        "itemId": "sample-common:리본",
        "itemName": "리본",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:카우보이 모자",
    "ingredients": [
      {
        "itemId": "wiki:head:머리테",
        "itemName": "머리테",
        "quantity": 1
      },
      {
        "itemId": "material:재",
        "itemName": "재",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:플라즈마 투구",
    "ingredients": [
      {
        "itemId": "wiki:head:사슬 코이프",
        "itemName": "사슬 코이프",
        "quantity": 1
      },
      {
        "itemId": "material:이온 전지",
        "itemName": "이온 전지",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:head:황실 부르고넷",
    "ingredients": [
      {
        "itemId": "wiki:head:투구",
        "itemName": "투구",
        "quantity": 1
      },
      {
        "itemId": "sample-common:깃털",
        "itemName": "깃털",
        "quantity": 1
      }
    ],
    "sourcePage": "head",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:가죽 방패",
    "ingredients": [
      {
        "itemId": "sample-common:거북이 등딱지",
        "itemName": "거북이 등딱지",
        "quantity": 1
      },
      {
        "itemId": "sample-common:덧댄 가죽",
        "itemName": "덧댄 가죽",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:고장난 시계",
    "ingredients": [
      {
        "itemId": "sample-common:손목시계",
        "itemName": "손목시계",
        "quantity": 1
      },
      {
        "itemId": "sample-common:화약",
        "itemName": "화약",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:분대장 완장",
    "ingredients": [
      {
        "itemId": "sample-common:붕대",
        "itemName": "붕대",
        "quantity": 1
      },
      {
        "itemId": "sample-common:화약",
        "itemName": "화약",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:브레이서",
    "ingredients": [
      {
        "itemId": "sample-common:붕대",
        "itemName": "붕대",
        "quantity": 1
      },
      {
        "itemId": "sample-common:고무",
        "itemName": "고무",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:상자",
    "ingredients": [
      {
        "itemId": "sample-common:옷감",
        "itemName": "옷감",
        "quantity": 1
      },
      {
        "itemId": "sample-field:나뭇가지",
        "itemName": "나뭇가지",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:검집",
    "ingredients": [
      {
        "itemId": "material:철판",
        "itemName": "철판",
        "quantity": 1
      },
      {
        "itemId": "sample-common:덧댄 가죽",
        "itemName": "덧댄 가죽",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:금팔찌",
    "ingredients": [
      {
        "itemId": "sample-common:팔찌",
        "itemName": "팔찌",
        "quantity": 1
      },
      {
        "itemId": "material:황금",
        "itemName": "황금",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:바주반드",
    "ingredients": [
      {
        "itemId": "wiki:arm:브레이서",
        "itemName": "브레이서",
        "quantity": 1
      },
      {
        "itemId": "sample-common:고철",
        "itemName": "고철",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:진홍 팔찌",
    "ingredients": [
      {
        "itemId": "sample-common:팔찌",
        "itemName": "팔찌",
        "quantity": 1
      },
      {
        "itemId": "material:루비",
        "itemName": "루비",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:궁기병의 화살통",
    "ingredients": [
      {
        "itemId": "material:화살통",
        "itemName": "화살통",
        "quantity": 1
      },
      {
        "itemId": "material:기름먹인 천",
        "itemName": "기름먹인 천",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:기사의 신조",
    "ingredients": [
      {
        "itemId": "wiki:arm:브레이서",
        "itemName": "브레이서",
        "quantity": 1
      },
      {
        "itemId": "wiki:arm:분대장 완장",
        "itemName": "분대장 완장",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:나이팅게일",
    "ingredients": [
      {
        "itemId": "sample-common:붕대",
        "itemName": "붕대",
        "quantity": 1
      },
      {
        "itemId": "material:아이테르 깃털",
        "itemName": "아이테르 깃털",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:드라우프니르",
    "ingredients": [
      {
        "itemId": "wiki:arm:금팔찌",
        "itemName": "금팔찌",
        "quantity": 1
      },
      {
        "itemId": "sample-common:붕대",
        "itemName": "붕대",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:미닛맨의 표식",
    "ingredients": [
      {
        "itemId": "wiki:arm:분대장 완장",
        "itemName": "분대장 완장",
        "quantity": 1
      },
      {
        "itemId": "material:유리 조각",
        "itemName": "유리 조각",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:바이탈 센서",
    "ingredients": [
      {
        "itemId": "wiki:arm:고장난 시계",
        "itemName": "고장난 시계",
        "quantity": 1
      },
      {
        "itemId": "material:전자 부품",
        "itemName": "전자 부품",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:백우선",
    "ingredients": [
      {
        "itemId": "sample-common:못",
        "itemName": "못",
        "quantity": 1
      },
      {
        "itemId": "material:아이테르 깃털",
        "itemName": "아이테르 깃털",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:샤자한의 검집",
    "ingredients": [
      {
        "itemId": "wiki:arm:검집",
        "itemName": "검집",
        "quantity": 1
      },
      {
        "itemId": "sample-common:원석",
        "itemName": "원석",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:소드 스토퍼",
    "ingredients": [
      {
        "itemId": "wiki:arm:바주반드",
        "itemName": "바주반드",
        "quantity": 1
      },
      {
        "itemId": "sample-common:못",
        "itemName": "못",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:슈뢰딩거의 상자",
    "ingredients": [
      {
        "itemId": "wiki:arm:상자",
        "itemName": "상자",
        "quantity": 1
      },
      {
        "itemId": "material:독약",
        "itemName": "독약",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:스마트 밴드",
    "ingredients": [
      {
        "itemId": "sample-common:손목시계",
        "itemName": "손목시계",
        "quantity": 1
      },
      {
        "itemId": "material:모터",
        "itemName": "모터",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:스포츠 시계",
    "ingredients": [
      {
        "itemId": "wiki:arm:고장난 시계",
        "itemName": "고장난 시계",
        "quantity": 1
      },
      {
        "itemId": "material:정교한 도면",
        "itemName": "정교한 도면",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:아이기스",
    "ingredients": [
      {
        "itemId": "wiki:arm:가죽 방패",
        "itemName": "가죽 방패",
        "quantity": 1
      },
      {
        "itemId": "material:다이아몬드",
        "itemName": "다이아몬드",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:오르골",
    "ingredients": [
      {
        "itemId": "wiki:arm:상자",
        "itemName": "상자",
        "quantity": 1
      },
      {
        "itemId": "material:이온 전지",
        "itemName": "이온 전지",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:진리는 나의 빛",
    "ingredients": [
      {
        "itemId": "material:아이테르 깃털",
        "itemName": "아이테르 깃털",
        "quantity": 1
      },
      {
        "itemId": "sample-common:리본",
        "itemName": "리본",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:틴달로스의 팔찌",
    "ingredients": [
      {
        "itemId": "wiki:arm:진홍 팔찌",
        "itemName": "진홍 팔찌",
        "quantity": 1
      },
      {
        "itemId": "sample-common:손목시계",
        "itemName": "손목시계",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:포이즌드",
    "ingredients": [
      {
        "itemId": "material:기름먹인 천",
        "itemName": "기름먹인 천",
        "quantity": 1
      },
      {
        "itemId": "material:독약",
        "itemName": "독약",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:플라즈마 아크",
    "ingredients": [
      {
        "itemId": "wiki:arm:가죽 방패",
        "itemName": "가죽 방패",
        "quantity": 1
      },
      {
        "itemId": "material:이온 전지",
        "itemName": "이온 전지",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:arm:해적 깃발",
    "ingredients": [
      {
        "itemId": "material:기름먹인 천",
        "itemName": "기름먹인 천",
        "quantity": 1
      },
      {
        "itemId": "material:철판",
        "itemName": "철판",
        "quantity": 1
      }
    ],
    "sourcePage": "arm",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:덧댄 슬리퍼",
    "ingredients": [
      {
        "itemId": "sample-common:운동화",
        "itemName": "운동화",
        "quantity": 1
      },
      {
        "itemId": "sample-common:가위",
        "itemName": "가위",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:부츠",
    "ingredients": [
      {
        "itemId": "sample-common:운동화",
        "itemName": "운동화",
        "quantity": 1
      },
      {
        "itemId": "sample-common:흑연",
        "itemName": "흑연",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:체인 레깅스",
    "ingredients": [
      {
        "itemId": "sample-common:운동화",
        "itemName": "운동화",
        "quantity": 1
      },
      {
        "itemId": "sample-common:실",
        "itemName": "실",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:하이힐",
    "ingredients": [
      {
        "itemId": "sample-common:운동화",
        "itemName": "운동화",
        "quantity": 1
      },
      {
        "itemId": "sample-common:못",
        "itemName": "못",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:힐리스",
    "ingredients": [
      {
        "itemId": "sample-common:운동화",
        "itemName": "운동화",
        "quantity": 1
      },
      {
        "itemId": "sample-common:쇠구슬",
        "itemName": "쇠구슬",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:무릎 보호대",
    "ingredients": [
      {
        "itemId": "wiki:legs:체인 레깅스",
        "itemName": "체인 레깅스",
        "quantity": 1
      },
      {
        "itemId": "sample-common:고무",
        "itemName": "고무",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:전투화",
    "ingredients": [
      {
        "itemId": "wiki:legs:부츠",
        "itemName": "부츠",
        "quantity": 1
      },
      {
        "itemId": "sample-common:오일",
        "itemName": "오일",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:강철 무릎 보호대",
    "ingredients": [
      {
        "itemId": "wiki:legs:무릎 보호대",
        "itemName": "무릎 보호대",
        "quantity": 1
      },
      {
        "itemId": "sample-common:고철",
        "itemName": "고철",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:경량화 부츠",
    "ingredients": [
      {
        "itemId": "wiki:legs:전투화",
        "itemName": "전투화",
        "quantity": 1
      },
      {
        "itemId": "sample-common:깃털",
        "itemName": "깃털",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:글레디에이터",
    "ingredients": [
      {
        "itemId": "wiki:legs:체인 레깅스",
        "itemName": "체인 레깅스",
        "quantity": 1
      },
      {
        "itemId": "material:철사",
        "itemName": "철사",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:델타 레드",
    "ingredients": [
      {
        "itemId": "wiki:legs:힐리스",
        "itemName": "힐리스",
        "quantity": 1
      },
      {
        "itemId": "material:이온 전지",
        "itemName": "이온 전지",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:등산화",
    "ingredients": [
      {
        "itemId": "wiki:legs:전투화",
        "itemName": "전투화",
        "quantity": 1
      },
      {
        "itemId": "sample-common:덧댄 가죽",
        "itemName": "덧댄 가죽",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:매버릭 러너",
    "ingredients": [
      {
        "itemId": "wiki:legs:힐리스",
        "itemName": "힐리스",
        "quantity": 1
      },
      {
        "itemId": "material:정교한 도면",
        "itemName": "정교한 도면",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:부케팔로스",
    "ingredients": [
      {
        "itemId": "wiki:legs:하이힐",
        "itemName": "하이힐",
        "quantity": 1
      },
      {
        "itemId": "material:유리 조각",
        "itemName": "유리 조각",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:스텔라 스텝",
    "ingredients": [
      {
        "itemId": "wiki:legs:하이힐",
        "itemName": "하이힐",
        "quantity": 1
      },
      {
        "itemId": "material:이온 전지",
        "itemName": "이온 전지",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:아이젠",
    "ingredients": [
      {
        "itemId": "wiki:legs:덧댄 슬리퍼",
        "itemName": "덧댄 슬리퍼",
        "quantity": 1
      },
      {
        "itemId": "material:철사",
        "itemName": "철사",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:카우보이 부츠",
    "ingredients": [
      {
        "itemId": "wiki:legs:체인 레깅스",
        "itemName": "체인 레깅스",
        "quantity": 1
      },
      {
        "itemId": "material:기름먹인 천",
        "itemName": "기름먹인 천",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:클링온 부츠",
    "ingredients": [
      {
        "itemId": "wiki:legs:전투화",
        "itemName": "전투화",
        "quantity": 1
      },
      {
        "itemId": "sample-common:못",
        "itemName": "못",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:타키온 브레이스",
    "ingredients": [
      {
        "itemId": "sample-common:운동화",
        "itemName": "운동화",
        "quantity": 1
      },
      {
        "itemId": "material:모터",
        "itemName": "모터",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:풍화륜",
    "ingredients": [
      {
        "itemId": "wiki:legs:덧댄 슬리퍼",
        "itemName": "덧댄 슬리퍼",
        "quantity": 1
      },
      {
        "itemId": "material:재",
        "itemName": "재",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:legs:SCV",
    "ingredients": [
      {
        "itemId": "wiki:legs:힐리스",
        "itemName": "힐리스",
        "quantity": 1
      },
      {
        "itemId": "material:전자 부품",
        "itemName": "전자 부품",
        "quantity": 1
      }
    ],
    "sourcePage": "legs",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:glove:글러브",
    "ingredients": [
      {
        "itemId": "sample-common:목장갑",
        "itemName": "목장갑",
        "quantity": 1
      },
      {
        "itemId": "sample-common:고무",
        "itemName": "고무",
        "quantity": 1
      }
    ],
    "sourcePage": "glove",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:glove:아이언 너클",
    "ingredients": [
      {
        "itemId": "sample-common:목장갑",
        "itemName": "목장갑",
        "quantity": 1
      },
      {
        "itemId": "sample-common:고철",
        "itemName": "고철",
        "quantity": 1
      }
    ],
    "sourcePage": "glove",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:glove:건틀릿",
    "ingredients": [
      {
        "itemId": "wiki:glove:아이언 너클",
        "itemName": "아이언 너클",
        "quantity": 1
      },
      {
        "itemId": "sample-common:옷감",
        "itemName": "옷감",
        "quantity": 1
      }
    ],
    "sourcePage": "glove",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:glove:귀골 장갑",
    "ingredients": [
      {
        "itemId": "wiki:glove:글러브",
        "itemName": "글러브",
        "quantity": 1
      },
      {
        "itemId": "sample-common:거북이 등딱지",
        "itemName": "거북이 등딱지",
        "quantity": 1
      }
    ],
    "sourcePage": "glove",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:glove:윙 너클",
    "ingredients": [
      {
        "itemId": "wiki:glove:아이언 너클",
        "itemName": "아이언 너클",
        "quantity": 1
      },
      {
        "itemId": "sample-common:깃털",
        "itemName": "깃털",
        "quantity": 1
      }
    ],
    "sourcePage": "glove",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:glove:회단 장갑",
    "ingredients": [
      {
        "itemId": "wiki:glove:글러브",
        "itemName": "글러브",
        "quantity": 1
      },
      {
        "itemId": "sample-common:라이터",
        "itemName": "라이터",
        "quantity": 1
      }
    ],
    "sourcePage": "glove",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:glove:단영촌천투",
    "ingredients": [
      {
        "itemId": "wiki:glove:귀골 장갑",
        "itemName": "귀골 장갑",
        "quantity": 1
      },
      {
        "itemId": "sample-common:깃털",
        "itemName": "깃털",
        "quantity": 1
      }
    ],
    "sourcePage": "glove",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:glove:디바인 피스트",
    "ingredients": [
      {
        "itemId": "wiki:glove:건틀릿",
        "itemName": "건틀릿",
        "quantity": 1
      },
      {
        "itemId": "sample-common:십자가",
        "itemName": "십자가",
        "quantity": 1
      }
    ],
    "sourcePage": "glove",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:glove:브레이질 건틀릿",
    "ingredients": [
      {
        "itemId": "wiki:glove:건틀릿",
        "itemName": "건틀릿",
        "quantity": 1
      },
      {
        "itemId": "sample-common:오일",
        "itemName": "오일",
        "quantity": 1
      }
    ],
    "sourcePage": "glove",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:glove:블러드윙 너클",
    "ingredients": [
      {
        "itemId": "wiki:glove:윙 너클",
        "itemName": "윙 너클",
        "quantity": 1
      },
      {
        "itemId": "sample-common:원석",
        "itemName": "원석",
        "quantity": 1
      }
    ],
    "sourcePage": "glove",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:glove:빙화현옥수",
    "ingredients": [
      {
        "itemId": "wiki:glove:회단 장갑",
        "itemName": "회단 장갑",
        "quantity": 1
      },
      {
        "itemId": "sample-common:얼음",
        "itemName": "얼음",
        "quantity": 1
      }
    ],
    "sourcePage": "glove",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:glove:소수",
    "ingredients": [
      {
        "itemId": "wiki:glove:글러브",
        "itemName": "글러브",
        "quantity": 1
      },
      {
        "itemId": "material:유리 조각",
        "itemName": "유리 조각",
        "quantity": 1
      }
    ],
    "sourcePage": "glove",
    "validationStatus": "in-game-verified",
    "verifiedRecipeSource": "실제 게임 내 확인",
    "sourceDiscrepancy": "나무위키의 소수 직접 제작법은 구버전인 회단 장갑 + 유리 조각으로 표시됨. 게임 내 확인값은 글러브 + 유리 조각.",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:glove:여래수투",
    "ingredients": [
      {
        "itemId": "wiki:glove:귀골 장갑",
        "itemName": "귀골 장갑",
        "quantity": 1
      },
      {
        "itemId": "sample-common:종이",
        "itemName": "종이",
        "quantity": 1
      }
    ],
    "sourcePage": "glove",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bow:목궁",
    "ingredients": [
      {
        "itemId": "sample-common:양궁",
        "itemName": "양궁",
        "quantity": 1
      },
      {
        "itemId": "sample-common:피아노선",
        "itemName": "피아노선",
        "quantity": 1
      }
    ],
    "sourcePage": "bow",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bow:컴포지트 보우",
    "ingredients": [
      {
        "itemId": "wiki:bow:목궁",
        "itemName": "목궁",
        "quantity": 1
      },
      {
        "itemId": "sample-common:못",
        "itemName": "못",
        "quantity": 1
      }
    ],
    "sourcePage": "bow",
    "validationStatus": "in-game-verified",
    "verifiedRecipeSource": "실제 게임 내 확인",
    "sourceDiscrepancy": "나무위키 컴포지트 보우 항목의 제작 트리에 목궁 제작법이 잘못 표시되어 직접 제작법을 추출할 수 없었음. 게임 내 확인값은 목궁 + 못.",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bow:장궁",
    "ingredients": [
      {
        "itemId": "sample-common:양궁",
        "itemName": "양궁",
        "quantity": 1
      },
      {
        "itemId": "sample-common:고무",
        "itemName": "고무",
        "quantity": 1
      }
    ],
    "sourcePage": "bow",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bow:강궁",
    "ingredients": [
      {
        "itemId": "wiki:bow:목궁",
        "itemName": "목궁",
        "quantity": 1
      },
      {
        "itemId": "sample-common:오일",
        "itemName": "오일",
        "quantity": 1
      }
    ],
    "sourcePage": "bow",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bow:벽력궁",
    "ingredients": [
      {
        "itemId": "wiki:bow:장궁",
        "itemName": "장궁",
        "quantity": 1
      },
      {
        "itemId": "sample-common:화약",
        "itemName": "화약",
        "quantity": 1
      }
    ],
    "sourcePage": "bow",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bow:골든래쇼 보우",
    "ingredients": [
      {
        "itemId": "wiki:bow:목궁",
        "itemName": "목궁",
        "quantity": 1
      },
      {
        "itemId": "material:황금",
        "itemName": "황금",
        "quantity": 1
      }
    ],
    "sourcePage": "bow",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bow:엘리멘탈 보우",
    "ingredients": [
      {
        "itemId": "wiki:bow:장궁",
        "itemName": "장궁",
        "quantity": 1
      },
      {
        "itemId": "material:비파단도",
        "itemName": "비파단도",
        "quantity": 1
      }
    ],
    "sourcePage": "bow",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bow:제베의 활",
    "ingredients": [
      {
        "itemId": "wiki:bow:벽력궁",
        "itemName": "벽력궁",
        "quantity": 1
      },
      {
        "itemId": "sample-common:깃털",
        "itemName": "깃털",
        "quantity": 1
      }
    ],
    "sourcePage": "bow",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bow:트윈보우",
    "ingredients": [
      {
        "itemId": "wiki:bow:컴포지트 보우",
        "itemName": "컴포지트 보우",
        "quantity": 1
      },
      {
        "itemId": "sample-common:화학품",
        "itemName": "화학품",
        "quantity": 1
      }
    ],
    "sourcePage": "bow",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bow:편전",
    "ingredients": [
      {
        "itemId": "wiki:bow:강궁",
        "itemName": "강궁",
        "quantity": 1
      },
      {
        "itemId": "sample-field:나뭇가지",
        "itemName": "나뭇가지",
        "quantity": 1
      }
    ],
    "sourcePage": "bow",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bat:쇠파이프",
    "ingredients": [
      {
        "itemId": "sample-common:단봉",
        "itemName": "단봉",
        "quantity": 1
      },
      {
        "itemId": "sample-common:고철",
        "itemName": "고철",
        "quantity": 1
      }
    ],
    "sourcePage": "bat",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bat:장봉",
    "ingredients": [
      {
        "itemId": "sample-common:단봉",
        "itemName": "단봉",
        "quantity": 1
      },
      {
        "itemId": "sample-field:나뭇가지",
        "itemName": "나뭇가지",
        "quantity": 1
      }
    ],
    "sourcePage": "bat",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bat:도깨비 방망이",
    "ingredients": [
      {
        "itemId": "wiki:bat:장봉",
        "itemName": "장봉",
        "quantity": 1
      },
      {
        "itemId": "sample-common:못",
        "itemName": "못",
        "quantity": 1
      }
    ],
    "sourcePage": "bat",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bat:우산",
    "ingredients": [
      {
        "itemId": "wiki:bat:장봉",
        "itemName": "장봉",
        "quantity": 1
      },
      {
        "itemId": "sample-common:옷감",
        "itemName": "옷감",
        "quantity": 1
      }
    ],
    "sourcePage": "bat",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bat:구원의 여신상",
    "ingredients": [
      {
        "itemId": "wiki:bat:쇠파이프",
        "itemName": "쇠파이프",
        "quantity": 1
      },
      {
        "itemId": "material:다이아몬드",
        "itemName": "다이아몬드",
        "quantity": 1
      }
    ],
    "sourcePage": "bat",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bat:금강저",
    "ingredients": [
      {
        "itemId": "wiki:bat:쇠파이프",
        "itemName": "쇠파이프",
        "quantity": 1
      },
      {
        "itemId": "material:유리 조각",
        "itemName": "유리 조각",
        "quantity": 1
      }
    ],
    "sourcePage": "bat",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bat:스파이의 우산",
    "ingredients": [
      {
        "itemId": "wiki:bat:우산",
        "itemName": "우산",
        "quantity": 1
      },
      {
        "itemId": "sample-common:화학품",
        "itemName": "화학품",
        "quantity": 1
      }
    ],
    "sourcePage": "bat",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bat:타구봉",
    "ingredients": [
      {
        "itemId": "wiki:bat:도깨비 방망이",
        "itemName": "도깨비 방망이",
        "quantity": 1
      },
      {
        "itemId": "sample-common:피아노선",
        "itemName": "피아노선",
        "quantity": 1
      }
    ],
    "sourcePage": "bat",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  },
  {
    "resultItemId": "wiki:bat:팔괘장",
    "ingredients": [
      {
        "itemId": "wiki:bat:쇠파이프",
        "itemName": "쇠파이프",
        "quantity": 1
      },
      {
        "itemId": "material:비파단도",
        "itemName": "비파단도",
        "quantity": 1
      }
    ],
    "sourcePage": "bat",
    "validationStatus": "direct-tree-extracted",
    "outputQuantity": 1
  }
];
