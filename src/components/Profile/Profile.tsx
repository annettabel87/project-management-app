import { useState } from 'react';

import { useAppDispatch } from '../../hooks/ReduxHooks';
import HeaderEnterApp from '../../shared/header-enter-app/header-enter-app';
import style_form from '../../shared/show-password/show-password.module.scss';
import { deleteUser } from '../../redux/profile-slice';
import { useNavigate } from 'react-router-dom';
import { ROUTERS } from '../../constants/constants';
import Modal from '../Modal/Modal';
import ConfirmationWindow from '../ConfirmationWindow/ConfirmationWindow';

import s from '../../pages/Registration/Registration.module.scss';
import { TCurrentUser } from '../../interfaces/Interfaces';
import { logout } from '../../redux/authorisation-slice';
import { localStorageActions } from '../../utils/localStorageActions';

type TMyProfile = {
  setEditMode: (editMode: boolean) => void;
  user?: TCurrentUser;
};

const Profile = (props: TMyProfile) => {
  const { setEditMode, user } = props;
  const [openWindow, setOpenWindow] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
          <HeaderEnterApp title={'Your profile'} />
          <div className={s.main}>
            <label className={style_form.emailPasswordContainer}>
              <span className={style_form.inputTitle}>name</span>
              <input title={'name'} type={'name'} value={user?.name || ''} readOnly />
            </label>
            <label className={style_form.emailPasswordContainer}>
              <span className={style_form.inputTitle}>login</span>
              <input title={'login'} type={'login'} value={user?.login || ''} readOnly />
            </label>
            <label className={style_form.emailPasswordContainer}>
              <span className={style_form.inputTitle}>password</span>
              <input title={'password'} type={'password'} value={user?.password || ''} readOnly />
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
                  Edit
                </span>
              </div>
              <div className={s.blueBtnContainer}>
                <span
                  className={s.btnCancel}
                  style={{ maxWidth: 'none' }}
                  onClick={() => setOpenWindow(true)}
                >
                  Delete user
                </span>
                {openWindow && (
                  <>
                    <Modal onClose={() => setOpenWindow(false)} open={openWindow}>
                      <ConfirmationWindow
                        onClose={() => setOpenWindow(false)}
                        handleOK={() => deleteAuthorizationUser(user!.id)}
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
