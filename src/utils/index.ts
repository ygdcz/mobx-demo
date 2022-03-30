import { isNil } from 'lodash-es';

function formatKey(key: string) {
  return `cao_di_${key}`.toUpperCase();
}

function getItem(key: string) {
  const str = localStorage.getItem(formatKey(key)) as string;
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

function removeItem(key: string) {
  localStorage.removeItem(formatKey(key));
}

function setItem(key: string, data: ISafeAny) {
  localStorage.setItem(formatKey(key), JSON.stringify(data));
}

const $storage = {
  get token() {
    return getItem('token') || '';
  },
  set token(data: string) {
    setItem('token', data);
  },
  get username() {
    return getItem('username') || '';
  },
  set username(data: string) {
    setItem('username', data);
  },
  get phoneNumber() {
    return getItem('phone_number') || 0;
  },
  set phoneNumber(data: number) {
    setItem('phone_number', data);
  },
  get userId() {
    return getItem('user_id') || -1;
  },
  set userId(data: number) {
    setItem('user_id', data);
  },
  get config() {
    return getItem('config') || {};
  },
  set config(value: IConfig) {
    setItem('config', value);
  },
  get rememberAccount() {
    const remember = getItem('remember_account');
    return isNil(remember) ? true : remember;
  },
  set rememberAccount(value: boolean) {
    setItem('remember_account', value);
  },
  get lastLoginAccount() {
    return getItem('last_login_account') || '';
  },
  set lastLoginAccount(value: string) {
    setItem('last_login_account', value);
  },
  get flags() {
    return getItem('flags') || {};
  },
  set flags(value) {
    setItem('flags', value);
  },
  clear() {
    removeItem('token');
    removeItem('username');
  }
};
export { $storage };
