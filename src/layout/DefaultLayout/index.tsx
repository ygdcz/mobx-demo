import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  CalculatorFilled,
  CommentOutlined,
  FullscreenOutlined,
  ShopOutlined,
  SkypeOutlined
} from '@ant-design/icons';
import React, { memo, ReactNode } from 'react';
import { IRoute } from 'App';
import './index.module.scss';
import { Link, Outlet } from 'react-router-dom';
import useStore from 'store';
import ROUTE from 'routes';
import { observer } from 'mobx-react-lite';
import PortalLayout from 'layout/PortalLayout';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
interface IMenu {
  title: string;
  icon?: React.ReactNode;
  link?: string;
  children?: IMenu[];
}
const ALL_MENUS: IMenu[] = [
  {
    title: '首页',
    icon: <SkypeOutlined />,
    link: ROUTE.Root
  },
  {
    title: '商品',
    icon: <ShopOutlined />,
    link: ROUTE.Good
  }
];

const DefaultLayout = (props: { children: ReactNode }) => {
  const { breadcrumbs } = useStore().breadcrumb;

  return (
    <Layout hasSider={false} style={{ maxWidth: 1280, margin: '0 auto' }}>
      <Header className='header'>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal'>
          <>
            {ALL_MENUS.map((h, i) => (
              <Menu.Item key={i} icon={h.icon}>
                {<Link to={h.link || '/'}>{h.title}</Link>}
              </Menu.Item>
            ))}
          </>
          <Menu.Item key='user' style={{ position: 'absolute', right: 400 }}>
            {<PortalLayout />}
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {breadcrumbs.map((b) => {
            return <Breadcrumb.Item key={b.link + b.title}>{b.link ? <Link to={b.link}>{b.title}</Link> : <h1>{b.title}</h1>}</Breadcrumb.Item>;
          })}
        </Breadcrumb>
        <Layout className='site-layout-background' style={{ padding: '24px 0' }}>
          <Content style={{ padding: '0 24px', minHeight: '100vh' }}>{<Outlet />}</Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default memo(observer(DefaultLayout));
