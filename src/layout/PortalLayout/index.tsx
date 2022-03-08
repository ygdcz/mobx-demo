import { SmileOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, DatePicker, Drawer, Form, Image, Input, Result, Row, Select, Space, List, Badge } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import useStore from 'store';

const PortalLayout = () => {
  const { Option } = Select;
  const { cart } = useStore();
  const { cartNum } = cart;
  const [visible, setVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [login, setLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [form] = useForm();
  const [update, setUpdate] = useState(false); // 有加入购物车操作
  const onSubmit = () => form.validateFields().then((res) => setLogin(true));
  const onClose = () => setVisible(false);
  const onCartClose = () => setCartVisible(false);
  useEffect(() => {
    setUpdate(true);
    console.log(update);
  }, [cartNum]);
  const registerForm = (
    <Form layout='vertical' form={form} hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='name' label='Name' rules={[{ required: false, message: 'Please enter user name' }]}>
            <Input placeholder='Please enter user name' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='url' label='Url' rules={[{ required: false, message: 'Please enter url' }]}>
            <Input style={{ width: '100%' }} addonBefore='http://' addonAfter='.com' placeholder='Please enter url' />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
  const loginBoard = (
    <>
      <p>用户信息</p>
      <p>
        购物车<Button onClick={() => setCartVisible(true)}>查看购物车</Button>
      </p>
    </>
  );
  const cartBoard = (
    <Drawer title='cart' width={700} onClose={onCartClose} visible={cartVisible} bodyStyle={{ paddingBottom: 80, width: 500 }}>
      <List>
        <List.Item>
          <List.Item.Meta title='11' />
          <div>22</div>
        </List.Item>
        <List.Item>22</List.Item>
      </List>
    </Drawer>
  );

  return (
    <>
      <div
        style={{ width: 64, textAlign: 'center' }}
        onClick={() => {
          setUpdate(false);
          setVisible(true);
        }}
      >
        <Badge dot={update}>
          <Avatar src={<img src='https://joeschmoe.io/api/v1/random' style={{ width: '100%' }} />} />
        </Badge>
      </div>
      <Drawer
        title='Create a new account'
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} type='primary'>
              Submit
            </Button>
          </Space>
        }
      >
        {isLogin ? (
          loginBoard
        ) : login ? (
          <Result
            icon={<SmileOutlined />}
            title='Great, you has already created an account!'
            extra={
              <Button type='primary' onClick={() => setIsLogin(true)}>
                Next
              </Button>
            }
          />
        ) : (
          registerForm
        )}
        {isLogin ? cartBoard : <></>}
      </Drawer>
    </>
  );
};
export default observer(PortalLayout);
