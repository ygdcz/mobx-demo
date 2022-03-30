import { message, notification } from 'antd';
import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { ICart } from 'pages/Detail/models';
import { addCart, deleteCartItems, getCart, updateCart } from 'pages/Detail/service';

class Cart {
  cart: ICart[] = [];
  checkedIds: number[] = [];
  checkedCart: ICart[] = [];
  constructor() {
    makeAutoObservable(
      this,
      {},
      { autoBind: true } // 自动绑定this
    );
  }
  get cartNum() {
    return this.cart.length;
  }
  addCart(good: Partial<ICart>) {
    addCart(good).then((res) => {
      runInAction(() => {
        this.cart.push(res);
        notification.open({
          message: '添加至购物车成功',
          placement: 'bottomLeft'
        });
      });
    });
  }
  getCart() {
    getCart().then((res) => {
      runInAction(() => {
        this.cart = res;
      });
    });
  }
  updateCart(id: number, good: Partial<ICart>) {
    updateCart(id, good).then((res) => {
      runInAction(() => {
        this.cart = this.cart.map((item) => {
          if (item.id === res.id) {
            return res;
          }
          return item;
        });
      });
    });
  }
  deleteCartItems(ids: number[]) {
    deleteCartItems(ids).then(() => {
      runInAction(() => {
        this.cart = this.cart.filter((item) => !ids.includes(item.id));
      });
    });
  }
}

const cart = new Cart();

// reaction, autorun 监听属性

export default cart;
