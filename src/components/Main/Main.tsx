import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routers } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { getBoards } from '../../store/boardReducer';
import { CreateBoardForm } from '../Header/CreateBoardForm/CreateBoardForm';
import { Modal } from '../Modal/Modal';
import { BoardsField } from './BoardsField/BoardsField';
import styles from './Main.module.css';

export const Main: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { boards, requestStatus, error } = useAppSelector((state) => state.boardReducer);
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
    <div className={styles.mainPage}>
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>Your boards</h2>
        <button className={styles.mainBtn} onClick={createBoard}>
          New board
        </button>
        {error && <span>{error}</span>}
        {requestStatus === 'pending' ? <div>Loading</div> : <BoardsField boards={boards} />}
        <Modal onClose={onClose} open={isOpen}>
          <CreateBoardForm isAuth={isAuth} onClose={onClose} />
        </Modal>
      </div>
    </div>
  );
};
