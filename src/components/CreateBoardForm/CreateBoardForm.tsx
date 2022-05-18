import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTERS } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { ICreateBoardFormProps } from '../../interfaces/Interfaces';
import { addBoard } from '../../redux/boards-slice';
import styles from './CreateBoardForm.module.scss';

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
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.boardFormWrapper}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className={styles.close} onClick={onClose}>
          X
        </button>
        <form className={styles.boardForm} onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="title" className={styles.formLabel}>
            <p className={styles.formTitle}>Title</p>
            <input
              type="text"
              className={styles.formInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <button className={styles.formBtn}>create</button>
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default CreateBoardForm;
