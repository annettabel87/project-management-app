import React, { ChangeEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { cancel, updateUser } from '../../redux/edit-profile-slice';
import ShowPasswords from '../../shared/show-password/show-password';
import { SubmitHandler, useForm } from 'react-hook-form';
import MainActionButton from '../../shared/main-action-button/main-action-button';
import saveLogin from '../../shared/login-save/login-save';
import savePassword from '../../shared/password-save/password-save';
import HeaderEnterApp from '../../shared/header-enter-app/header-enter-app';
import { TUpdateUser } from '../../interfaces/Interfaces';

import s from '../../pages/Registration/Registration.module.scss';
import style_form from '../../shared/show-password/show-password.module.scss';

type TEditProfile = {
  setEditMode: (editMode: boolean) => void;
};

const EditProfile = (props: TEditProfile) => {
  const { setEditMode } = props;
  const { user } = useAppSelector((state) => state.usersSlice);
  const { error, registrationRequestStatus } = useAppSelector((state) => state.authorisationSlice);
  const dispatch = useAppDispatch();

  const [errorPasswords, setErrorPasswords] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>(user?.name);
  const [login, setLogin] = useState<string | undefined>(user?.login);
  const [password, setPassword] = useState<string>(savePassword.getUserPassword() as string);

  const onSubmit: SubmitHandler<TUpdateUser & { passwordConfirm: string }> = (data) => {
    if (data.user.password !== data.passwordConfirm) {
      setErrorPasswords(`Sorry, but the passwords don't match.`);
    } else if (data && data.user.password === data.passwordConfirm) {
      dispatch(
        updateUser({
          userId: user?.id,
          user: {
            name: data.user.name ? data.user.name : (user?.name as string),
            login: data.user.login ? data.user.login : (user?.login as string),
            password: data.user.password
              ? data.user.password
              : (savePassword.getUserPassword() as string),
          },
        })
      );
      saveLogin.setUserLogin(data.user.login);
      savePassword.setUserPassword(data.user.password);
      setEditMode(false);
    }
    error === undefined &&
      reset({
        user: {
          name: '',
          login: '',
          password: '',
        },
        passwordConfirm: '',
      });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<TUpdateUser & { passwordConfirm: string }>({
    mode: 'onChange',
  });

  const typeShowInput = (type: 'name' | 'login' | 'password' | 'text', showPassword: boolean) => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  const goBack = () => {
    setEditMode(false);
    dispatch(cancel());
  };

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const changeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value);
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <div className={s.container}>
      <form className={s.wrapper} onSubmit={handleSubmit(onSubmit)} style={{ height: '420px' }}>
        <HeaderEnterApp title={'Edit profile'} />
        <div className={s.main}>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>name</span>
            <input
              {...register('user.name', {
                required: 'Please, enter your new name',
                pattern: {
                  value: /^[a-zA-Z ]{2,30}$/,
                  message: 'Please, enter your name correctly',
                },
              })}
              value={name}
              placeholder={'change your name...'}
              title={'name'}
              type={'name'}
              onChange={changeName}
            />
            <span className={style_form.errorEmailPasswordMessage}>
              {errors.user?.name?.message}
            </span>
          </label>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>login</span>
            <input
              {...register('user.login', {
                required: 'Please, enter your new login',
                pattern: {
                  value: /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/i,
                  message: 'Please, enter your login correctly',
                },
              })}
              value={login}
              onChange={changeLogin}
              placeholder={'change your login...'}
              title={'login'}
              type={'login'}
            />
            <span className={style_form.errorEmailPasswordMessage}>
              {errors.user?.login?.message}
            </span>
          </label>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>password</span>
            <input
              {...register('user.password', {
                required: 'Please, enter your new password',
                pattern: {
                  value: /[0-9a-zA-Z!@#$%^&*]{8,}/,
                  message: 'Please, enter your password correctly',
                },
              })}
              value={password}
              onChange={changePassword}
              placeholder={'change your password...'}
              title={'password'}
              type={typeShowInput('password', showPassword)}
            />
            <ShowPasswords showPassword={showPassword} setShowPassword={setShowPassword} />
            <span className={style_form.errorEmailPasswordMessage}>
              {errors.user?.password?.message}
            </span>
          </label>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>Confirm password</span>
            <input
              {...register('passwordConfirm', {
                required: 'Please, enter change your confirm new password',
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
            <span className={style_form.errorEmailPasswordMessage}>
              {errors.user?.password?.message}
            </span>
          </label>
          <div className={s.footer}>
            <div className={s.footerBtns}>
              <span className={s.btnCancel} onClick={goBack}>
                Cancel
              </span>
              <div className={s.blueBtnContainer}>
                <MainActionButton
                  type={'submit'}
                  disabledBtnSubmit={!isDirty || !isValid || !!errorPasswords}
                  title={'Save'}
                  loadingStatus={registrationRequestStatus}
                />
              </div>
            </div>
            <span className={s.errorMessageContainer}>{errorPasswords || error}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
