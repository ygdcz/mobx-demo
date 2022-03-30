export interface IComment {
  id: number;
  pId: number;
  author: string;
  comment: string;
  time: string;
  status: 'disliked' | 'liked' | null;
  like: number;
  dislike: number;
  parentId: number | null;
  goodId: number;
  extra: IComment[];
}

export const category = ['dairy', 'fruit', 'meat', 'drink'];
