import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { ITaskProps } from '../../interfaces/Interfaces';
import { removeTask, updateTask } from '../../redux/columns-slice';
import ConfirmationWindow from '../ConfirmationWindow/ConfirmationWindow';
import Modal from '../Modal/Modal';
import s from './Task.module.scss';

const Task: FC<ITaskProps> = ({ task, columnId }: ITaskProps) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.usersSlice);

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
    <div className={openTitle ? `${s.task} ${s.active}` : s.task}>
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
          <form onSubmit={onSubmit}>
            <textarea
              name="title"
              className={s.formInput}
              value={formData.title}
              onChange={onChange}
            ></textarea>
            <textarea
              name="description"
              className={s.formInput}
              value={formData.description}
              onChange={onChange}
            ></textarea>

            <select name="userId" className={s.select} value={formData.user} onChange={onChange}>
              {users &&
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </select>

            <button className={s.okBtn}>ok</button>
          </form>
        ) : (
          <>
            <p className={s.title}>{task.title}</p>
            <p className={s.text}>{task.description}</p>
            <p className={s.textUser}>{userName && userName.name}</p>
            {!!task.files.length && <button>file</button>}
            <button className={s.editBtn} onClickCapture={() => setOpenTitle(true)}></button>
          </>
        )}
      </div>

      <Modal onClose={onClose} open={isOpen}>
        <ConfirmationWindow onClose={onClose} handleOK={deleteHandler} />
      </Modal>
    </div>
  );
};

export default Task;
