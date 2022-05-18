import { ChangeEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

import HeaderEnterApp from '../../shared/header-enter-app/header-enter-app';
import InputContainer from '../../shared/input-container/input-container';
import MainActionButton from '../../shared/main-action-button/main-action-button';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import {
  loginValidation,
  nameValidation,
  passwordValidation,
} from '../../shared/validation/validation';
import { ROUTERS } from '../../constants/constants';
import { registrationUser } from '../../store/registration-reducer';
import s from './Registration.module.scss';

const Registration = () => {
  const { error, isLoading, isRegistration } = useAppSelector((state) => state.registrationReducer);
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [errorNameMessage, setErrorNameMessage] = useState<string>('');
  const [errorLoginMessage, setErrorLoginMessage] = useState<string>('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('');

  const disabledBtnSubmit = !name || !login || !password || !checkPassword;

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorNameMessage('');
    setName(e.currentTarget.value);
  };

  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorLoginMessage('');
    setLogin(e.currentTarget.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorPasswordMessage('');
    setPassword(e.currentTarget.value);
  };

  const onChangeCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorPasswordMessage('');
    setCheckPassword(e.currentTarget.value);
  };

  const onRegistration = () => {
    if (!nameValidation(name)) {
      setErrorNameMessage('Incorrect name');
    } else if (!loginValidation(login)) {
      setErrorLoginMessage('Incorrect login');
    } else if (!passwordValidation(password)) {
      setErrorPasswordMessage('Minimum 8 characters');
    } else if (password !== checkPassword) {
      setErrorPasswordMessage('Enter the same password');
    } else {
      dispatch(registrationUser({ name, login, password }));
    }
  };

  /*  useEffect(() => {
    return () => {
      dispatch(setServerErrorMessageRegistration(''));
      dispatch(setRegistrationAC(false));
    };
  }, [dispatch]);*/

  if (isRegistration) {
    return <Navigate to={ROUTERS.LOGIN} />;
  }

  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <HeaderEnterApp title={'Sign Up'} />
        <div className={s.main}>
          <InputContainer
            title={'Name'}
            typeInput={'name'}
            value={name}
            changeValue={onChangeName}
            errorMessage={errorNameMessage}
          />
          <InputContainer
            title={'Login'}
            typeInput={'login'}
            value={login}
            changeValue={onChangeLogin}
            errorMessage={errorLoginMessage}
          />
          <InputContainer
            title={'Password'}
            typeInput={'password'}
            value={password}
            changeValue={onChangePassword}
            errorMessage={errorPasswordMessage}
          />
          <InputContainer
            title={'Confirm password'}
            typeInput={'password'}
            value={checkPassword}
            changeValue={onChangeCheckPassword}
            errorMessage={errorPasswordMessage}
          />
        </div>

        <div className={s.footer}>
          <span className={s.errorMessageContainer}>{error}</span>

          <div className={s.footerBtns}>
            <span className={s.btnCancel} onClick={goBack}>
              Cancel
            </span>
            <div className={s.blueBtnContainer}>
              <MainActionButton
                actionClick={onRegistration}
                disabledBtnSubmit={disabledBtnSubmit}
                title={'Register'}
                loadingStatus={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
