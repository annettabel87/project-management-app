import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../hooks/ReduxHooks';
import { ICreateBoardFormProps } from '../../interfaces/Interfaces';
import { addBoard } from '../../redux/boards-slice';

import s from './CreateBoardForm.module.scss';
import style_form from '../../shared/show-password/show-password.module.scss';

const CreateBoardForm: FC<ICreateBoardFormProps> = ({ onClose }: ICreateBoardFormProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addBoard({ title, description }));
    setTitle('');
    setDescription('');
    onClose();
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
            <span className={style_form.inputTitle}>{t('title')}</span>
            <input
              type="text"
              className={s.formInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="title" className={s.formLabel}>
            <span className={style_form.inputTitle}>{t('description')}</span>
            <input
              type="text"
              className={s.formInput}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button className={s.formBtn}>{t('create')}</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardForm;
