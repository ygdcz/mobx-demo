import { Button, Card, Descriptions, Drawer, List, Popconfirm, Space, Tag, Tooltip } from 'antd';
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
                  <>
                    <Space>
                      创建时间:
                      <Tag color='#108ee9'>{moment(Number(item.createTime)).fromNow()}</Tag> 付款状态：
                      {item.status ? <Tag color='green'>已付款</Tag> : <Tag color='red'>未付款</Tag>}
                      {item.status ? (
                        <>
                          <Popconfirm title='您确定要删除这个订单吗？' onConfirm={() => order.deleteOrder(item.id)} cancelText='取消' okText='删除'>
                            <Button type='primary' size='small'>
                              删除
                            </Button>
                          </Popconfirm>
                        </>
                      ) : (
                        <>
                          <Button size='small' type='primary' style={{ marginLeft: 140 }} onClick={() => goToOrderPage(item.id)}>
                            去付款
                          </Button>
                          <Popconfirm title='您确定要取消订单吗？' onConfirm={() => order.deleteOrder(item.id)} cancelText='再想想' okText='取消'>
                            <Button size='small' type='primary'>
                              取消订单
                            </Button>
                          </Popconfirm>
                        </>
                      )}
                    </Space>
                  </>
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
                    {item.status === 1 && (
                      <Descriptions bordered style={{ width: 250, marginLeft: 30 }} layout='vertical' title='下单信息'>
                        <Descriptions.Item label='总价' key='total' span={1}>
                          {
                            <p>
                              ¥ <span>{item.totalAmount}</span>
                            </p>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item label='联系人' key='contact' span={2}>
                          {
                            <p>
                              {item.personInformation?.contact.name} {item.personInformation?.contact.sex === 'male' ? '先生' : '女士'}
                            </p>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item label='送货时间' key='time' span={3}>
                          {<Tooltip title={moment(item.personInformation?.time).fromNow()}>{item.personInformation?.time}</Tooltip>}
                        </Descriptions.Item>
                        <Descriptions.Item label='地址' key='address' span={3}>
                          {item.personInformation?.address.province.join('/')}
                          {item.personInformation?.address.place}
                        </Descriptions.Item>
                      </Descriptions>
                    )}
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
