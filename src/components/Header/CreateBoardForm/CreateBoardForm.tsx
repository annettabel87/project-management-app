import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routers } from '../../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks';
import { CreateBoardFormProps } from '../../../interfaces/Interfaces';
import { addBoard } from '../../../store/boardReducer';
import styles from './CreateBoardForm.module.css';

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
