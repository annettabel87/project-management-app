import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routers } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { getBoards } from '../../store/actions';
import { BoardsField } from './BoardsField/BoardsField';
import './Main.css';

export const Main: FC = () => {
  const navigate = useNavigate();
  const { boards, isLoading, error } = useAppSelector((state) => state.boardReducer);
  const isAuth = true;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);
  if (!isAuth) {
    navigate(routers.ROUTE_WELCOME);
  }
  return (
    <div className="mainPage">
      <h2>Your boards</h2>
      {error ? (
        <span>{error}</span>
      ) : isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <BoardsField boards={boards} />
      )}
    </div>
  );
};
