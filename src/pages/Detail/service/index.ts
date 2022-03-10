import { $http } from 'common/http/http';
import { get } from 'lodash-es';
import { IGood } from 'pages/Goods/models';

export const getDetail = async (id: string): Promise<IGood> => {
  const res = await $http.get<IGood[]>('/good', {
    params: {
      id
    }
  });
  return get(res, 'data[0]', []);
};
