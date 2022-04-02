import React, { useEffect, useState } from 'react';
import { AutoComplete, Col, Row, Statistic } from 'antd';
import useStore from 'store';
import { IGood } from 'pages/Goods/models';
import { useNavigate } from 'react-router-dom';
import { SkypeOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
const Home = () => {
  const { good } = useStore();

  return (
    <div className={styles['home']}>
      <div>
        <SkypeOutlined style={{ fontSize: 70, color: 'red' }} />
        <span className={styles['text']}>生鲜超市</span>
        <span>游客点击购买，指引去登陆</span>
      </div>
      <img src='https://img1.baidu.com/it/u=1134622122,710615167&fm=253&fmt=auto&app=138&f=JPEG?w=741&h=445' />
    </div>
  );
};
export default Home;
