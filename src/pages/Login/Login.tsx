import { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import HeaderEnterApp from '../../shared/header-enter-app/header-enter-app';
import MainActionButton from '../../shared/main-action-button/main-action-button';
import { ROUTERS } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { loginUser } from '../../redux/authorisation-slice';
import { ILoginData } from '../../interfaces/Interfaces';
import ShowPasswords from '../../shared/show-password/show-password';
import { localStorageActions } from '../../utils/localStorageActions';

import s from './Login.module.scss';
import style_form from '../../shared/show-password/show-password.module.scss';

const Login = () => {
  const { errorLogin, loginRequestStatus, token } = useAppSelector(
    (state) => state.authorisationSlice
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ILoginData>({
    mode: 'onChange',
  });

  const typeShowInput = (type: 'name' | 'login' | 'password' | 'text') => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    data && dispatch(loginUser(data));
    localStorageActions.setLoginData(data);

    errorLogin !== undefined &&
      reset({
        login: '',
        password: '',
      });
  };

  if (token) {
    return <Navigate to={ROUTERS.MAIN} />;
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <HeaderEnterApp title={t('sign_in')} />
        <form className={s.main} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.emailPasswordLoginContainer}>
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
                type={typeShowInput('password')}
              />
              <ShowPasswords showPassword={showPassword} setShowPassword={setShowPassword} />
              <span className={style_form.errorEmailPasswordMessage}>
                {errors.password?.message}
              </span>
            </label>
          </div>
          <div className={style_form.authBtn}>
            <div className={style_form.authMainBtn}>
              <MainActionButton
                type={'submit'}
                disabledBtnSubmit={!isDirty || !isValid}
                loadingStatus={loginRequestStatus}
                title={t('login')}
              />
            </div>
            <span className={style_form.errorMessage}>{errorLogin}</span>
          </div>
        </form>
        <div className={s.footer}>
          <p className={s.text}>{t('dont_have_an_account')}</p>
          <NavLink to={ROUTERS.REGISTRATION} className={s.footerBtn}>
            {t('sign_up')}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
