import { message } from 'antd';
import { makeAutoObservable, runInAction } from 'mobx';
import { IOrder } from 'pages/Order/models';
import { addOrder, deleteOrder, getOrderById, getOrderList, updateOrder } from 'pages/Order/service';

class Order {
  orderList: IOrder[] = [];
  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true
      }
    );
  }
  addOrder(params: Partial<IOrder>) {
    if (this.orderList.findIndex((item) => item.id === params.id) !== -1) {
      message.warn('订单创建失败，请重新选择商品并下单');
      return;
    }
    addOrder(params).then((res) => {
      runInAction(() => {
        this.orderList.push(res);
      });
    });
  }
  updateOrder(id: number, params: Partial<IOrder>) {
    updateOrder(id, params);
  }
  getOrder() {
    getOrderList().then((res) => {
      runInAction(() => {
        this.orderList = res;
      });
    });
  }
  getOrderById(id: number) {
    return getOrderById(id).then((res) => res[0]);
  }
  deleteOrder(id: number) {
    deleteOrder(id).then((res) => {
      runInAction(() => {
        this.orderList = this.orderList.filter((item) => item.id !== id);
      });
    });
  }
}

const order = new Order();

export default order;
