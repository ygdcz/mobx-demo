import { $http } from 'common/http/http';
import { IComment } from 'common/model/type';
import { get } from 'lodash-es';

export const getCommentList = async (): Promise<IComment[]> => {
  const res = await $http.get<ISafeAny[]>('/list');
  return get(res, 'data', []).map((data) => ({
    ...data,
    status: data.status === 1 ? 'liked' : data.status === -1 ? 'disliked' : null
  }));
};

export const addComment = async (comment: string): Promise<IComment> => {
  const newComment = {
    status: null,
    id: new Date().getTime(),
    author: 'random',
    time: new Date().toLocaleString(),
    comment,
    like: 0,
    dislike: 0
  };
  const res = await $http.post<IComment>('/list', newComment);
  return get(res, 'data');
};
