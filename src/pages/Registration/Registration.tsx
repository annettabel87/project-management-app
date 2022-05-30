import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
  const { errorRegistration, registrationRequestStatus, token } = useAppSelector(
    (state) => state.authorisationSlice
  );
  const [errorPasswords, setErrorPasswords] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    errorRegistration === undefined &&
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

  if (token) {
    return <Navigate to={ROUTERS.MAIN} />;
  }

  return (
    <div className={s.container}>
      <form className={s.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <HeaderEnterApp title={t('sign_up')} />
        <div className={s.main}>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>{t('name')}</span>
            <input
              {...register('name', {
                required: t('please_enter_your_name'),
                pattern: {
                  value: /^[a-zA-Z ]{2,30}$/,
                  message: t('please_enter_your_name_correctly'),
                },
              })}
              placeholder={t('enter_your_name')}
              title={t('name')}
              type={'name'}
            />
            <span className={style_form.errorEmailPasswordMessage}>{errors.name?.message}</span>
          </label>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>{t('login')}</span>
            <input
              {...register('login', {
                required: t('please_enter_your_login'),
                pattern: {
                  value: /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/i,
                  message: t('please_enter_your_login_correctly'),
                },
              })}
              placeholder={t('enter_your_login')}
              title={t('login')}
              type={'login'}
            />
            <span className={style_form.errorEmailPasswordMessage}>{errors.login?.message}</span>
          </label>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>{t('password')}</span>
            <input
              {...register('password', {
                required: t('please_enter_your_password'),
                pattern: {
                  value: /[0-9a-zA-Z!@#$%^&*]{8,}/,
                  message: t('please_enter_your_password_correctly'),
                },
              })}
              placeholder={t('enter_your_password')}
              title={t('password')}
              type={typeShowInput('password', showPassword)}
            />
            <ShowPasswords showPassword={showPassword} setShowPassword={setShowPassword} />
            <span className={style_form.errorEmailPasswordMessage}>{errors.password?.message}</span>
          </label>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>{t('confirm_password')}</span>
            <input
              {...register('passwordConfirm', {
                required: 'Please, enter your confirm password',
                pattern: {
                  value: /[0-9a-zA-Z!@#$%^&*]{8,}/,
                  message: t('please_enter_your_confirm_password_correctly'),
                },
              })}
              placeholder={t('enter_your_confirm_password')}
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
              {t('cancel')}
            </span>
            <div className={s.blueBtnContainer}>
              <MainActionButton
                type={'submit'}
                disabledBtnSubmit={!isDirty || !isValid || !!errorPasswords}
                title={t('register')}
                loadingStatus={registrationRequestStatus}
              />
            </div>
          </div>
          <span className={s.errorMessageContainer}>{errorPasswords || errorRegistration}</span>
        </div>
      </form>
    </div>
  );
};

export default Registration;
