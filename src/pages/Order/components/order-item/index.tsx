import { Divider, Space } from 'antd';
import React from 'react';
import styles from './index.module.scss';
export interface IOrderItem {
  img_url?: string;
  name?: string;
  num?: number;
  price?: number;
}
interface IProps {
  item: IOrderItem;
}
export default function OrderItem(props: IProps) {
  const { item } = props;
  const { name = '', img_url = '', num = 0, price = 0 } = item;
  return (
    <div className={styles['container']}>
      <div className={styles['image']}>
        <img src={img_url} alt={name} />
      </div>
      <div className={styles['content']}>
        <p className={styles['name']}>{name}</p>
        <div className={styles['price']}>
          <Space size={10}>
            <p>
              单价: <span className={styles['text']}>¥{price}</span>
            </p>
            <p>
              购买数量: <span className={styles['text']}>{num}</span>
            </p>
          </Space>
        </div>
        <p>总价：¥{(num * price).toFixed(1)} </p>
      </div>
    </div>
  );
}
