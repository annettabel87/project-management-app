import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmationWindow from '../ConfirmationWindow/ConfirmationWindow';
import Modal from '../Modal/Modal';

import { ROUTERS } from '../../constants/constants';
import { useAppDispatch } from '../../hooks/ReduxHooks';
import { IBoardData } from '../../interfaces/Interfaces';
import { deleteBoardById, getBoardById } from '../../redux/boards-slice';
import s from './BoardPreview.module.scss';

const BoardPreview: FC<IBoardData> = ({ id, title }: IBoardData) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const onClose = () => {
    setIsOpen(false);
  };
  const dispatch = useAppDispatch();
  const deleteBoard = () => {
    dispatch(deleteBoardById(id));
    setIsOpen(false);
  };
  const openBoard = () => {
    dispatch(getBoardById(id));
    navigate(`${ROUTERS.BOARD}`);
  };
  return (
    <div className={s.card} onClick={openBoard}>
      <button
        className={s.cardBtn}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        X
      </button>
      <div>{title}</div>

      <Modal onClose={onClose} open={isOpen}>
        <ConfirmationWindow onClose={onClose} handleOK={deleteBoard} />
      </Modal>
    </div>
  );
};

export default BoardPreview;
