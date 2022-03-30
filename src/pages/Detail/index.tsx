import { Button, Carousel, Descriptions, Divider, Drawer, Image, InputNumber, message, Tag } from 'antd';
import Comment from 'pages/Comment';
import { observer } from 'mobx-react-lite';
import { IGood } from 'pages/Goods/models';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.scss';
import useStore from 'store';
import GoBack from 'common/components/go-back';
import { TagColor } from 'constant';
import { toString } from 'lodash-es';
import { ShoppingCartOutlined } from '@ant-design/icons';
import auth from 'store/Auth';
interface IProps {
  good?: IGood;
}
const Detail = (props: IProps) => {
  const { detail, cart } = useStore();
  const { detail: goodDetail } = detail;
  const { addCart } = cart;
  const [visible, setVisible] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const navigate = useNavigate();
  const [num, setNum] = useState(1);
  const showDrawer = () => {
    setShowComment(true);
  };
  const onClose = () => {
    setShowComment(false);
  };
  const params = useParams();

  useEffect(() => {
    detail.getDetail(params.id!);
    if (!goodDetail.name) navigate('/404');
  }, [params.id]);

  const formatPrice = toString(goodDetail.price.toFixed(1)),
    priceHead = formatPrice.split('.')[0],
    priceRest = '.' + formatPrice.split('.')[1];

  const price = (
    <span className={styles['price']} key='price'>
      ¥ {priceHead}
      <span className={styles['price-rest']}>{priceRest}</span>
      <span className={styles['price-unit']}>/{goodDetail.unit}</span>
    </span>
  );

  const onAddCart = () => {
    const params = {
      img_url: goodDetail.img_url[0],
      id: goodDetail.id,
      name: goodDetail.name,
      num,
      price: goodDetail.price,
      limitation: goodDetail.limitation
    };

    cart.cart.findIndex((cart) => {
      return cart.id === goodDetail.id;
    }) >= 0
      ? message.info('此商品您已添加过购物车了。')
      : addCart({ ...params });
  };

  return (
    <div className={styles['detail-container']}>
      <main>
        <GoBack />
        <div className={styles['image-container']}>
          <Carousel autoplay dots={false}>
            {goodDetail.img_url.map((img, index) => (
              <div className={styles['image']} key={index}>
                <Image src={img} width={300} preview={{ visible: false }} onClick={() => setVisible(true)} />
                <span className={styles['page']}>{`${index + 1}/${goodDetail.img_url.length}`}</span>
              </div>
            ))}
          </Carousel>
          <div style={{ display: 'none' }}>
            <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
              {goodDetail.img_url.map((img, index) => (
                <Image src={img} key={index} />
              ))}
            </Image.PreviewGroup>
          </div>
        </div>
        <div className={styles['content']}>
          <h1 className={styles['name']}>{goodDetail.name}</h1>
          <h1 className={styles['desc']}>
            {goodDetail.description &&
              goodDetail.description.map((desc, index) => (
                <Tag color={TagColor[index]} key={index}>
                  {desc}
                </Tag>
              ))}
          </h1>
          <div className={styles['price-and-comment']}>
            <p className={styles['price']}>价格: {price}</p>
            <Divider type='vertical' style={{ fontSize: 30 }} />
            <Button type='link' onClick={showDrawer}>
              点击查看评价
            </Button>
            <Drawer visible={showComment} onClose={onClose}>
              <Comment goodId={goodDetail.id} />
            </Drawer>
          </div>
          <Divider />
          <div className={styles['purchase']}></div>
          <InputNumber
            defaultValue={num}
            max={goodDetail.limitation || undefined}
            min={0}
            style={{ width: 50, marginRight: 10 }}
            type='number'
            onChange={(v) => setNum(v)}
          />
          <Button icon={<ShoppingCartOutlined />} danger onClick={onAddCart} disabled={auth.id === -1}>
            加入购物车
          </Button>
        </div>
      </main>
      <footer>
        <Descriptions title='商品 信息' bordered>
          <Descriptions.Item label='名称' key={goodDetail.name}>
            {goodDetail.name}
          </Descriptions.Item>
          <Descriptions.Item label='描述' key='description'>
            {goodDetail.description?.join(',')}
          </Descriptions.Item>
          <Descriptions.Item label='标签' key='tag'>
            {goodDetail.keyword || '-'}
          </Descriptions.Item>
          <Descriptions.Item label='购买限制' key='limitation'>
            {goodDetail.limitation || '无'}
          </Descriptions.Item>
          <Descriptions.Item label='库存' key='num'>
            {goodDetail.num}
          </Descriptions.Item>
          <Descriptions.Item label='单位' key='unit'>
            {goodDetail.unit}
          </Descriptions.Item>
        </Descriptions>
      </footer>
    </div>
  );
};

export default observer(Detail);
