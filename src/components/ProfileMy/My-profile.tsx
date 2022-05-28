import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import HeaderEnterApp from '../../shared/header-enter-app/header-enter-app';
import style_form from '../../shared/show-password/show-password.module.scss';
import savePassword from '../../shared/password-save/password-save';
import { deleteUser, getUser } from '../../redux/edit-profile-slice';
import { useNavigate } from 'react-router-dom';
import { ROUTERS } from '../../constants/constants';
import saveLogin from '../../shared/login-save/login-save';
import tokenActions from '../../api/token-actions/token-actions';
import Modal from '../../components/Modal/Modal';
import ConfirmationWindow from '../../components/ConfirmationWindow/ConfirmationWindow';

import s from '../../pages/Registration/Registration.module.scss';
import saveId from '../../shared/id-save/id-save';
import { TResponseUserData } from '../../interfaces/Interfaces';

type TMyProfile = {
  setEditMode: (editMode: boolean) => void;
  user?: TResponseUserData;
};

const MyProfile = (props: TMyProfile) => {
  const { setEditMode, user } = props;
  const [openWindow, setOpenWindow] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteAuthorizationUser = (userId: string) => {
    dispatch(deleteUser(userId)).then(() => {
      saveLogin.removeUserLogin();
      savePassword.removeUserPassword();
      tokenActions.removeUserToken();
      saveId.removeUserId();
      setOpenWindow(false);
      navigate(`${ROUTERS.LOGIN}`);
    });
  };

  return (
    <>
      <div className={s.container}>
        <form className={s.wrapper} style={{ height: '420px' }}>
          <HeaderEnterApp title={'Your profile'} />
          <div className={s.main}>
            <label className={style_form.emailPasswordContainer}>
              <span className={style_form.inputTitle}>name</span>
              <input title={'name'} type={'name'} defaultValue={user?.name} readOnly />
            </label>
            <label className={style_form.emailPasswordContainer}>
              <span className={style_form.inputTitle}>login</span>
              <input title={'login'} type={'login'} defaultValue={user?.login} readOnly />
            </label>
            <label className={style_form.emailPasswordContainer}>
              <span className={style_form.inputTitle}>password</span>
              <input
                title={'password'}
                type={'password'}
                defaultValue={savePassword.getUserPassword() as string}
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

export default MyProfile;
