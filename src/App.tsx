import React, { ReactElement, ReactNode, useEffect, Component } from 'react';
import loadable from '@loadable/component';
import { HashRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import routes from 'routes';
const CalculatorPage = loadable(() => import('pages/Calculator'));
const CommentPage = loadable(() => import('pages/Comment'));
export interface IRoute {
  path: string;
  title: ReactElement;
}

const Router = () => (
  <HashRouter>
    <DefaultLayout header={routes}>
      <Routes>
        <Route path='calc' element={<CalculatorPage />}></Route>
        <Route path='comment' element={<CommentPage />}></Route>
        <Route path='*' element={<Navigate to={'calc'} />}></Route>
      </Routes>
    </DefaultLayout>
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
