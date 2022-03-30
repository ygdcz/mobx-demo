import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Tree, Input, InputNumber, Checkbox, Divider, Button, Alert, Empty, Space, Popconfirm } from 'antd';
import { ICart } from 'pages/Detail/models';
import useStore from 'store';
import CartItem from './components/cart-item';
import { observer } from 'mobx-react';
import { CheckboxChangeEvent, CheckboxOptionType } from 'antd/lib/checkbox';
import styles from './index.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isEqual } from 'lodash-es';

const Cart = () => {
  const { cart } = useStore();
  const { getCart, deleteCartItems } = cart;
  const CheckboxGroup = Checkbox.Group;
  const [data, setData] = useState<{ id: number; total: number }[]>([]);
  const navigate = useNavigate();
  const options = cart.cart.map((item) => ({
    label: <CartItem item={item} OnReturnPrice={(value) => setData([...data, value])} />,
    value: item.id
  }));
  const defaultCheckedList: number[] = [];
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [total, setTotal] = useState(0);
  const onChange = (list: ISafeAny) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? options.map((option) => option.value) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  useEffect(() => {
    getCart();
  }, [cart]);

  useEffect(() => {
    let _total = 0;
    cart.cart.forEach((item) => {
      if (checkedList.includes(item.id)) {
        _total += item.num * item.price;
      }
    });
    setTotal(_total);
  }, [cart.cart, checkedList]);

  const goToOrderPage = (params: { totalAmount: string; cartIds: number[] }) => {
    const items = cart.cart.map((item) => {
      if (params.cartIds.includes(item.id)) {
        return {
          id: item.id,
          num: item.num
        };
      }
      return null;
    });
    const orderId = Number(new Date().getTime().toString() + Math.floor(Math.random() * 100));
    navigate('order', {
      state: {
        totalAmount: params.totalAmount,
        items: items.filter((item) => !isEqual(item, null)),
        orderId
      }
    });
  };

  return (
    <>
      <div className={styles['cart-head']}>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          全选
        </Checkbox>
        <div>总价: ¥{total.toFixed(1)}</div>
        <Space>
          <Popconfirm
            title='您确定要将商品从你的购物车里移除吗?'
            onConfirm={() => {
              setCheckedList([]);
              cart.deleteCartItems(checkedList);
            }}
            okText='移除'
            cancelText='再想想'
            okType='danger'
          >
            <Button type='link' hidden={checkedList.length === 0}>
              删除{`(${checkedList.length})`}
            </Button>
          </Popconfirm>
          <Button
            type='link'
            disabled={checkedList.length === 0}
            onClick={() => {
              setCheckAll(false);
              setCheckedList([]);
              goToOrderPage({
                totalAmount: total.toFixed(1),
                cartIds: checkedList
              });
              deleteCartItems(checkedList);
            }}
          >
            付款
          </Button>
        </Space>
      </div>
      <Alert message='点击付款后，请关闭抽屉查看付款确认页~' type='info' showIcon />
      <CheckboxGroup options={options} value={checkedList} onChange={onChange} />
      {cart.cart.length === 0 && (
        <div style={{ marginTop: '200px' }}>
          <Empty description='购物车暂无商品' />
        </div>
      )}
    </>
  );
};

export default observer(Cart);
