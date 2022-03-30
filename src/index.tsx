import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import App from 'App';
import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
// 设置中文
moment.locale('zh-cn');

ReactDOM.render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
