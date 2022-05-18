import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Board from '../../pages/Board/Board';
import Login from '../../pages/Login/Login';
import Registration from '../../pages/Registration/Registration';
import Main from '../../pages/Main/Main';
import Welcome from '../../pages/Welcome/Welcome';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { ROUTERS } from '../../constants/constants';
import { useAppSelector } from '../../hooks/ReduxHooks';
import './App.css';

function App() {
  const { requestStatus } = useAppSelector((state) => state.loginReducer);
  const { pathname } = useLocation();

  // if (
  //   (requestStatus === 'failed' || requestStatus === 'pending' || requestStatus === 'idle') &&
  //   pathname !== ROUTERS.LOGIN
  // ) {
  //   return <Navigate to={ROUTERS.LOGIN} />;
  // }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={ROUTERS.WELCOME} element={<Welcome />} />
        <Route path={ROUTERS.MAIN} element={<Main />} />
        <Route path={ROUTERS.LOGIN} element={<Login />} />
        <Route path={ROUTERS.REGISTRATION} element={<Registration />} />
        <Route path={ROUTERS.BOARD} element={<Board />} />
        <Route path={ROUTERS.NOTFOUND} element={<NotFound />} />
        <Route path={ROUTERS.PROFILE} element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
