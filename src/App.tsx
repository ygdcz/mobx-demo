import React, { ReactElement, ReactNode, useEffect, Component } from 'react';
import loadable from '@loadable/component';
import { HashRouter, Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import ROUTE from 'routes';
const CalculatorPage = loadable(() => import('pages/Calculator'));
const CommentPage = loadable(() => import('pages/Comment'));
const FullScreenPage = loadable(() => import('pages/FullScreen'));
export interface IRoute {
  path: string;
  title: ReactElement;
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
        <Route path='/' element={<>home</>}></Route>
        <Route path='calc' element={<CalculatorPage />}></Route>
        <Route path='comment' element={<CommentPage />}></Route>
        <Route path='fullscreen' element={<FullScreenPage />}></Route>
        <Route path='*' element={<Navigate to={'calc'} />}></Route>
      </Route>
      {/* <DefaultLayout header={routes}>
        <
      </DefaultLayout> */}
    </Routes>
  </HashRouter>
);

function App() {
  return (
    <div className='App'>
      <Router />
    </div>
  );
}

export default App;

function Te() {
  return <div>111</div>;
}
