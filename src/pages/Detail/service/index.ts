import { $http } from 'common/http/http';
import { get } from 'lodash-es';
import { IGood } from 'pages/Goods/models';
import { ICart } from '../models';

export const getDetail = async (id: string): Promise<IGood> => {
  const res = await $http.get<IGood[]>('/good', {
    params: {
      id
    }
  });
  return get(res, 'data[0]', []);
};

export const addCart = async (good: Partial<ICart>): Promise<ICart> => {
  const newCartGood = {
    id: good.id,
    create_time: new Date().toLocaleString(),
    price: good.price,
    num: good.num,
    name: good.name,
    img_url: good.img_url
  };
  const res = await $http.post<ICart>('/cart', newCartGood);
  return get(res, 'data');
};

export const getCart = async () => {
  const res = await $http.get<ICart[]>('/cart');
  return get(res, 'data');
};

export const updateCart = async (id: number, params: Partial<ICart>) => {
  const res = await $http.patch(`/cart/${id}`, params);
  return res.data;
};

export const deleteCartItems = async (ids: number[]) => {
  for (let i = 0; i < ids.length; i++) {
    await $http.delete(`/cart/${ids[i]}`);
  }
};
