import useLike from 'hooks/like';
import { makeAutoObservable } from 'mobx';

class Comment {
  likeNum = Math.floor(Math.random() * 100);
  dislikeNum = Math.floor(Math.random() * 100);
  constructor() {
    makeAutoObservable(this);
  }
}

export default new Comment();
