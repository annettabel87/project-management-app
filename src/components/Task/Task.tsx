import React, { FC, useEffect, useState } from 'react';
import { ITaskData, ITaskProps } from '../../interfaces/Interfaces';
import ConfirmationWindow from '../ConfirmationWindow/ConfirmationWindow';
import Modal from '../Modal/Modal';
import s from './Task.module.scss';

const Task: FC<ITaskProps> = ({ task, columnId }: ITaskProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const [user, setUser] = useState<string>('');
  const [openTitle, setOpenTitle] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    //запросить имя юзеров по task.id и вывести
  });
  const deleteTask = () => {};
  const changeTitle = () => {
    const boardId = localStorage.getItem('selectBoard');
    //updateTask(title, boardId, columnId, description)
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
          <form>
            <textarea
              className={s.formInput}
              value={title}
              onChange={(e) => {
                e.stopPropagation();
                setTitle(e.target.value);
              }}
            ></textarea>
            <textarea
              className={s.formInput}
              value={description}
              onChange={(e) => {
                e.stopPropagation();
                setDescription(e.target.value);
              }}
            ></textarea>

            <select
              className={s.select}
              value={user}
              onChange={(e) => {
                e.stopPropagation();
                setUser(e.target.value);
              }}
            >
              {/* {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))} */}
            </select>

            <button className={s.okBtn} onClick={changeTitle}>
              ok
            </button>
          </form>
        ) : (
          <>
            <p className={s.title}>{task.title}</p>
            <p className={s.text}>{task.description}</p>
            <p className={s.textUser}>{task.id}</p>
            {!!task.files.length && <button>file</button>}
            <button className={s.editBtn} onClickCapture={() => setOpenTitle(true)}></button>
          </>
        )}
      </div>

      <Modal onClose={onClose} open={isOpen}>
        <ConfirmationWindow onClose={onClose} handleOK={deleteTask} />
      </Modal>
    </div>
  );
};

export default Task;
