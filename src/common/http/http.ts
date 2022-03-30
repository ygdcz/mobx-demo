import axios from 'axios';
import auth from 'store/Auth';

const $http = axios.create({
  baseURL: 'http://localhost:8888/',
  timeout: 5000,
  timeoutErrorMessage: '出错了'
});

export { $http };
