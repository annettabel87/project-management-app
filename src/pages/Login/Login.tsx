import { Navigate, NavLink } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import HeaderEnterApp from '../../shared/header-enter-app/header-enter-app';
import InputContainer from '../../shared/input-container/input-container';
import MainActionButton from '../../shared/main-action-button/main-action-button';
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ILoginData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    data && dispatch(loginUser(data));
    error !== undefined &&
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
        <HeaderEnterApp title={'Sign In'} />
        <form className={s.main} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.emailPasswordLoginContainer}>
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
          </div>
          <div className={s.authBtn}>
            <div className={s.authMainBtn}>
              <MainActionButton
                type={'submit'}
                disabledBtnSubmit={!isDirty || !isValid}
                loadingStatus={loginRequestStatus}
                title={'login'}
              />
            </div>
            <span className={s.errorMessage}>{error}</span>
          </div>
        </form>
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
