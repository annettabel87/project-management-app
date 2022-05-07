import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routers } from '../../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks';
import { CreateBoardFormProps } from '../../../interfaces/Interfaces';
import { addBoard } from '../../../store/actions';
import './CreateBoardForm.css';

export const CreateBoardForm: FC<CreateBoardFormProps> = ({
  isAuth,
  onClose,
}: CreateBoardFormProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.boardReducer);
  if (!isAuth) {
    navigate(routers.ROUTE_LOGIN);
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addBoard(title));
  };
  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="board-form-wrapper"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="close" onClick={onClose} />
        <form className="board-form" onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="title">
            Title
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <button>create</button>
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
};
