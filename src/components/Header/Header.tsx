import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Modal from '../Modal/Modal';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import { ROUTERS } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { logout, updateLanguage } from '../../redux/authorisation-slice';
import { localStorageActions } from '../../utils/localStorageActions';

import s from './Header.module.scss';

const Header = () => {
  const [sticky, setSticky] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLanguage } = useAppSelector((state) => state.authorisationSlice);
  const currentUser = !!localStorageActions.getToken();
  const { t } = useTranslation();

  const { i18n } = useTranslation();

  const onLanguageChange = () => {
    if (isLanguage) {
      dispatch(updateLanguage(false));
      i18n.changeLanguage('ru').then(() => console.log('язык изменен на русский'));
    } else {
      dispatch(updateLanguage(true));
      i18n.changeLanguage('en').then(() => console.log('language changed to English'));
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const setSticked = () => {
    if (window.scrollY >= 100) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', setSticked);

    return () => {
      document.removeEventListener('scroll', setSticked);
    };
  }, []);

  const logOut = () => {
    localStorageActions.removeToken();
    dispatch(logout());
    navigate(ROUTERS.WELCOME);

    localStorageActions.removeCurrentUser();
  };

  const createBoard = () => {
    setIsOpen(true);
  };

  return (
    <header className={sticky ? `${s.header} ${s.sticky}` : s.header}>
      <select onChange={onLanguageChange} value={isLanguage ? 'en' : 'ru'} className={s.select}>
        <option value="ru">Ru</option>
        <option value="en">En</option>
      </select>
      <NavLink className={s.header__item} to={ROUTERS.WELCOME}>
        {t('welcome')}
      </NavLink>
      {currentUser && (
        <>
          <NavLink className={s.header__item} to={ROUTERS.PROFILE}>
            {t('edit_profile')}
          </NavLink>
          <NavLink className={s.header__item} to={ROUTERS.MAIN}>
            {t('main')}
          </NavLink>
          <button onClick={createBoard}>{t('new_board')}</button>
          <button onClick={logOut}>{t('logout')}</button>
        </>
      )}
      {!currentUser && (
        <>
          <NavLink className={s.header__item} to={ROUTERS.LOGIN}>
            {t('sign_in')}
          </NavLink>
          <NavLink className={s.header__item} to={ROUTERS.REGISTRATION}>
            {t('sign_up')}
          </NavLink>
        </>
      )}

      <Modal onClose={onClose} open={isOpen}>
        <CreateBoardForm onClose={onClose} />
      </Modal>
    </header>
  );
};

export default Header;
