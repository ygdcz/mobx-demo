export interface IComment {
  id: number;
  author: string;
  comment: string;
  time: string;
  status: 'disliked' | 'liked' | null;
  like: number;
  dislike: number;
  parentId: number | null;
  extra: IComment[];
}
export enum GOOD_CATEGORY {
  dairy = 'Dairy',
  fruit = 'Fruit'
}

export enum GOOD_KEYWORD {
  bargain = '特价',
  refrigerate = '冷藏'
}

export interface IGood {
  id: number;
  name: string;
  description?: string[];
  img_url: string;
  price: number;
  num: number;
  status: number;
  limitation: null | number;
  unit: string;
  category: GOOD_CATEGORY;
  keyword?: GOOD_KEYWORD;
  originPrice?: number;
}
