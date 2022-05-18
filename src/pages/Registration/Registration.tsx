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
import { registrationUser } from '../../redux/authorisation-slice';
import { IRegistrationData } from '../../interfaces/Interfaces';
import s from './Registration.module.scss';

const Registration = () => {
  const { error, registrationRequestStatus } = useAppSelector((state) => state.authorisationSlice);
  const dispatch = useAppDispatch();

  const [registrationData, setRegistrationData] = useState<IRegistrationData>({
    name: '',
    login: '',
    password: '',
  });

  const [checkPassword, setCheckPassword] = useState<string>('');
  const [errorNameMessage, setErrorNameMessage] = useState<string>('');
  const [errorLoginMessage, setErrorLoginMessage] = useState<string>('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('');

  const disabledBtnSubmit =
    !registrationData.name ||
    !registrationData.login ||
    !registrationData.password ||
    !checkPassword;

  const changeData = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'confirm') {
      setCheckPassword(e.currentTarget.value);
      setErrorPasswordMessage('');
    } else {
      setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
      e.target.name === 'name'
        ? setErrorNameMessage('')
        : e.target.name === 'login'
        ? setErrorLoginMessage('')
        : setErrorPasswordMessage('');
    }
  };

  const onRegistration = () => {
    if (!nameValidation(registrationData.name)) {
      setErrorNameMessage('Incorrect name');
    } else if (!loginValidation(registrationData.login)) {
      setErrorLoginMessage('Incorrect login');
    } else if (!passwordValidation(registrationData.password)) {
      setErrorPasswordMessage('Minimum 8 characters');
    } else if (registrationData.password !== checkPassword) {
      setErrorPasswordMessage('Enter the same password');
    } else {
      dispatch(registrationUser(registrationData));
    }
  };

  if (registrationRequestStatus === 'succeeded') {
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
            title={'name'}
            typeInput={'name'}
            value={registrationData.name}
            changeValue={changeData}
            errorMessage={errorNameMessage}
          />
          <InputContainer
            title={'login'}
            typeInput={'login'}
            value={registrationData.login}
            changeValue={changeData}
            errorMessage={errorLoginMessage}
          />
          <InputContainer
            title={'password'}
            typeInput={'password'}
            value={registrationData.password}
            changeValue={changeData}
            errorMessage={errorPasswordMessage}
          />
          <InputContainer
            title={'confirm'}
            typeInput={'password'}
            value={checkPassword}
            changeValue={changeData}
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
                loadingStatus={registrationRequestStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
