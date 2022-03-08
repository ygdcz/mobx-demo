import { Card, Skeleton, Tag, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { observer } from 'mobx-react-lite';
import React, { lazy, useEffect } from 'react';
import useStore from 'store';
import { IGood } from '../models';
import styles from '../index.module.scss';
import { toString } from 'lodash-es';
import { ShoppingCartOutlined } from '@ant-design/icons';
interface IGoodItem {
  item: IGood;
}

const GoodItem = ({ item }: IGoodItem) => {
  const { good, cart } = useStore();
  const { loading } = good;
  const description = item.keyword ? (
    <>
      <Tag color='blue'>{item.keyword}</Tag>
      <span className={styles['ellipsis']}>{`| ${item.description}`}</span>
    </>
  ) : (
    <span className={styles['ellipsis']}>{item.description}</span>
  );
  const formatPrice = toString(item.price.toFixed(1)),
    priceHead = formatPrice.split('.')[0],
    priceRest = '.' + formatPrice.split('.')[1];
  const price = (
    <span className={styles['price']} key='price'>
      ¥{priceHead}
      <span className={styles['price-rest']}>{priceRest}</span>
      <span className={styles['price-unit']}>/{item.unit}</span>
    </span>
  );

  return (
    <div className={styles['good-item']}>
      <Card
        hoverable
        loading={loading}
        style={{ width: 260, marginTop: 45 }}
        cover={<Image src={item.img_url} />}
        actions={[price, <ShoppingCartOutlined key='purchase' style={{ fontSize: 26 }} onClick={cart.addCart} />]}
      >
        <Meta title={item.name} description={description} />
      </Card>
    </div>
  );
};

export default observer(GoodItem);
