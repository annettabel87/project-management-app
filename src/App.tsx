import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Board } from './components/Board/Board';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/login';
import { Main } from './components/Main/Main';
import { NotFound } from './components/NotFound/NotFound';
import { Welcome } from './components/Welcome/Welcome';
import { routers } from './constants/constants';
import { Footer } from './components/Footer/Footer';
import { Profile } from './components/Profile/Profile';
import Registration from './components/Registration/registration';
import { useAppSelector } from './hooks/ReduxHooks';
import './App.css';

function App() {
  const { requestStatus } = useAppSelector((state) => state.loginReducer);
  const { pathname } = useLocation();

  if (
    (requestStatus === 'failed' || requestStatus === 'pending' || requestStatus === 'idle') &&
    pathname !== routers.ROUTE_LOGIN
  ) {
    return <Navigate to={routers.ROUTE_LOGIN} />;
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={routers.ROUTE_WELCOME} element={<Welcome />} />
        <Route path={routers.ROUTE_MAIN} element={<Main />} />
        <Route path={routers.ROUTE_LOGIN} element={<Login />} />
        <Route path={routers.ROUTE_REGISTRATION} element={<Registration />} />
        <Route path={routers.ROUTE_BOARD} element={<Board />} />
        <Route path={routers.ROUTE_NOTFOUND} element={<NotFound />} />
        <Route path={routers.ROUTE_PROFILE} element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
