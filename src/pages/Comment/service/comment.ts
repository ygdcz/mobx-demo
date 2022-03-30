import { $http } from 'common/http/http';
import { IComment } from 'common/model/type';
import { get } from 'lodash-es';
import auth from 'store/Auth';

const ACTION = {
  liked: 1,
  disliked: -1
};

export const getCommentList = async (goodId: number): Promise<IComment[]> => {
  const res = await $http.get<ISafeAny[]>('/comment', {
    params: {
      goodId
    }
  });
  return get(res, 'data', []).map((data) => ({
    ...data,
    status: data.status === 1 ? 'liked' : data.status === -1 ? 'disliked' : null
  }));
};

export const addComment = async (goodId: number, comment: string): Promise<IComment> => {
  const newComment = {
    status: null,
    id: new Date().getTime(),
    author: auth.username,
    time: new Date().toLocaleString(),
    comment,
    like: 0,
    dislike: 0,
    goodId,
    pId: auth.id
  };
  const res = await $http.post<IComment>('/comment', newComment);
  return get(res, 'data');
};

export const deleteComment = async (id: number) => {
  await $http.delete(`/comment/${id}`);
};

export const updateComment = async (id: number, comment: Partial<IComment>) => {
  await $http.patch(`/comment/${id}`, comment);
};

export const updateLike = async (id: number, like: Partial<IComment>) => {
  const _comment = like.status === null ? 0 : ACTION[like.status!];

  await $http.patch(`/comment/${id}`, { ...like, status: _comment });
};
