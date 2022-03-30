import { $storage } from 'utils';
import { makeAutoObservable } from 'mobx';

class Auth {
  username = $storage.username;
  token = $storage.token;
  phoneNumber = $storage.phoneNumber;
  id = $storage.userId;

  constructor() {
    makeAutoObservable(this);
  }

  setUsername(username: string) {
    this.username = username;
    $storage.username = username;
  }

  setToken(token: string) {
    this.token = token;
    $storage.token = token;
  }

  setPhoneNumber(phoneNumber: number) {
    this.phoneNumber = phoneNumber;
    $storage.phoneNumber = phoneNumber;
  }

  setUserId(id: number) {
    this.id = id;
    $storage.userId = id;
  }

  clear = () => {
    this.setToken('');
    this.setUsername('');
    this.setPhoneNumber(0);
    this.setUserId(-1);
  };
}

const auth = new Auth();
export default auth;
