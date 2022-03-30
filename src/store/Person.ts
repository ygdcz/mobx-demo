import { message } from 'antd';
import { IPerson, SEX } from 'common/components/Person/models';
import { createAccount, getAllAccounts, updateAccount } from 'common/components/Person/services';
import { makeAutoObservable, runInAction } from 'mobx';
import auth from './Auth';

class Person {
  personList: IPerson[] = [];
  currentPerson: IPerson = {
    phoneNumber: 0,
    username: '',
    password: '',
    id: -1,
    information: { sex: SEX.other, address: { place: '', province: [] } }
  };
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  getPersonList() {
    getAllAccounts().then((res) => {
      runInAction(() => {
        this.personList = res;
      });
    });
  }
  createAccount(params: IPerson) {
    createAccount(params).then((res) => {
      runInAction(() => {
        this.personList.push(res);
        message.success('注册成功！');
      });
    });
  }
  updateAccount(params: { sex: SEX; address: { place: string; province: string[] } }) {
    const id = this.personList.filter((item) => item.username === auth.username && item.password === auth.token)[0].id;
    updateAccount(id, { information: params }).then((res) => {
      runInAction(() => {
        this.personList = this.personList.map((item) => {
          if (item.id === id) {
            return res;
          }
          return item;
        });
        message.success('提交个人信息成功');
      });
    });
  }
  currentAccount() {
    console.log(
      this.personList.filter((item) => {
        if (item.username === auth.username && item.password === auth.token) {
          auth.setUserId(item.id);
          return true;
        }
        return false;
      })[0]
    );

    return this.personList.filter((item) => {
      if (item.username === auth.username && item.password === auth.token) {
        auth.setUserId(item.id);
        return true;
      }
      return false;
    })[0];
  }
}

const person = new Person();
export default person;
