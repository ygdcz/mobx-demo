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

export const category = ['dairy', 'fruit', 'meat', 'drink'];
