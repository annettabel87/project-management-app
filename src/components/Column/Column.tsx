import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/ReduxHooks';
import { IColumnProps } from '../../interfaces/Interfaces';
import { deleteColumn, updateColumn } from '../../redux/columns-slice';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import ConfirmationWindow from '../ConfirmationWindow/ConfirmationWindow';
import CreateTask from '../CreateTask/CreateTask';
import Modal from '../Modal/Modal';
import Task from '../Task/Task';
import s from './Column.module.scss';

const Column: FC<IColumnProps> = ({ column, index }: IColumnProps) => {
  const dispatch = useAppDispatch();

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const [openTitle, setOpenTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(column.title);

  const onClose = () => {
    setIsOpenCreate(false);
    setIsOpenConfirm(false);
  };
  const deleteHandler = () => {
    const boardId = localStorage.getItem('selectBoard');
    if (boardId) {
      dispatch(deleteColumn({ boardId: boardId, columnId: column.id }));
      setIsOpenConfirm(!isOpenConfirm);
    }
  };
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const boardId = localStorage.getItem('selectBoard');

    if (boardId) {
      dispatch(
        updateColumn({
          columnData: {
            title: title,
            order: column.order,
          },
          boardId: boardId,
          columnId: column.id,
        })
      );
    }
    setOpenTitle(false);
  };

  const cancelHandler = () => {
    setTitle(column.title);
    setOpenTitle(false);
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className={`${s.column} ${snapshot.isDragging ? s.isDragging : s.noDragging} `}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
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
            <form onSubmit={onSubmit}>
              <div className={s.btnWrapper}>
                <button type="submit" className={s.formBtn}>
                  Submit
                </button>
                <button type="button" className={s.formBtn} onClick={cancelHandler}>
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
              {openTitle ? title : column.title}
            </p>
          )}
          <Droppable droppableId={column.id} type="task">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div
                className={`${s.taskWrapper} ${
                  snapshot.isDraggingOver ? s.draggingOver : s.noDraggingOver
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {column.tasks?.map((task) => (
                  <Task task={task} columnId={column.id} key={task.id} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

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
            <ConfirmationWindow onClose={onClose} handleOK={deleteHandler} />
          </Modal>
          <Modal onClose={onClose} open={isOpenCreate}>
            <CreateTask onClose={onClose} columnId={column.id} />
          </Modal>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
