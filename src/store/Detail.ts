import { message } from 'antd';
import { makeAutoObservable, runInAction } from 'mobx';
import { getDetail } from 'pages/Detail/service';
import { GOOD_CATEGORY, IGood } from 'pages/Goods/models';

class Detail {
  detail: IGood = {
    id: 0,
    name: '',
    img_url: [''],
    price: 0,
    num: 0,
    status: 0,
    limitation: null,
    unit: '',
    category: GOOD_CATEGORY.dairy
  };
  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true
      }
    );
  }
  getDetail(id: string) {
    getDetail(id).then((res) => {
      runInAction(() => {
        this.detail = res;
        message.success('获取详细数据成功');
      });
    });
  }
}

const detail = new Detail();
export default detail;
