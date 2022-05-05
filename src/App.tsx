import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Board } from './components/Board/Board';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Main } from './components/Main/Main';
import { NotFound } from './components/NotFound/NotFound';
import { Welcome } from './components/Welcome/Welcome';
import { routers } from './constants';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={routers.ROUTE_WELCOME} element={<Welcome />} />
        <Route path={routers.ROUTE_MAIN} element={<Main />} />
        <Route path={routers.ROUTE_LOGIN} element={<Login />} />
        <Route path={routers.ROUTE_BOARD} element={<Board />} />
        <Route path={routers.ROUTE_NOTFOUND} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
