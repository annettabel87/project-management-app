import { Route, Routes } from 'react-router-dom';

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
import './App.module.scss';

function App() {
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
