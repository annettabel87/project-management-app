import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { routers } from '../../constants/constants';
import './Header.css';

export const Header: FC = () => {
  return (
    <header className="header">
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
    </header>
  );
};
