import React, { ChangeEvent, useState } from 'react';
import s from './login.module.scss';
import HeaderEnterApp from '../../shared/header-enter-app/header-enter-app';
import InputContainer from '../../shared/input-container/input-container';
import { NavLink } from 'react-router-dom';
import MainActionButton from '../../shared/main-action-button/main-action-button';
import { loginValidation, passwordValidation } from '../../shared/validation/validation';
import { routers } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../../store/login-reducer';
import tokenActions from '../../api/token-actions/token-actions';

export const Login = () => {
  const { error, isLoading } = useAppSelector((state) => state.loginReducer);
  const token = tokenActions.getUserToken();
  const dispatch = useAppDispatch();
  const [loginValue, setLoginValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [errorLoginMessage, setErrorLoginMessage] = useState<string>('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('');

  const changeLoginValue = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValue(e.currentTarget.value);
    setErrorLoginMessage('');
  };
  const changePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.currentTarget.value);
    setErrorPasswordMessage('');
  };

  const checkLoginUser = () => {
    if (!loginValidation(loginValue)) {
      setErrorLoginMessage('Incorrect login');
    } else if (!passwordValidation(passwordValue)) {
      setErrorPasswordMessage('Minimum 8 characters');
    } else {
      dispatch(loginUser({ login: loginValue, password: passwordValue }));
    }
  };

  const disabledBtnSubmit = !loginValue || !passwordValue;

  if (token) {
    return <Navigate to={routers.ROUTE_PROFILE} />;
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <HeaderEnterApp title={'Sign In'} />
        <div className={s.main}>
          <div className={s.emailPasswordLoginContainer}>
            <InputContainer
              title={'Login'}
              typeInput={'login'}
              value={loginValue}
              changeValue={changeLoginValue}
              errorMessage={errorLoginMessage}
            />
            <InputContainer
              title={'Password'}
              typeInput={'password'}
              value={passwordValue}
              changeValue={changePasswordValue}
              errorMessage={errorPasswordMessage}
            />
          </div>
          <div className={s.authBtn}>
            <span className={s.errorMessage}>{error}</span>
            <div className={s.authMainBtn}>
              <MainActionButton
                actionClick={checkLoginUser}
                disabledBtnSubmit={disabledBtnSubmit}
                loadingStatus={isLoading}
                title={'login'}
              />
            </div>
          </div>
        </div>
        <div className={s.footer}>
          <p className={s.text}>Don&apos;t have an account</p>
          <NavLink to={routers.ROUTE_REGISTRATION} className={s.footerBtn}>
            Sing Up
          </NavLink>
        </div>
      </div>
    </div>
  );
};
