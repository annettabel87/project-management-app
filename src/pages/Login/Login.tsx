import { ChangeEvent, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';

import HeaderEnterApp from '../../shared/header-enter-app/header-enter-app';
import InputContainer from '../../shared/input-container/input-container';
import MainActionButton from '../../shared/main-action-button/main-action-button';
import { loginValidation, passwordValidation } from '../../shared/validation/validation';
import { ROUTERS } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { loginUser } from '../../redux/authorisation-slice';
import tokenActions from '../../api/token-actions/token-actions';
import { ILoginData } from '../../interfaces/Interfaces';
import s from './Login.module.scss';

const Login = () => {
  const { error, loginRequestStatus } = useAppSelector((state) => state.authorisationSlice);
  const token = tokenActions.getUserToken();
  const dispatch = useAppDispatch();
  const [loginData, setLoginData] = useState<ILoginData>({
    login: '',
    password: '',
  });

  const [errorLoginMessage, setErrorLoginMessage] = useState<string>('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('');

  const changeData = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    e.target.name === 'login' ? setErrorLoginMessage('') : setErrorPasswordMessage('');
  };

  const checkLoginUser = () => {
    if (!loginValidation(loginData.login)) {
      setErrorLoginMessage('Incorrect login');
    } else if (!passwordValidation(loginData.password)) {
      setErrorPasswordMessage('Minimum 8 characters');
    } else {
      dispatch(loginUser(loginData));
    }
  };

  const disabledBtnSubmit = !loginData.login || !loginData.password;

  if (token) {
    return <Navigate to={ROUTERS.PROFILE} />;
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <HeaderEnterApp title={'Sign In'} />
        <div className={s.main}>
          <div className={s.emailPasswordLoginContainer}>
            <InputContainer
              title={'login'}
              typeInput={'login'}
              value={loginData.login}
              changeValue={changeData}
              errorMessage={errorLoginMessage}
            />
            <InputContainer
              title={'password'}
              typeInput={'password'}
              value={loginData.password}
              changeValue={changeData}
              errorMessage={errorPasswordMessage}
            />
          </div>
          <div className={s.authBtn}>
            <span className={s.errorMessage}>{error}</span>
            <div className={s.authMainBtn}>
              <MainActionButton
                actionClick={checkLoginUser}
                disabledBtnSubmit={disabledBtnSubmit}
                loadingStatus={loginRequestStatus}
                title={'login'}
              />
            </div>
          </div>
        </div>
        <div className={s.footer}>
          <p className={s.text}>Don&apos;t have an account</p>
          <NavLink to={ROUTERS.REGISTRATION} className={s.footerBtn}>
            Sing Up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
