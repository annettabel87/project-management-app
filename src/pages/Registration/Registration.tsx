import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import HeaderEnterApp from '../../shared/header-enter-app/header-enter-app';
import InputContainer from '../../shared/input-container/input-container';
import MainActionButton from '../../shared/main-action-button/main-action-button';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { ROUTERS } from '../../constants/constants';
import { cancel, registrationUser } from '../../redux/authorisation-slice';
import { IRegistrationData } from '../../interfaces/Interfaces';

import s from './Registration.module.scss';

const Registration = () => {
  const { error, registrationRequestStatus } = useAppSelector((state) => state.authorisationSlice);
  const [errorPasswords, setErrorPasswords] = useState<string>('');
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IRegistrationData & { passwordConfirm: string }>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IRegistrationData & { passwordConfirm: string }> = (data) => {
    if (data.password !== data.passwordConfirm) {
      setErrorPasswords(`Sorry, but the passwords don't match.`);
    } else if (data && data.password === data.passwordConfirm) {
      dispatch(registrationUser({ name: data.name, login: data.login, password: data.password }));
    }
    error === undefined &&
      reset({
        name: '',
        login: '',
        password: '',
        passwordConfirm: '',
      });
  };

  if (registrationRequestStatus === 'succeeded') {
    return <Navigate to={ROUTERS.LOGIN} />;
  }

  const goBack = () => {
    window.history.go(-1);
    dispatch(cancel());
  };

  return (
    <div className={s.container}>
      <form className={s.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <HeaderEnterApp title={'Sign Up'} />
        <div className={s.main}>
          <InputContainer
            {...register('name', {
              required: 'Please, enter your name',
              pattern: {
                value: /^[a-zA-Z ]{2,30}$/,
                message: 'Please, enter your name correctly',
              },
            })}
            placeholder={'enter your name...'}
            title={'name'}
            type={'name'}
            errors={errors.name?.message}
          />
          <InputContainer
            {...register('login', {
              required: 'Please, enter your login',
              pattern: {
                value: /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/i,
                message: 'Please, enter your login correctly',
              },
            })}
            placeholder={'enter your login...'}
            title={'login'}
            type={'login'}
            errors={errors.login?.message}
          />
          <InputContainer
            {...register('password', {
              required: 'Please, enter your password',
              pattern: {
                value: /[0-9a-zA-Z!@#$%^&*]{8,}/,
                message: 'Please, enter your password correctly',
              },
            })}
            placeholder={'enter your password...'}
            title={'password'}
            type={'password'}
            errors={errors.password?.message}
          />
          <InputContainer
            {...register('passwordConfirm', {
              required: 'Please, enter your confirm password',
              pattern: {
                value: /[0-9a-zA-Z!@#$%^&*]{8,}/,
                message: 'Please, enter your confirm password correctly',
              },
            })}
            placeholder={'enter your confirm password...'}
            title={'confirm'}
            type={'password'}
            errors={errors.passwordConfirm?.message}
          />
        </div>

        <div className={s.footer}>
          <div className={s.footerBtns}>
            <span className={s.btnCancel} onClick={goBack}>
              Cancel
            </span>
            <div className={s.blueBtnContainer}>
              <MainActionButton
                type={'submit'}
                disabledBtnSubmit={!isDirty || !isValid || !!errorPasswords}
                title={'Register'}
                loadingStatus={registrationRequestStatus}
              />
            </div>
          </div>
          <span className={s.errorMessageContainer}>{errorPasswords || error}</span>
        </div>
      </form>
    </div>
  );
};

export default Registration;
