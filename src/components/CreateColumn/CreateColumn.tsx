import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../hooks/ReduxHooks';
import { ICreateBoardFormProps, TColumnData } from '../../interfaces/Interfaces';
import { createColumn } from '../../redux/columns-slice';

import s from './CreateColumn.module.scss';
import style_form from '../../shared/show-password/show-password.module.scss';

const CreateColumn: FC<ICreateBoardFormProps> = ({ onClose }: ICreateBoardFormProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TColumnData>();

  const onSubmit = handleSubmit((data) => {
    const boardId = localStorage.getItem('selectBoard');
    if (boardId) {
      dispatch(createColumn({ boardId: boardId, columnData: data }));
      onClose();
    }
    reset();
  });
  return (
    <div className={s.overlay} onClick={onClose}>
      <div
        className={s.columnFormWrapper}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className={s.close} onClick={onClose}>
          X
        </button>

        <form className={s.columnForm} onSubmit={onSubmit}>
          <label htmlFor="title" className={s.formLabel}>
            <span className={style_form.inputTitle}>{t('title')}</span>
            <input
              type="text"
              placeholder={t('enter_your_title')}
              className={s.formInput}
              {...register('title', {
                required: t('enter_your_title'),
              })}
              title={t('title')}
            />
            {errors.title && <span className={s.error}>{errors.title.message}</span>}
          </label>
          <button className={s.formBtn} onSubmit={(e) => onSubmit(e)}>
            {t('create')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateColumn;
