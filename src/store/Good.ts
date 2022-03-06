import { message } from 'antd';
import { reverse } from 'lodash-es';
import { makeAutoObservable, runInAction } from 'mobx';
import { GOOD_CATEGORY, IGood } from 'pages/Goods/models';
import { getGoods, getGoodsByCategory, getMoreGoods } from 'pages/Goods/service';

class Good {
  goods: IGood[] = [];
  total: number = 0;
  loading = true;
  goodCategory: GOOD_CATEGORY | 'All' = 'All';
  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true
      }
    );
  }

  setGoodCategory(value: GOOD_CATEGORY | 'All') {
    this.goodCategory = value;
  }

  getMoreGoods(page: number, category: GOOD_CATEGORY | 'All') {
    this.loading = true;
    getMoreGoods(page, category)
      .then((res) => {
        runInAction(() => {
          this.goods = [...this.goods, ...res];
        });
        this.loading = false;
      })
      .catch((err) => (this.loading = false));
  }

  getGoodsByCateGory(category: GOOD_CATEGORY | 'All') {
    this.loading = true;
    getGoodsByCategory(category)
      .then((res) => {
        runInAction(() => {
          this.goods = res.data;
          this.total = res.total;
        });
        this.loading = false;
      })
      .catch((err) => (this.loading = false));
  }
}

const good = new Good();
export default good;
