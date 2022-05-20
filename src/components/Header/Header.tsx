import { FC, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Modal from '../Modal/Modal';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';

import { ROUTERS } from '../../constants/constants';
import tokenActions from '../../api/token-actions/token-actions';
import { useAppDispatch } from '../../hooks/ReduxHooks';
import { logout } from '../../redux/authorisation-slice';
import s from './Header.module.scss';

const Header: FC = () => {
  const [sticky, setSticky] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = tokenActions.getUserToken() ? true : false;
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
    tokenActions.removeUserToken();
    dispatch(logout());
    navigate(ROUTERS.LOGIN);
  };

  const createBoard = () => {
    setIsOpen(true);
  };
  const changeLanguage = () => {};

  return (
    <header className={sticky ? `${s.header} ${s.sticky}` : s.header}>
      <NavLink className={s.header__item} to={ROUTERS.WELCOME}>
        Welcome
      </NavLink>
      {currentUser && (
        <>
          <NavLink className={s.header__item} to={ROUTERS.MAIN}>
            Main
          </NavLink>
          <NavLink className={s.header__item} to={ROUTERS.BOARD}>
            Board
          </NavLink>
          <NavLink className={s.header__item} to={ROUTERS.PROFILE}>
            Edit profile
          </NavLink>
          <button onClick={createBoard}>New board</button>
          <button onClick={logOut}>Logout</button>
        </>
      )}
      {!currentUser && (
        <NavLink className={s.header__item} to={ROUTERS.LOGIN}>
          Login
        </NavLink>
      )}

      <select onSelect={changeLanguage}>
        <option value="Ru">Ru</option>
        <option value="En">En</option>
      </select>
      <Modal onClose={onClose} open={isOpen}>
        <CreateBoardForm onClose={onClose} />
      </Modal>
    </header>
  );
};

export default Header;
