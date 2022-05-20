import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { ICreateBoardFormProps } from '../../interfaces/Interfaces';
import { addBoard } from '../../redux/boards-slice';
import s from './CreateBoardForm.module.scss';

const CreateBoardForm: FC<ICreateBoardFormProps> = ({ onClose }: ICreateBoardFormProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.boardsSlice);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addBoard({ title, description }));
    setTitle('');
    setDescription('');
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
          <label htmlFor="title" className={s.formLabel}>
            <p className={s.formTitle}>Description</p>
            <input
              type="text"
              className={s.formInput}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button className={s.formBtn}>create</button>
          {error && <p className={s.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateBoardForm;
