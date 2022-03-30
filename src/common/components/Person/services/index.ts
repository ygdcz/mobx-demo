import { $http } from 'common/http/http';
import { get } from 'lodash-es';
import { IPerson } from '../models';

export const createAccount = async (params: IPerson) => {
  const res = await $http.post('/person', params);
  return get(res, 'data');
};

export const getAllAccounts = async () => {
  const res = await $http.get<IPerson[]>('/person');
  return get(res, 'data', []);
};

export const updateAccount = async (id: number, params: Partial<IPerson>) => {
  const res = await $http.patch<IPerson>('/person/' + id, {
    ...params
  });

  return get(res, 'data');
};
