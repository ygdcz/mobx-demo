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
    const now = moment();
    return current && (current < now.startOf('day') || current > now.add(6, 'months'));
  }

  function disabledHours() {
    const HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    return HOURS.filter((hour) => hour < new Date().getHours());
  }

  function disabledMinutes() {
    const MINUTES: number[] = [];
    let i = 0;
    while (MINUTES.length < 60) {
      MINUTES.push(i++);
    }
    return MINUTES.filter((minute) => minute < new Date().getMinutes());
  }

  const onSubmit = () => {
    form
      .validateFields()
      .then((res) => {
        setLoading(false);

        order.updateOrder(state?.orderId, {
          personInformation: {
            ...res,
            time: res.time._d.toLocaleString()
          }
        });
      })
      .finally(() => {
        setLoading(true);
        setIsConfirm(true);
      });
  };
  useEffect(() => {
    if (getNewData(good.goods).length === 0 || status === 'completed') return;
    order.addOrder({
      id: state?.orderId,
      createTime: new Date().getTime().toString(),
      totalAmount: state?.totalAmount,
      status: 0, // 0 ????????? 1 ?????????
      items: getNewData(good.goods)
    });
  }, [good, order]);

  return (
    <>
      <div className={styles['container']} hidden={status === 'completed'}>
        <PageHeader
          onBack={() => navigate('/good')}
          title='???????????????'
          tags={<Tag color='blue'>?????????</Tag>}
          extra={[
            <Button key='purchase' size='large' danger onClick={purchase}>
              ?????? ??{state?.totalAmount || total}
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
        <PageHeader title='?????????' tags={<Tag color='green'>?????????</Tag>} />
        <div className={styles['info']} hidden={isConfirm}>
          <Form labelCol={{ span: 4 }} form={form} initialValues={person.currentAccount().information}>
            <Form.Item label='?????????' style={{ height: 30 }}>
              <Input.Group compact>
                <Form.Item name={['contact', 'name']}>
                  <Input style={{ width: 50 }} placeholder='???' />
                </Form.Item>
                <Form.Item name={['contact', 'sex']} initialValue={person.currentAccount().information?.sex}>
                  <Select style={{ width: 70 }} placeholder='??????'>
                    <Select.Option key='male' value='male'>
                      ??????
                    </Select.Option>
                    <Select.Option key='female' value='female'>
                      ??????
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item name='time' label='????????????'>
              <DatePicker
                style={{ width: 296 }}
                placeholder='?????????????????????'
                showTime={{ defaultValue: moment('23:59:59', 'HH:mm:ss') }}
                format='YYYY-MM-DD HH:mm:ss'
                showNow
                showToday
                minuteStep={15}
                showSecond={false}
                onChange={(time, timeString) => setTime(timeString)}
                disabledDate={disabledDate}
                disabledHours={disabledHours}
                disabledMinutes={disabledMinutes}
              />
            </Form.Item>
            <Form.Item label='??????' style={{ height: 30 }}>
              <Input.Group compact>
                <Form.Item name={['address', 'province']} noStyle required>
                  <Cascader
                    placeholder='??????/???/??????'
                    style={{ width: 200 }}
                    options={[
                      {
                        value: 'shanghai',
                        label: '??????',
                        children: [
                          {
                            value: 'puDong',
                            label: '??????',
                            children: [{ value: 'street A', label: 'a??????' }]
                          },
                          {
                            value: 'huangPu',
                            label: '??????',
                            children: [{ value: 'street B', label: 'b??????' }]
                          },
                          {
                            value: 'xuPu',
                            label: '??????',
                            children: [{ value: 'street C', label: 'c??????' }]
                          },
                          {
                            value: 'jingAn',
                            label: '??????',
                            children: [{ value: 'street D', label: 'd??????' }]
                          }
                        ]
                      }
                    ]}
                  />
                </Form.Item>
                <Form.Item name={['address', 'place']} required>
                  <Input placeholder='?????????????????????????????????????????????' style={{ width: 300 }} />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 16, offset: 4 }} style={{ marginTop: 10 }}>
              <Button onClick={onSubmit} htmlType='submit' loading={loading}>
                ??????
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div hidden={!isConfirm}>
          <Result
            status='success'
            title={`??????????????????, ????????????: ${time}`}
            subTitle={`????????????????????????`}
            extra={[
              <Button type='primary' key='home' onClick={() => navigate('/')}>
                ????????????
              </Button>
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default observer(Order);
