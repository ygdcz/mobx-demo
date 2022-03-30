import { AlertOutlined, LogoutOutlined, ShoppingCartOutlined, ShoppingOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Image,
  Input,
  Result,
  Row,
  Select,
  Space,
  List,
  Badge,
  Popconfirm,
  Checkbox,
  Tabs,
  message,
  Alert,
  Divider,
  Cascader,
  Radio
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Cart from 'common/components/Cart';
import PersonPage from 'common/components/Person';
import { IPerson } from 'common/components/Person/models';
import { isAutoLogin } from 'common/methods';
import { observer } from 'mobx-react-lite';
import OrderList from 'pages/OrderList';
import React, { useEffect, useState, ReactNode, Children } from 'react';
import useStore from 'store';

const PortalLayout = () => {
  const { Option } = Select;
  const { TabPane } = Tabs;
  const { cart, auth, person } = useStore();
  const { cartNum } = cart;
  const [visible, setVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [orderVisible, setOrderVisible] = useState(false);
  const [personVisible, setPersonVisible] = useState(false);
  const [login, setLogin] = useState(false);
  const [useRegister] = useForm();
  const [useLogin] = useForm();
  const [usePerson] = useForm();
  const [update, setUpdate] = useState(false); // 有加入购物车操作
  const [showTip, setShowTip] = useState(true);
  const [activeKey, setActiveKey] = useState('login');
  useEffect(() => {
    person.getPersonList();
  }, [person]);

  // register
  const onRegisterSubmit = () => {
    useRegister.validateFields().then((res: IPerson) => {
      if (checkIsExist(res.phoneNumber)) {
        message.error('该手机号已经被注册');
        return;
      }
      if (res.username === 'admin') {
        message.error('该用户名无法使用');
        return;
      }
      person.createAccount(res);
      setActiveKey('login');
    });
  };

  // checkValid
  const checkValidate = (username: string, password: string) => {
    return person.personList.some((person) => person.username === username && person.password === password);
  };

  // checkIsExist
  const checkIsExist = (phoneNumber: number) => {
    return person.personList.some((person) => person.phoneNumber === phoneNumber);
  };

  // login
  const onLoginSubmit = () =>
    useLogin.validateFields().then((res) => {
      const { username, password, remember } = res;
      if (!checkValidate(username, password)) {
        message.error('用户名或密码错误');
        return;
      }
      if (remember) {
        auth.setUsername(username);
        auth.setToken(password);
      }
      setLogin(true);
    });

  // person
  const onPersonUpdate = () =>
    usePerson.validateFields().then((res) => {
      person.updateAccount(res);
    });
  const onClose = () => setVisible(false);
  const onCartClose = () => setCartVisible(false);
  const onOrderClose = () => setOrderVisible(false);
  const onPersonClose = () => setPersonVisible(false);
  useEffect(() => {
    isAutoLogin() && setLogin(true);
  }, []);
  useEffect(() => {
    setUpdate(true);
  }, [cartNum]);
  const registerForm = (
    <Tabs
      activeKey={activeKey}
      onChange={(key) => {
        setActiveKey(key);
      }}
    >
      <TabPane tab='登陆' key='login'>
        <Form name='login' labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={{ remember: true }} autoComplete='off' form={useLogin}>
          <Form.Item label='用户名' name='username' rules={[{ required: true, message: '请输入您的用户名!' }]}>
            <Input allowClear autoComplete={auth.username} />
          </Form.Item>

          <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入你的密码!' }]}>
            <Input.Password allowClear />
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 4, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type='primary' htmlType='submit' onClick={onLoginSubmit}>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </TabPane>
      <TabPane tab='注册' key='register'>
        <Form
          name='register'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete='off'
          form={useRegister}
        >
          <Form.Item label='手机号' name='phoneNumber' rules={[{ required: true, message: '请输入正确的手机号!', pattern: /^1[3|4|5|7|8]\d{9}$/ }]}>
            <Input placeholder='请输入正确的手机号' />
          </Form.Item>
          <Form.Item
            label='用户名'
            name='username'
            rules={[
              {
                required: true,
                message: '请输入符合格式的用户名(字母开头，允许5-16字节，允许字母数字下划线)!',
                pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/g
              }
            ]}
          >
            <Input placeholder='字母开头，允许5-16字节，允许字母数字下划线' />
          </Form.Item>

          <Form.Item
            label='密码'
            name='password'
            rules={[
              {
                required: true,
                message: '请输入符合格式的密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)',
                pattern: /^[a-zA-Z]\w{5,17}$/g
              }
            ]}
          >
            <Input.Password placeholder='以字母开头，长度在6~18之间，只能包含字母、数字和下划线' />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type='primary' htmlType='submit' onClick={onRegisterSubmit}>
              注册
            </Button>
          </Form.Item>
        </Form>
      </TabPane>
    </Tabs>
  );
  const loginBoard = (
    <Space size={[40, 20]} wrap>
      <p>
        <UserOutlined
          onClick={() => setPersonVisible(true)}
          style={{ borderRadius: '50%', backgroundColor: '#87d068', fontSize: 90, width: 120, height: 120, lineHeight: '140px' }}
        />
        用户信息
      </p>
      <p>
        <ShoppingCartOutlined
          onClick={() => setCartVisible(true)}
          style={{ borderRadius: '50%', backgroundColor: '#2db7f5', fontSize: 90, width: 120, height: 120, lineHeight: '140px' }}
        />
        购物车
      </p>
      <p>
        <ShoppingOutlined
          onClick={() => setOrderVisible(true)}
          style={{ borderRadius: '50%', backgroundColor: '#f50', fontSize: 90, width: 120, height: 120, lineHeight: '140px' }}
        />
        订单
      </p>
    </Space>
  );
  const board = (
    <>
      <Drawer title='个人信息' width={700} onClose={onPersonClose} visible={personVisible} bodyStyle={{ paddingBottom: 80, width: 700 }}>
        <Form form={usePerson} initialValues={person.currentAccount()?.information}>
          <Form.Item label='地址' style={{ height: 30 }}>
            <Input.Group compact>
              <Form.Item name={['address', 'province']} noStyle>
                <Cascader
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
              <Form.Item name={['address', 'place']}>
                <Input placeholder='详细地址，请具体到小区或门牌号' style={{ width: 300 }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item name='sex' label='性别'>
            <Radio.Group>
              <Radio value='male'>男</Radio>
              <Radio value='female'>女</Radio>
              <Radio value='other'>其他</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' onClick={onPersonUpdate}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer title='cart' width={700} onClose={onCartClose} visible={cartVisible} bodyStyle={{ paddingBottom: 80, width: 700 }}>
        <Cart />
      </Drawer>
      <Drawer title='您的订单' width={700} onClose={onOrderClose} visible={orderVisible} bodyStyle={{ paddingBottom: 80, width: 700 }}>
        <Alert message='点击付款后，请关闭抽屉查看付款确认页~' type='info' showIcon style={{ marginBottom: 16 }} />
        <OrderList />
      </Drawer>
    </>
  );
  const Tip = (props: { children: ReactNode }) => {
    return (
      <Popconfirm
        title='个人信息、购物车和订单功能点击这里查看'
        onConfirm={() => setShowTip(false)}
        okText='确定'
        showCancel={false}
        visible={showTip}
        icon={<AlertOutlined />}
      >
        {props.children}
      </Popconfirm>
    );
  };

  return (
    <>
      <Tip>
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
      </Tip>
      <Drawer
        title={login ? '个人菜单' : '登陆&注册'}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space size={16}>
            <div hidden={login === false}>
              欢迎回来, <span style={{ color: 'blue' }}>{auth.username}</span>
            </div>
            <Button
              onClick={() => {
                auth.clear();
                setLogin(false);
              }}
              hidden={login === false}
              icon={<LogoutOutlined />}
            >
              注销用户
            </Button>
          </Space>
        }
      >
        {login ? (
          <>
            {loginBoard}
            {board}
          </>
        ) : (
          registerForm
        )}
      </Drawer>
    </>
  );
};
export default observer(PortalLayout);
