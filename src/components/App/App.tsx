import { Route, Routes } from 'react-router-dom';

import Board from '../../pages/Board/Board';
import Login from '../../pages/Login/Login';
import Registration from '../../pages/Registration/Registration';
import Main from '../../pages/Main/Main';
import Welcome from '../../pages/Welcome/Welcome';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { ROUTERS } from '../../constants/constants';
import './App.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={ROUTERS.WELCOME} element={<Welcome />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTERS.MAIN} element={<Main />} />
          <Route path={ROUTERS.BOARD} element={<Board />} />
          <Route path={ROUTERS.PROFILE} element={<Profile />} />
        </Route>

        <Route path={ROUTERS.LOGIN} element={<Login />} />
        <Route path={ROUTERS.REGISTRATION} element={<Registration />} />
        <Route path={ROUTERS.NOTFOUND} element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
