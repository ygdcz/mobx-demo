import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import React, { ReactNode } from 'react';
import { IRoute } from 'App';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import useStore from 'store';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const DefaultLayout = (props: { children?: ReactNode; header?: IRoute[] }) => {
  const { breadcrumbs } = useStore().breadcrumb;

  return (
    <Layout>
      <Header className='header'>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal'>
          <>
            {props.header?.map((h, i) => (
              <Menu.Item key={i}>{<Link to={h.path}>{h.title}</Link>}</Menu.Item>
            ))}
          </>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {breadcrumbs.map((b) => (
            <Breadcrumb.Item key={b.link + b.title}>{b.link ? <Link to={b.link}>{b.title}</Link> : b.title}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <Layout className='site-layout-background' style={{ padding: '24px 0' }}>
          {/* <Sider className='site-layout-background' width={200}>
            <Menu mode='inline' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
              <SubMenu key='sub1' icon={<UserOutlined />} title='subnav 1'>
                <Menu.Item key='1'>option1</Menu.Item>
                <Menu.Item key='2'>option2</Menu.Item>
                <Menu.Item key='3'>option3</Menu.Item>
                <Menu.Item key='4'>option4</Menu.Item>
              </SubMenu>
              <SubMenu key='sub2' icon={<LaptopOutlined />} title='subnav 2'>
                <Menu.Item key='5'>option5</Menu.Item>
                <Menu.Item key='6'>option6</Menu.Item>
                <Menu.Item key='7'>option7</Menu.Item>
                <Menu.Item key='8'>option8</Menu.Item>
              </SubMenu>
              <SubMenu key='sub3' icon={<NotificationOutlined />} title='subnav 3'>
                <Menu.Item key='9'>option9</Menu.Item>
                <Menu.Item key='10'>option10</Menu.Item>
                <Menu.Item key='11'>option11</Menu.Item>
                <Menu.Item key='12'>option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider> */}
          <Content style={{ padding: '0 24px', minHeight: 280 }}>{props.children}</Content>
        </Layout>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
    </Layout>
  );
};

export default observer(DefaultLayout);
