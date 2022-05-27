import { FC, useEffect, useState } from 'react';

import CreateBoardForm from '../../components/CreateBoardForm/CreateBoardForm';
import Modal from '../../components/Modal/Modal';
import BoardsField from '../../components/BoardsField/BoardsField';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { getBoards } from '../../redux/boards-slice';

import s from './Main.module.scss';

const Main: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { boards, requestStatus, error } = useAppSelector((state) => state.boardsSlice);

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

  return (
    <div className={s.mainPage}>
      <div className={s.container}>
        <h2 className={s.mainTitle}>Your boards</h2>
        <button className={s.mainBtn} onClick={createBoard}>
          New board
        </button>
        {error && <h3 className={s.error}>{error}</h3>}
        {requestStatus === 'pending' ? (
          <div>Loading</div>
        ) : boards.length ? (
          <BoardsField boards={boards} />
        ) : (
          <p className={s.text}>You have not boards</p>
        )}
        <Modal onClose={onClose} open={isOpen}>
          <CreateBoardForm onClose={onClose} />
        </Modal>
      </div>
    </div>
  );
};

export default Main;
