import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { routers } from '../../../constants/constants';
import { CreateBoardFormProps } from '../../../interfaces/Interfaces';
import './CreateBoardForm.css';

export const CreateBoardForm: FC<CreateBoardFormProps> = ({
  isAuth,
  onClose,
}: CreateBoardFormProps) => {
  const navigate = useNavigate();
  if (!isAuth) {
    navigate(routers.ROUTE_LOGIN);
  }
  const onSubmit = () => {};
  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="board-form-wrapper"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="close" onClick={onClose} />
        <form className="board-form" onSubmit={onSubmit}>
          <label htmlFor="title">
            Title
            <input type="text" />
          </label>
          <label htmlFor="description">
            Description
            <input type="text" />
          </label>
          <button>create</button>
        </form>
      </div>
    </div>
  );
};
