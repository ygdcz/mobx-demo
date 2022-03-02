import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, CalculatorFilled, CommentOutlined, FullscreenOutlined } from '@ant-design/icons';
import React, { memo, ReactNode } from 'react';
import { IRoute } from 'App';
import { Link, Outlet } from 'react-router-dom';
import useStore from 'store';
import ROUTE from 'routes';
import { observer } from 'mobx-react-lite';
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
    title: '计算',
    icon: <CalculatorFilled />,
    link: ROUTE.Calc
  },
  {
    title: '评论',
    icon: <CommentOutlined />,
    link: ROUTE.Comment
  },
  {
    title: '全屏',
    icon: <FullscreenOutlined />,
    link: ROUTE.FullScreen
  }
];

const DefaultLayout = (props: { children: ReactNode }) => {
  const { breadcrumbs } = useStore().breadcrumb;

  return (
    <Layout hasSider={false}>
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
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {breadcrumbs.map((b) => {
            return <Breadcrumb.Item key={b.link + b.title}>{b.link ? <Link to={b.link}>{b.title}</Link> : b.title}</Breadcrumb.Item>;
          })}
        </Breadcrumb>
        <Layout className='site-layout-background' style={{ padding: '24px 0' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>{<Outlet />}</Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default memo(observer(DefaultLayout));
