import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { ITaskProps } from '../../interfaces/Interfaces';
import { removeTask, updateTask } from '../../redux/columns-slice';
import ConfirmationWindow from '../ConfirmationWindow/ConfirmationWindow';
import Modal from '../Modal/Modal';

import s from './Task.module.scss';
import style_form from '../../shared/show-password/show-password.module.scss';

const Task: FC<ITaskProps> = ({ task, columnId }: ITaskProps) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.profileSlice);

  const { t } = useTranslation();

  const userName = users?.filter((user) => {
    if (user.id === task.userId) {
      return true;
    }
  })[0];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    title: task.title,
    description: task.description,
    userId: userName ? userName.login : '',
  });

  const [openTitle, setOpenTitle] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClose = () => {
    setIsOpen(false);
  };
  const deleteHandler = () => {
    const boardId = localStorage.getItem('selectBoard');

    if (boardId) {
      dispatch(removeTask({ boardId: boardId, columnId: columnId, taskId: task.id }));
    }
  };
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const boardId = localStorage.getItem('selectBoard');

    if (boardId) {
      dispatch(
        updateTask({
          taskData: {
            userId: formData.userId,
            title: formData.title,
            description: formData.description,
            boardId: boardId,
            columnId: columnId,
            order: task.order,
          },
          boardId: boardId,
          columnId: columnId,
          taskId: task.id,
        })
      );
    }
    setOpenTitle(false);
  };

  return (
    <Draggable draggableId={task.id} index={task.order}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className={`${openTitle ? `${s.task} ${s.active}` : s.task} ${
            snapshot.isDragging ? s.isDragging : s.noDragging
          }
          `}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <button
            className={s.taskBtn}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            X
          </button>
          <div className={s.titleWrapper}>
            {openTitle ? (
              <form onSubmit={onSubmit} className={s.taskUpdate}>
                <label htmlFor="userId" className={s.formLabel}>
                  <span className={style_form.inputTitle}>{t('title')}</span>
                  <textarea
                    name="title"
                    className={s.formInput}
                    value={formData.title}
                    onChange={onChange}
                  />
                </label>
                <label htmlFor="userId" className={s.formLabel}>
                  <span className={style_form.inputTitle}>{t('description')}</span>
                  <textarea
                    name="description"
                    className={s.formInput}
                    value={formData.description}
                    onChange={onChange}
                  />
                </label>
                <label htmlFor="userId" className={s.formLabel}>
                  <span className={style_form.inputTitle}>{t('user')}</span>
                  <select
                    name="userId"
                    className={s.select}
                    value={formData.user}
                    onChange={onChange}
                  >
                    {users &&
                      users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                  </select>
                </label>

                <button type="submit" className={s.okBtn}>
                  {t('ok')}
                </button>
              </form>
            ) : (
              <div className={s.formLabel}>
                <p className={s.title}>{task.title}</p>
                <p className={s.text}>{task.description}</p>
                <p className={s.textUser}>{userName && userName.name}</p>
                {!!task.files.length && <button>{t('file')}</button>}
                <button className={s.editBtn} onClickCapture={() => setOpenTitle(true)} />
              </div>
            )}
          </div>

          <Modal onClose={onClose} open={isOpen}>
            <ConfirmationWindow onClose={onClose} handleOK={deleteHandler} />
          </Modal>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
