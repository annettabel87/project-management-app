import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../../hooks/ReduxHooks';
import { BoardData } from '../../../interfaces/Interfaces';
import { deleteBoardById } from '../../../store/actions';
import { ConfirmationWindow } from '../../ConfirmationWindow/ConfirmationWindow';
import { Modal } from '../../Modal/Modal';
import './BoardPreview.css';

export const BoardPreview: FC<BoardData> = ({ id, title }: BoardData) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const dispatch = useAppDispatch();
  const deleteBoard = () => {
    dispatch(deleteBoardById(id));
    setIsOpen(false);
  };
  return (
    <div className="card">
      <div>
        <button onClick={() => setIsOpen(true)}>X</button>
        <div>{title}</div>
      </div>
      <Modal onClose={onClose} open={isOpen}>
        <ConfirmationWindow onClose={onClose} handleOK={deleteBoard} />
      </Modal>
    </div>
  );
};
