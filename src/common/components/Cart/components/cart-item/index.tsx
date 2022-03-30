import { Divider, InputNumber } from 'antd';
import { ICart } from 'pages/Detail/models';
import styles from './index.module.scss';
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import useStore from 'store';
interface IProps {
  item: ICart;
  OnReturnPrice: (data: { id: number; total: number }) => void;
}
const CartItem = (props: IProps) => {
  const { item, OnReturnPrice } = props;
  const { cart } = useStore();
  const [num, setNum] = useState(item.num);
  return (
    <div className={styles['container']}>
      <div className={styles['image']}>
        <img src={item.img_url} alt={item.name} width={200} />
      </div>
      <div className={styles['content']}>
        <p>{item.name}</p>
        <p>单价: ¥{item.price}</p>
        <div
          className={styles['num']}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <InputNumber
            prefix='已选'
            defaultValue={item.num}
            min={1}
            max={item.limitation || undefined}
            onChange={(value) => {
              setNum(value);
              cart.updateCart(item.id, { num: value });
              OnReturnPrice({ id: item.id, total: value * item.price });
            }}
          />
        </div>
        <div className={styles['total']}>该项总价: ¥{(num * item.price).toFixed(1)}</div>
      </div>
    </div>
  );
};
export default CartItem;
