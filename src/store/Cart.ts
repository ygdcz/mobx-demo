import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { ICart } from 'pages/Detail/models';
import { addCart } from 'pages/Detail/service';

class Cart {
  cart: ICart[] = [];
  constructor() {
    makeAutoObservable(
      this,
      {
        // increment: false 排除increment 是可观察的属性或方法
      },
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
      });
    });
  }
}

const cart = new Cart();

// reaction, autorun 监听属性

export default cart;
