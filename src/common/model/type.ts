export interface IComment {
  id: number;
  author: string;
  comment: string;
  time: string;
  status: 'disliked' | 'liked' | null;
  like: number;
  dislike: number;
  reply: IComment[];
}
