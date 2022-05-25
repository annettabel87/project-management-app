import React, { FC, useState } from 'react';
import { IColumnData } from '../../interfaces/Interfaces';
import ConfirmationWindow from '../ConfirmationWindow/ConfirmationWindow';
import CreateTask from '../CreateTask/CreateTask';
import Modal from '../Modal/Modal';
import Task from '../Task/Task';
import s from './Column.module.scss';

const Column: FC<IColumnData> = (column: IColumnData) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const [openTitle, setOpenTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(column.title);
  const onClose = () => {
    setIsOpenCreate(false);
    setIsOpenConfirm(false);
  };
  const deleteColumn = () => {};
  const changeTitle = () => {
    const boardId = localStorage.getItem('selectBoard');
    //updateColumn(title, boardId, column.id)
    setOpenTitle(true);
  };
  return (
    <div className={s.column}>
      <button
        className={s.columnBtn}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpenConfirm(true);
        }}
      >
        X
      </button>
      {openTitle ? (
        <form>
          <div className={s.btnWrapper}>
            <button className={s.formBtn} onClick={changeTitle}>
              Submit
            </button>
            <button className={s.formBtn} onClick={() => setOpenTitle(true)}>
              Cancel
            </button>
          </div>

          <input
            type="text"
            className={s.formInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </form>
      ) : (
        <p className={s.title} onClick={() => setOpenTitle(true)}>
          {title}
        </p>
      )}
      <div className={s.taskWrapper}>
        {column.tasks.map((task) => (
          <Task task={task} columnId={column.id} key={task.id} />
        ))}
      </div>

      <button
        className={s.taskCreateBtn}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpenCreate(true);
        }}
      >
        + Add another task
      </button>
      <Modal onClose={onClose} open={isOpenConfirm}>
        <ConfirmationWindow onClose={onClose} handleOK={deleteColumn} />
      </Modal>
      <Modal onClose={onClose} open={isOpenCreate}>
        <CreateTask onClose={onClose} columnId={column.id} />
      </Modal>
    </div>
  );
};

export default Column;
