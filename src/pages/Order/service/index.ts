import { $http } from 'common/http/http';
import { IOrder } from '../models';
import { get } from 'lodash-es';
import auth from 'store/Auth';
export const getOrderList = async () => {
  const res = await $http.get<IOrder[]>('/order', {
    params: {
      pId: auth.id
    }
  });
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
  const res = await $http.post<IOrder>('/order', { ...params, pId: auth.id });
  return get(res, 'data', {} as IOrder);
};

export const updateOrder = async (id: number, params: Partial<IOrder>) => {
  return await $http.patch<IOrder>(`/order/${id}`, { ...params, pId: auth.id });
};

export const deleteOrder = async (id: number) => {
  return await $http.delete(`/order/${id}`);
};
