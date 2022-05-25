import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ICreateTaskFormProps } from '../../interfaces/Interfaces';
import s from './CreateTask.module.scss';

const CreateTask: FC<ICreateTaskFormProps> = ({ onClose, columnId }: ICreateTaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    //запросить users для выпадающего меню
  }, []);
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    const boardId = localStorage.getItem('selectBoard');
    //обработка данных формы
    //addTask(boardId, data.title, data.description, data.userId, columnId)
    // if(data.file) {
    //   addFile(data.file)
    // }
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
          <label htmlFor="description" className={s.formLabel}>
            <p className={s.formTitle}>Description</p>
            <input
              type="text"
              placeholder="Enter your description"
              className={s.formInput}
              {...register('description', {
                required: 'Enter your description',
              })}
              title="description"
            />
            {errors.description && <span className={s.error}>{errors.description.message}</span>}
          </label>
          <label htmlFor="userId">
            <p className={s.formTitle}>User:</p>
            <select
              {...register('userId', {
                required: 'select user',
              })}
            >
              {/* {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))} */}
            </select>
            {errors.userId && <span className={s.error}>{errors.userId.message}</span>}
          </label>
          <label htmlFor="file">
            <p className={s.formTitle}>Load your photo</p>
            <input
              className="input-file"
              type="file"
              {...register('file', {
                required: false,
              })}
            />
          </label>
          <button type="submit" className={s.formBtn}>
            create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
