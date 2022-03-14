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
    id: new Date().getTime(),
    create_time: new Date().toLocaleString(),
    price: good.price,
    num: good.num,
    name: good.name,
    img_url: good.img_url
  };
  const res = await $http.post<ICart>('/cart', newCartGood);
  return get(res, 'data');
};
