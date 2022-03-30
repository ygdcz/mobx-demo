import { $http } from 'common/http/http';
import { get } from 'lodash-es';
import { GOOD_CATEGORY, IGood } from '../models';

export const getGoodLists = async () => {
  const res = await $http.get<IGood[]>('/good', {
    params: { status: 1 }
  });

  return { data: get(res, 'data', []) };
};

export const getGoods = async () => {
  const res = await $http.get<IGood[]>('/good', {
    params: { _page: 1, _limit: 4, status: 1 }
  });
  const total = res.headers['x-total-count'];

  return { data: get(res, 'data', []), total };
};

export const getMoreGoods = async (page: number, category: GOOD_CATEGORY | 'All'): Promise<IGood[]> => {
  let params = {};
  if (category === 'All') {
    params = { _page: page, _limit: 4, status: 1 };
  } else {
    params = { _page: page, _limit: 4, category, status: 1 };
  }
  const res = await $http.get<IGood[]>('/good', {
    params: { ...params }
  });

  return get(res, 'data', []);
};

export const getGoodsByCategory = async (category: GOOD_CATEGORY | 'All') => {
  let params = {};
  if (category === 'All') {
    params = { _page: 1, _limit: 4, status: 1 };
  } else {
    params = { _page: 1, _limit: 4, category, status: 1 };
  }
  const res = await $http.get<IGood[]>('/good', {
    params: { ...params }
  });
  const total = res.headers['x-total-count'];
  return { data: get(res, 'data', []), total };
};

export const searchGood = async (value: string) => {
  const res = await $http.get<IGood[]>('/good', {
    params: {
      q: value,
      status: 1
    }
  });
  const total = res.headers['x-total-count'];
  return { data: get(res, 'data', []), total };
};
