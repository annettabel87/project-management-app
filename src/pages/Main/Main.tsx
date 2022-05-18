import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CreateBoardForm from '../../components/CreateBoardForm/CreateBoardForm';
import Modal from '../../components/Modal/Modal';
import BoardsField from '../../components/BoardsField/BoardsField';

import { ROUTERS } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { getBoards } from '../../redux/boards-slice';

import styles from './Main.module.scss';

const Main: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { boards, requestStatus, error } = useAppSelector((state) => state.boardsSlice);
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
    navigate(ROUTERS.WELCOME);
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

export default Main;
