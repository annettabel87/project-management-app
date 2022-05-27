import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/ReduxHooks';

import { ICreateBoardFormProps, TColumnData } from '../../interfaces/Interfaces';
import { createColumn } from '../../redux/boards-slice';
import s from './CreateColumn.module.scss';

const CreateColumn: FC<ICreateBoardFormProps> = ({ onClose }: ICreateBoardFormProps) => {
  const dispatch = useAppDispatch();

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
            <p className={s.formTitle}>Title</p>
            <input
              type="text"
              placeholder="Enter your title"
              className={s.formInput}
              {...register('title', {
                required: 'Enter your title',
              })}
              title="title"
            />
            {errors.title && <span className={s.error}>{errors.title.message}</span>}
          </label>
          <button className={s.formBtn} onSubmit={(e) => onSubmit(e)}>
            create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateColumn;
