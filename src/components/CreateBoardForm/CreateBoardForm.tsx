import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTERS } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { ICreateBoardFormProps } from '../../interfaces/Interfaces';
import { addBoard } from '../../redux/boards-slice';
import s from './CreateBoardForm.module.scss';

const CreateBoardForm: FC<ICreateBoardFormProps> = ({ isAuth, onClose }: ICreateBoardFormProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.boardsSlice);
  if (!isAuth) {
    navigate(ROUTERS.LOGIN);
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addBoard(title));
    setTitle('');
  };
  return (
    <div className={s.overlay} onClick={onClose}>
      <div
        className={s.boardFormWrapper}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className={s.close} onClick={onClose}>
          X
        </button>
        <form className={s.boardForm} onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="title" className={s.formLabel}>
            <p className={s.formTitle}>Title</p>
            <input
              type="text"
              className={s.formInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <button className={s.formBtn}>create</button>
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default CreateBoardForm;
