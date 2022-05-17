import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routers } from '../../../constants/constants';
import { useAppDispatch } from '../../../hooks/ReduxHooks';
import { BoardData } from '../../../interfaces/Interfaces';
import { deleteBoardById, getBoardById } from '../../../store/boardReducer';
import { ConfirmationWindow } from '../../ConfirmationWindow/ConfirmationWindow';
import { Modal } from '../../Modal/Modal';
import styles from './BoardPreview.module.css';

export const BoardPreview: FC<BoardData> = ({ id, title }: BoardData) => {
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
    navigate(`${routers.ROUTE_BOARD}`);
  };
  return (
    <div className={styles.card} onClick={openBoard}>
      <button
        className={styles.cardBtn}
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
