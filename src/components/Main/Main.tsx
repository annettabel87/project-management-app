import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routers } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { getBoards } from '../../store/actions';
import { CreateBoardForm } from '../Header/CreateBoardForm/CreateBoardForm';
import { Modal } from '../Modal/Modal';
import { BoardsField } from './BoardsField/BoardsField';
import './Main.css';

export const Main: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { boards, isLoading, error } = useAppSelector((state) => state.boardReducer);
  const isAuth = true;
  const dispatch = useAppDispatch();
  const createBoard = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);
  if (!isAuth) {
    navigate(routers.ROUTE_WELCOME);
  }
  return (
    <div className="mainPage">
      <h2>Your boards</h2>
      <button onClick={createBoard}>New board</button>
      {error ? (
        <span>{error}</span>
      ) : isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <BoardsField boards={boards} />
      )}
      <Modal onClose={onClose} open={isOpen}>
        <CreateBoardForm isAuth={isAuth} onClose={onClose} />
      </Modal>
    </div>
  );
};
