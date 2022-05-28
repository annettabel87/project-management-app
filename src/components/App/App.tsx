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
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { getUsers, setUser } from '../../redux/profile-slice';
import { setToken } from '../../redux/authorisation-slice';
import { localStorageActions } from '../../utils/localStorageActions';

import './App.module.scss';

function App() {
  const dispatch = useAppDispatch();
  const { users, reloadProfileStatus } = useAppSelector((state) => state.profileSlice);
  const { token } = useAppSelector((state) => state.authorisationSlice);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken && !token) {
      dispatch(setToken(localToken));
    }
    // if (!localToken && token) {
    //   tokenActions.setUserToken(token);
    // }
  }, [dispatch, token]);

  useEffect(() => {
    if (users.length && token) {
      const loginData = localStorageActions.getLoginData();

      if (loginData) {
        const userId = (users?.filter((user) => user.login === loginData.login))[0];
        localStorageActions.updateCurrentUser(loginData, userId);
        dispatch(setUser(localStorageActions.getCurrentUser()));
        localStorageActions.removeLoginData();
      }
    }
  }, [dispatch, users, token]);

  useEffect(() => {
    if (reloadProfileStatus && token) {
      dispatch(getUsers());
    }
  }, [dispatch, reloadProfileStatus, token]);

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
