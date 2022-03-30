import { Button, Card, List, Space, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { observer } from 'mobx-react';
import moment from 'moment';
import { IOrder } from 'pages/Order/models';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from 'store';
import styles from './index.module.scss';

function OrderList() {
  const { order } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    order.getOrder();
  }, [order]);
  const goToOrderPage = (id: number) => {
    navigate('order', {
      state: {
        orderId: id
      }
    });
  };
  return (
    <>
      <List
        bordered
        className={styles['list']}
        style={{ marginBottom: 10 }}
        dataSource={order.orderList.slice().reverse()}
        pagination={{
          pageSize: 3
        }}
        renderItem={(item, index) => {
          return (
            <List.Item key={index}>
              <List.Item.Meta
                title={
                  <Space>
                    创建时间:
                    <Tag color='#108ee9'>{moment(Number(item.createTime)).fromNow()}</Tag> 付款状态：
                    {item.status ? <Tag color='green'>已付款</Tag> : <Tag color='red'>未付款</Tag>}
                    {item.status ? (
                      <></>
                    ) : (
                      <>
                        <Button size='small' type='primary' style={{ marginLeft: 140 }} onClick={() => goToOrderPage(item.id)}>
                          去付款
                        </Button>
                        <Button size='small' type='primary'>
                          取消订单
                        </Button>
                      </>
                    )}
                  </Space>
                }
                description={
                  <>
                    {item.items.map((item, index) => (
                      <Card cover={<img alt={item.name} src={item.img_url} />} key={index}>
                        <Meta
                          title={item.name}
                          description={
                            <Space>
                              <span>购买数量: {item.num}</span>
                              <span>单价: {item.price}</span>
                            </Space>
                          }
                        ></Meta>
                      </Card>
                    ))}
                    <p>
                      总价: ¥<span style={{ color: 'red', marginTop: 5 }}>{item.totalAmount}</span>
                    </p>
                  </>
                }
              />
            </List.Item>
          );
        }}
      ></List>
    </>
  );
}

export default observer(OrderList);
