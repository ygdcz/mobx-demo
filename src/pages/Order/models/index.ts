import { ICart } from 'pages/Detail/models';

interface IPersonInformation {
  address: {
    province: string[];
    place: string;
  };
  contact: {
    name: string;
    sex: string;
  };
  time: string;
}

export interface IOrder {
  id: number; // 订单号
  createTime: string;
  totalAmount: number;
  status: number; // 0 代付款 1 代发货
  items: Partial<ICart>[];
  personInformation?: IPersonInformation;
  pId: number;
}
