import React, { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { routers } from '../../constants/constants';
import { useState } from 'react';
import './Header.css';

export const Header: FC = () => {
  const [sticky, setSticky] = useState<boolean>(false);
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
  const logout = () => {};
  const createBoard = () => {};
  const changeLanguage = () => {};

  return (
    <header className={sticky ? 'header sticky' : 'header'}>
      <NavLink className="header-item" to={routers.ROUTE_WELCOME}>
        Welcome
      </NavLink>
      <NavLink className="header-item" to={routers.ROUTE_MAIN}>
        Main
      </NavLink>
      <NavLink className="header-item" to={routers.ROUTE_BOARD}>
        Board
      </NavLink>
      <NavLink className="header-item" to={routers.ROUTE_LOGIN}>
        Login
      </NavLink>
      <NavLink className="header-item" to={routers.ROUTE_PROFILE}>
        Edit profile
      </NavLink>
      <button onClick={logout}>Logout</button>
      <button onClick={createBoard}>New board</button>
      <select onSelect={changeLanguage}>
        <option value="Ru">Ru</option>
        <option value="En">En</option>
      </select>
    </header>
  );
};
