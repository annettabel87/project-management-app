import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/ReduxHooks';
import HeaderEnterApp from '../../shared/header-enter-app/header-enter-app';
import { deleteUser } from '../../redux/profile-slice';
import { ROUTERS } from '../../constants/constants';
import Modal from '../Modal/Modal';
import ConfirmationWindow from '../ConfirmationWindow/ConfirmationWindow';
import { TCurrentUser } from '../../interfaces/Interfaces';
import { logout } from '../../redux/authorisation-slice';
import { localStorageActions } from '../../utils/localStorageActions';

import s from '../../pages/Registration/Registration.module.scss';
import style_form from '../../shared/show-password/show-password.module.scss';

type TMyProfile = {
  setEditMode: (editMode: boolean) => void;
  user?: TCurrentUser;
};

const Profile = (props: TMyProfile) => {
  const { setEditMode, user } = props;
  const [openWindow, setOpenWindow] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const deleteAuthorizationUser = (userId: string) => {
    dispatch(logout());
    dispatch(deleteUser(userId));

    localStorageActions.removeCurrentUser();
    localStorageActions.removeToken();
    setOpenWindow(false);
    navigate(`${ROUTERS.LOGIN}`);
  };

  return (
    <>
      <div className={s.container}>
        <form className={s.wrapper} style={{ height: '420px' }}>
          <HeaderEnterApp title={t('your_profile')} />
          <div className={s.main}>
            <label className={style_form.emailPasswordContainer}>
              <span className={style_form.inputTitle}>{t('name')}</span>
              <input title={t('name')} type={'name'} value={user?.name || ''} readOnly />
            </label>
            <label className={style_form.emailPasswordContainer}>
              <span className={style_form.inputTitle}>{t('login')}</span>
              <input title={t('login')} type={'login'} value={user?.login || ''} readOnly />
            </label>
            <label className={style_form.emailPasswordContainer}>
              <span className={style_form.inputTitle}>{t('password')}</span>
              <input
                title={t('password')}
                type={'password'}
                value={user?.password || ''}
                readOnly
              />
            </label>
          </div>
          <div className={s.footer}>
            <div className={s.footerBtns} style={{ justifyContent: 'center' }}>
              <div className={s.blueBtnContainer}>
                <span
                  className={s.btnCancel}
                  style={{ maxWidth: 'none' }}
                  onClick={() => setEditMode(true)}
                >
                  {t('edit')}
                </span>
              </div>
              <div className={s.blueBtnContainer}>
                <span
                  className={s.btnCancel}
                  style={{ maxWidth: 'none' }}
                  onClick={() => setOpenWindow(true)}
                >
                  {t('delete_user')}
                </span>
                {openWindow && (
                  <>
                    <Modal onClose={() => setOpenWindow(false)} open={openWindow}>
                      <ConfirmationWindow
                        onClose={() => setOpenWindow(false)}
                        handleOK={() => deleteAuthorizationUser(user?.id as string)}
                      />
                    </Modal>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
