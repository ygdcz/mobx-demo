import React, { useEffect } from 'react';
import loadable from '@loadable/component';
import { HashRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
const CalculatorPage = loadable(() => import('./pages/Calculator'));

const Navigation = () => (
  <ul>
    <li>
      <Link to='calc'>计算</Link>
    </li>
  </ul>
);

const Router = () => (
  <HashRouter>
    <Navigation />
    <Routes>
      <Route path='calc' element={<CalculatorPage />}></Route>
      <Route path='*' element={<Navigate to={'calc'} />}></Route>
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
