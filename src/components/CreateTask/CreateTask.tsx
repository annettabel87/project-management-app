import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { ICreateTaskFormProps, TTaskData } from '../../interfaces/Interfaces';
import { addTask } from '../../redux/columns-slice';

import s from './CreateTask.module.scss';

const CreateTask: FC<ICreateTaskFormProps> = ({ onClose, columnId }: ICreateTaskFormProps) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.profileSlice);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTaskData>();

  const onSubmit = handleSubmit((data) => {
    const boardId = localStorage.getItem('selectBoard');

    if (boardId) {
      dispatch(addTask({ boardId: boardId, columnId: columnId, taskData: data }));
    }
    onClose();
    reset();
  });
  return (
    <div className={s.overlay} onClick={onClose}>
      <div
        className={s.taskFormWrapper}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className={s.close} onClick={onClose}>
          X
        </button>
        <form className={s.taskForm} onSubmit={onSubmit}>
          <label htmlFor="title" className={s.formLabel}>
            <p className={s.formTitle}>{t('title')}</p>
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
          <label htmlFor="description" className={s.formLabel}>
            <p className={s.formTitle}>{t('description')}</p>
            <input
              type="text"
              placeholder={t('enter_your_description')}
              className={s.formInput}
              {...register('description', {
                required: t('enter_your_description'),
              })}
              title={t('description')}
            />
            {errors.description && <span className={s.error}>{errors.description.message}</span>}
          </label>
          <label htmlFor="userId">
            <p className={s.formTitle}>{t('user')}</p>
            <select
              {...register('userId', {
                required: t('select_user'),
              })}
            >
              {users &&
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </select>
            {errors.userId && <span className={s.error}>{errors.userId.message}</span>}
          </label>
          <button type="submit" className={s.formBtn}>
            {t('create')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
