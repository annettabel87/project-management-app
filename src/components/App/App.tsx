import { useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { getUsers } from '../../redux/edit-profile-slice';
import saveId from '../../shared/id-save/id-save';
import saveLogin from '../../shared/login-save/login-save';
import { TResponseUserData } from '../../interfaces/Interfaces';

function App() {
  const dispatch = useAppDispatch();
  const { users, getUsersStatus, reloadProfileStatus } = useAppSelector(
    (state) => state.usersSlice
  );

  useEffect(() => {
    if (reloadProfileStatus) {
      dispatch(getUsers());
    }
  }, [dispatch, reloadProfileStatus]);

  useEffect(() => {
    if (getUsersStatus === 'succeeded') {
      saveId.setUserId(
        (users?.find((user) => user.login === saveLogin.getUserLogin()) as TResponseUserData).id
      );
    }
  }, [dispatch, getUsersStatus, users]);

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
