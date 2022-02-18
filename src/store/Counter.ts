import { makeAutoObservable, reaction } from 'mobx';

class Counter {
  count = 0;
  constructor() {
    makeAutoObservable(
      this,
      {
        // increment: false 排除increment 是可观察的属性或方法
      },
      { autoBind: true } // 自动绑定this
    );
  }
  get num() {
    return this.count;
  }
  increment() {
    this.count++;
  }
}

const counter = new Counter();

// reaction, autorun 监听属性

export default counter;
