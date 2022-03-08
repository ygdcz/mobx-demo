import { makeAutoObservable, reaction, runInAction } from 'mobx';

class Cart {
  cart: { name: string }[] = [];
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
  addCart() {
    runInAction(() => {
      this.cart.push({ name: 'abc' });
    });
  }
}

const cart = new Cart();

// reaction, autorun 监听属性

export default cart;
