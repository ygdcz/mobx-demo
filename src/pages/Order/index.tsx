import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { Button, Cascader, DatePicker, Descriptions, Form, Input, List, PageHeader, Result, Select, Tag, TimePicker } from 'antd';
import useStore from 'store';
import { IGood } from 'pages/Goods/models';
import OrderItem from './components/order-item';
import { ICart } from 'pages/Detail/models';
import { observer } from 'mobx-react';
import person from 'store/Person';
import moment from 'moment';
import { useForm } from 'antd/lib/form/Form';

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('pending');
  const [time, setTime] = useState<string>('');
  const [isConfirm, setIsConfirm] = useState(false);
  const [data, setData] = useState<Partial<ICart>[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const state = location.state as { items: { id: number; num: number }[]; totalAmount: number; orderId: number };

  const ids = state?.items?.map((item) => item.id);
  const { good, order } = useStore();
  const [form] = useForm();
  useEffect(() => {
    if (location.state === null) {
      navigate('/403');
    }
    if (!state?.items && state?.orderId) {
      order.getOrderById(state?.orderId).then((res) => {
        setData(res.items);
        setTotal(res.totalAmount);
      });
      return;
    }
    good.getGoodLists();
  }, [order, location]);

  const getNewData = (good: IGood[]) => {
    return good
      .filter((goodItem) => ids?.includes(goodItem.id))
      .map((cartItem) => ({
        img_url: cartItem.img_url[0],
        name: cartItem.name,
        num: state?.items.filter((item) => item.id === cartItem.id)[0].num,
        price: cartItem.price
      }));
  };

  const purchase = () => {
    order.updateOrder(state?.orderId, { status: 1 });
    setStatus('completed');
  };
  function disabledDate(current: ISafeAny) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  const onSubmit = () => {
    form.validateFields().then((res) => {
      console.log(res, state?.orderId);

      order.updateOrder(state?.orderId, {
        personInformation: {
          ...res,
          time: res.time._d.toLocaleString()
        }
      });
    });
  };
  useEffect(() => {
    if (getNewData(good.goods).length === 0 || status === 'completed') return;
    order.addOrder({
      id: state?.orderId,
      createTime: new Date().getTime().toString(),
      totalAmount: state?.totalAmount,
      status: 0, // 0 代付款 1 代发货
      items: getNewData(good.goods)
    });
  }, [good, order]);

  return (
    <>
      <div className={styles['container']} hidden={status === 'completed'}>
        <PageHeader
          onBack={() => navigate('/good')}
          title='付款确认页'
          tags={<Tag color='blue'>待付款</Tag>}
          extra={[
            <Button key='purchase' size='large' danger onClick={purchase}>
              付款 ¥{state?.totalAmount || total}
            </Button>
          ]}
        />
        <List
          itemLayout='horizontal'
          dataSource={data.length > 0 ? data : getNewData(good.goods)}
          renderItem={(item, index) => <OrderItem item={item} key={index} />}
        />
      </div>
      <div className={styles['container']} hidden={status === 'pending'}>
        <PageHeader title='订单页' tags={<Tag color='green'>已付款</Tag>} />
        <div className={styles['info']} hidden={isConfirm}>
          <Form labelCol={{ span: 4 }} form={form} initialValues={person.currentAccount().information}>
            <Form.Item label='联系人' style={{ height: 30 }}>
              <Input.Group compact>
                <Form.Item name={['contact', 'name']}>
                  <Input style={{ width: 50 }} />
                </Form.Item>
                <Form.Item name={['contact', 'sex']} initialValue={person.currentAccount().information?.sex}>
                  <Select>
                    <Select.Option key='male' value='male'>
                      先生
                    </Select.Option>
                    <Select.Option key='female' value='female'>
                      女士
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item name='time' label='送货时间'>
              <DatePicker
                style={{ width: 296 }}
                placeholder='请选择送货时间'
                showTime
                format='YYYY-MM-DD HH:mm:ss'
                showNow
                minuteStep={15}
                showSecond={false}
                onChange={(time, timeString) => setTime(timeString)}
                disabledDate={disabledDate}
              />
            </Form.Item>
            <Form.Item label='地址' style={{ height: 30 }}>
              <Input.Group compact>
                <Form.Item name={['address', 'province']} noStyle required>
                  <Cascader
                    placeholder='城市/区/街道'
                    style={{ width: 200 }}
                    options={[
                      {
                        value: 'shanghai',
                        label: '上海',
                        children: [
                          {
                            value: 'puDong',
                            label: '浦东',
                            children: [{ value: 'street A', label: 'a街道' }]
                          },
                          {
                            value: 'huangPu',
                            label: '黄浦',
                            children: [{ value: 'street B', label: 'b街道' }]
                          },
                          {
                            value: 'xuPu',
                            label: '徐浦',
                            children: [{ value: 'street C', label: 'c街道' }]
                          },
                          {
                            value: 'jingAn',
                            label: '静安',
                            children: [{ value: 'street D', label: 'd街道' }]
                          }
                        ]
                      }
                    ]}
                  />
                </Form.Item>
                <Form.Item name={['address', 'place']} required>
                  <Input placeholder='详细地址，请具体到小区或门牌号' style={{ width: 300 }} />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 16, offset: 4 }} style={{ marginTop: 10 }}>
              <Button onClick={onSubmit} htmlType='submit' loading={loading}>
                确认
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div hidden={!isConfirm}>
          <Result
            status='success'
            title={`成功购买商品, 送货时间: ${time}`}
            subTitle={`期待下次您的光临`}
            extra={[
              <Button type='primary' key='home' onClick={() => navigate('/')}>
                回到首页
              </Button>
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default observer(Order);
