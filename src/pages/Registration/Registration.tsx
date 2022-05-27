import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import HeaderEnterApp from '../../shared/header-enter-app/header-enter-app';
import MainActionButton from '../../shared/main-action-button/main-action-button';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { ROUTERS } from '../../constants/constants';
import { cancel, registrationUser } from '../../redux/authorisation-slice';
import { IRegistrationData } from '../../interfaces/Interfaces';
import ShowPasswords from '../../shared/show-password/show-password';

import s from './Registration.module.scss';
import style_form from '../../shared/show-password/show-password.module.scss';

const Registration = () => {
  const { error, registrationRequestStatus } = useAppSelector((state) => state.authorisationSlice);
  const [errorPasswords, setErrorPasswords] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IRegistrationData & { passwordConfirm: string }>({
    mode: 'onChange',
  });

  const typeShowInput = (type: 'name' | 'login' | 'password' | 'text', showPassword: boolean) => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  const onSubmit: SubmitHandler<IRegistrationData & { passwordConfirm: string }> = (data) => {
    if (data.password !== data.passwordConfirm) {
      setErrorPasswords(`Sorry, but the passwords don't match.`);
    } else if (data && data.password === data.passwordConfirm) {
      dispatch(
        registrationUser({ name: data.name, login: data.login, password: data.password })
      ).then(() => {
        navigate(`${ROUTERS.LOGIN}`);
      });
    }
    error === undefined &&
      reset({
        name: '',
        login: '',
        password: '',
        passwordConfirm: '',
      });
  };

  const goBack = () => {
    window.history.go(-1);
    dispatch(cancel());
  };

  return (
    <div className={s.container}>
      <form className={s.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <HeaderEnterApp title={'Sign Up'} />
        <div className={s.main}>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>name</span>
            <input
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
            />
            <span className={style_form.errorEmailPasswordMessage}>{errors.name?.message}</span>
          </label>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>login</span>
            <input
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
            />
            <span className={style_form.errorEmailPasswordMessage}>{errors.login?.message}</span>
          </label>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>password</span>
            <input
              {...register('password', {
                required: 'Please, enter your password',
                pattern: {
                  value: /[0-9a-zA-Z!@#$%^&*]{8,}/,
                  message: 'Please, enter your password correctly',
                },
              })}
              placeholder={'enter your password...'}
              title={'password'}
              type={typeShowInput('password', showPassword)}
            />
            <ShowPasswords showPassword={showPassword} setShowPassword={setShowPassword} />
            <span className={style_form.errorEmailPasswordMessage}>{errors.password?.message}</span>
          </label>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>Confirm password</span>
            <input
              {...register('passwordConfirm', {
                required: 'Please, enter your confirm password',
                pattern: {
                  value: /[0-9a-zA-Z!@#$%^&*]{8,}/,
                  message: 'Please, enter your password confirm correctly',
                },
              })}
              placeholder={'enter your confirm password...'}
              title={'confirm'}
              type={typeShowInput('password', showConfirmPassword)}
            />
            <ShowPasswords
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />
            <span className={style_form.errorEmailPasswordMessage}>{errors.password?.message}</span>
          </label>
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
