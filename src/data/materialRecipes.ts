import type { CraftingRecipe } from '../domain/models';

/** Direct material recipes, preserving units produced by one crafting action. */
export interface ExtractedMaterialRecipe extends CraftingRecipe {
  ingredients: Array<{ itemId: string; itemName: string; quantity: number }>;
  sourceUrl: string;
  validationStatus: 'direct-tree-extracted';
}

export const materialRecipes: ExtractedMaterialRecipe[] = [
  {
    "resultItemId": "material:기름먹인 천",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:오일",
        "itemName": "오일",
        "quantity": 1
      },
      {
        "itemId": "sample-common:붕대",
        "itemName": "붕대",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:다이아몬드",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:흑연",
        "itemName": "흑연",
        "quantity": 1
      },
      {
        "itemId": "sample-common:라이터",
        "itemName": "라이터",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:독약",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:화학품",
        "itemName": "화학품",
        "quantity": 1
      },
      {
        "itemId": "sample-common:유리병",
        "itemName": "유리병",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:루비",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:원석",
        "itemName": "원석",
        "quantity": 1
      },
      {
        "itemId": "sample-common:라이터",
        "itemName": "라이터",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:비파단도",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:마패",
        "itemName": "마패",
        "quantity": 1
      },
      {
        "itemId": "sample-common:피아노선",
        "itemName": "피아노선",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:운명의 꽃",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-field:꽃",
        "itemName": "꽃",
        "quantity": 1
      },
      {
        "itemId": "sample-common:원석",
        "itemName": "원석",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:유리 조각",
    "outputQuantity": 2,
    "ingredients": [
      {
        "itemId": "sample-common:유리병",
        "itemName": "유리병",
        "quantity": 1
      },
      {
        "itemId": "sample-field:돌멩이",
        "itemName": "돌멩이",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:이온 전지",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:배터리",
        "itemName": "배터리",
        "quantity": 1
      },
      {
        "itemId": "sample-common:흑연",
        "itemName": "흑연",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:재",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:종이",
        "itemName": "종이",
        "quantity": 1
      },
      {
        "itemId": "sample-common:라이터",
        "itemName": "라이터",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:전자 부품",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:배터리",
        "itemName": "배터리",
        "quantity": 1
      },
      {
        "itemId": "sample-common:피아노선",
        "itemName": "피아노선",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:정교한 도면",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:만년필",
        "itemName": "만년필",
        "quantity": 1
      },
      {
        "itemId": "sample-common:종이",
        "itemName": "종이",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:철사",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:피아노선",
        "itemName": "피아노선",
        "quantity": 1
      },
      {
        "itemId": "sample-common:플라스틱",
        "itemName": "플라스틱",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:철판",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:고철",
        "itemName": "고철",
        "quantity": 1
      },
      {
        "itemId": "sample-common:화학품",
        "itemName": "화학품",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:하드커버",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:종이",
        "itemName": "종이",
        "quantity": 1
      },
      {
        "itemId": "sample-common:덧댄 가죽",
        "itemName": "덧댄 가죽",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:화살통",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:깃털",
        "itemName": "깃털",
        "quantity": 1
      },
      {
        "itemId": "sample-field:나뭇가지",
        "itemName": "나뭇가지",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:황금",
    "outputQuantity": 2,
    "ingredients": [
      {
        "itemId": "sample-common:곡괭이",
        "itemName": "곡괭이",
        "quantity": 1
      },
      {
        "itemId": "sample-common:원석",
        "itemName": "원석",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:모터",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "material:전자 부품",
        "itemName": "전자 부품",
        "quantity": 1
      },
      {
        "itemId": "sample-common:고철",
        "itemName": "고철",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  },
  {
    "resultItemId": "material:아이테르 깃털",
    "outputQuantity": 1,
    "ingredients": [
      {
        "itemId": "sample-common:깃털",
        "itemName": "깃털",
        "quantity": 1
      },
      {
        "itemId": "material:운명의 꽃",
        "itemName": "운명의 꽃",
        "quantity": 1
      }
    ],
    "sourceUrl": "https://namu.wiki/w/이터널%20리턴/아이템/재료",
    "validationStatus": "direct-tree-extracted"
  }
];
