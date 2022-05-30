import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CreateBoardForm from '../../components/CreateBoardForm/CreateBoardForm';
import Modal from '../../components/Modal/Modal';
import BoardsField from '../../components/BoardsField/BoardsField';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { getBoards } from '../../redux/boards-slice';
import imageAdd from '../../assets/image/svg/add.svg';

import s from './Main.module.scss';
import { Preloader } from '../../shared/preloader/preloader';

const Main: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { boards, requestStatus, error } = useAppSelector((state) => state.boardsSlice);

  const { t } = useTranslation();

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

  if (requestStatus === 'pending') {
    return <Preloader />;
  }

  return (
    <div className={s.mainPage}>
      <div className={s.container}>
        <h2 className={s.mainTitle}>{t('your_boards')}</h2>
        <button className={s.mainBtn} onClick={createBoard}>
          <img src={imageAdd} alt={'add board'} className={s.iconAdd} />
          {t('new_board')}
        </button>
        {error && <h3 className={s.error}>{error}</h3>}
        {boards.length ? (
          <BoardsField boards={boards} />
        ) : (
          <p className={s.text}>{t('you_have_not_boards')}</p>
        )}
        <Modal onClose={onClose} open={isOpen}>
          <CreateBoardForm onClose={onClose} />
        </Modal>
      </div>
    </div>
  );
};

export default Main;
