import { $http } from 'common/http/http';
import { IOrder } from '../models';
import { get } from 'lodash-es';
export const getOrderList = async () => {
  const res = await $http.get<IOrder[]>('/order');
  return get(res, 'data', []);
};
export const getOrderById = async (id: number) => {
  const res = await $http.get<IOrder[]>('/order', {
    params: {
      id
    }
  });
  return get(res, 'data', []);
};

export const addOrder = async (params: Partial<IOrder>) => {
  const res = await $http.post<IOrder>('/order', params);
  return get(res, 'data', {} as IOrder);
};

export const updateOrder = async (id: number, params: Partial<IOrder>) => {
  await $http.patch<IOrder>(`/order/${id}`, params);
};
