import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { cancel, updateUser } from '../../redux/profile-slice';
import ShowPasswords from '../../shared/show-password/show-password';
import { SubmitHandler, useForm } from 'react-hook-form';
import MainActionButton from '../../shared/main-action-button/main-action-button';
import HeaderEnterApp from '../../shared/header-enter-app/header-enter-app';
import { TCurrentUser, TUpdateUser } from '../../interfaces/Interfaces';

import s from '../../pages/Registration/Registration.module.scss';
import style_form from '../../shared/show-password/show-password.module.scss';

type TEditProfile = {
  setEditMode: (editMode: boolean) => void;
  user?: TCurrentUser;
};

const EditProfile = (props: TEditProfile) => {
  const { setEditMode, user } = props;
  const { errorRegistration, registrationRequestStatus } = useAppSelector(
    (state) => state.authorisationSlice
  );
  const dispatch = useAppDispatch();

  const [errorPasswords, setErrorPasswords] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>(user?.name);
  const [login, setLogin] = useState<string | undefined>(user?.login);
  const [password, setPassword] = useState<string | undefined>(user?.password);
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<TUpdateUser & { passwordConfirm: string }> = (data) => {
    if (data.user.password !== data.passwordConfirm) {
      setErrorPasswords(t('sorry_but_the_passwords_dont_match'));
    } else if (data && data.user.password === data.passwordConfirm) {
      dispatch(
        updateUser({
          userId: user?.id,
          user: {
            name: data.user.name,
            login: data.user.login,
            password: data.user.password,
          },
        })
      );

      setEditMode(false);
    }
    errorRegistration === undefined &&
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
        <HeaderEnterApp title={t('edit_profile')} />
        <div className={s.main}>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>{t('name')}</span>
            <input
              {...register('user.name', {
                required: t('please_enter_your_name'),
                pattern: {
                  value: /^[a-zA-Z ]{2,30}$/,
                  message: t('please_enter_your_name_correctly'),
                },
              })}
              value={name}
              placeholder={t('enter_your_name')}
              title={t('name')}
              type={'name'}
              onChange={changeName}
            />
            <span className={style_form.errorEmailPasswordMessage}>
              {errors.user?.name?.message}
            </span>
          </label>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>{t('login')}</span>
            <input
              {...register('user.login', {
                required: t('please_enter_your_login'),
                pattern: {
                  value: /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/i,
                  message: t('please_enter_your_login_correctly'),
                },
              })}
              value={login}
              onChange={changeLogin}
              placeholder={t('enter_your_login')}
              title={t('login')}
              type={'login'}
            />
            <span className={style_form.errorEmailPasswordMessage}>
              {errors.user?.login?.message}
            </span>
          </label>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>{t('password')}</span>
            <input
              {...register('user.password', {
                required: t('please_enter_your_password'),
                pattern: {
                  value: /[0-9a-zA-Z!@#$%^&*]{8,}/,
                  message: t('please_enter_your_password_correctly'),
                },
              })}
              value={password}
              onChange={changePassword}
              placeholder={t('enter_your_password')}
              title={t('password')}
              type={typeShowInput('password', showPassword)}
            />
            <ShowPasswords showPassword={showPassword} setShowPassword={setShowPassword} />
            <span className={style_form.errorEmailPasswordMessage}>
              {errors.user?.password?.message}
            </span>
          </label>
          <label className={style_form.emailPasswordContainer}>
            <span className={style_form.inputTitle}>{t('confirm_password')}</span>
            <input
              {...register('passwordConfirm', {
                required: t('please_enter_your_confirm_password'),
                pattern: {
                  value: /[0-9a-zA-Z!@#$%^&*]{8,}/,
                  message: t('please_enter_your_confirm_password_correctly'),
                },
              })}
              placeholder={t('enter_your_confirm_password')}
              title={t('confirm_password')}
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
                {t('cancel')}
              </span>
              <div className={s.blueBtnContainer}>
                <MainActionButton
                  type={'submit'}
                  disabledBtnSubmit={!isDirty || !isValid || !!errorPasswords}
                  title={t('save')}
                  loadingStatus={registrationRequestStatus}
                />
              </div>
            </div>
            <span className={s.errorMessageContainer}>{errorPasswords || errorRegistration}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
