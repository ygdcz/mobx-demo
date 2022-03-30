import React, { ReactElement, ReactNode, useEffect, Component } from 'react';
import loadable from '@loadable/component';
import { HashRouter, Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import ROUTE from 'routes';
import { Button, Result } from 'antd';
import person from 'store/Person';
const GoodPage = loadable(() => import('pages/Goods'));
const DetailPage = loadable(() => import('pages/Detail'));
const OrderPage = loadable(() => import('pages/Order'));
const HomePage = loadable(() => import('pages/Home'));
const PromotionPage = loadable(() => import('pages/Promotion'));
export interface IRoute {
  path: string;
  title: ReactElement;
}
function Page404() {
  const navigate = useNavigate();
  return (
    <Result
      status='404'
      title='404'
      subTitle='抱歉，您访问的页面走丢了.'
      extra={
        <Button type='primary' onClick={() => navigate('/good')}>
          回到商品页
        </Button>
      }
    />
  );
}

function Page403() {
  const navigate = useNavigate();

  return (
    <Result
      status='403'
      title='403'
      subTitle='抱歉，您没权限去访问此页面.'
      extra={
        <Button type='primary' onClick={() => navigate('/good')}>
          回到首页
        </Button>
      }
    />
  );
}

function Layout({ children }: { children: JSX.Element }) {
  return children;
}

const Router = () => (
  <HashRouter>
    <Routes>
      <Route
        path={ROUTE.Root}
        element={
          <Layout>
            <DefaultLayout>
              <Outlet />
            </DefaultLayout>
          </Layout>
        }
      >
        <Route path='/' element={<HomePage />}></Route>
        <Route path='*' element={<Navigate to={'404'} />}></Route>
        <Route path='good' element={<GoodPage />}></Route>
        <Route path='detail/:id' element={<DetailPage />}></Route>
        <Route path='order' element={<OrderPage />}></Route>
        <Route path='promotion' element={<PromotionPage />}></Route>
        <Route path='404' element={<Page404 />}></Route>
        <Route path='403' element={<Page403 />}></Route>
      </Route>
    </Routes>
  </HashRouter>
);

function App() {
  useEffect(() => {
    person.currentAccount();
  }, []);
  return (
    <div className='App'>
      <Router />
    </div>
  );
}

export default App;
