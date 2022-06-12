import { FC, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../hooks/ReduxHooks';
import { ColumnFieldPropsType } from '../../interfaces/Interfaces';
import { addTask, removeTask, updateColumn, updateTask } from '../../redux/columns-slice';
import Column from '../Column/Column';
import CreateColumn from '../CreateColumn/CreateColumn';
import Modal from '../Modal/Modal';
import imageAdd from '../../assets/image/svg/add.svg';

import s from './ColumnsField.module.scss';

const ColumnsField: FC<ColumnFieldPropsType> = ({ columns, boardId }: ColumnFieldPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const onClose = () => {
    setIsOpen(false);
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    if (type === 'column') {
      const items = [...columns];
      const draggableItem = items.find((item) => item.id == draggableId);
      const reorderedItem = items.splice(source.index, 1);
      items.splice(destination.index, 0, ...reorderedItem);
      if (draggableItem) {
        dispatch(
          updateColumn({
            columnData: {
              title: draggableItem.title,
              order: destination.index,
            },
            boardId: boardId,
            columnId: draggableId,
          })
        );
      }
    }

    if (type === 'task') {
      const startColumn = columns.find((column) => column.id === source.droppableId);
      const endColumn = columns.find((column) => column.id === destination.droppableId);
      if (JSON.stringify(startColumn) === JSON.stringify(endColumn)) {
        if (startColumn) {
          const items = [...startColumn.tasks];
          const draggableItem = items.find((item) => item.id == draggableId);
          const reorderedItem = items.splice(source.index, 1);
          items.splice(destination.index, 0, ...reorderedItem);
          if (draggableItem) {
            dispatch(
              updateTask({
                taskData: {
                  userId: draggableItem.userId,
                  title: draggableItem.title,
                  description: draggableItem.description,
                  boardId: boardId,
                  columnId: startColumn.id,
                  order: destination.index,
                },
                boardId: boardId,
                columnId: startColumn.id,
                taskId: draggableItem.id,
              })
            );
          }
        }
      } else {
        if (startColumn && endColumn) {
          const itemsStart = [...startColumn.tasks];
          const itemsEnd = [...endColumn.tasks];
          const draggableItem = itemsStart.find((item) => item.id == draggableId);
          const reorderedItem = itemsStart.splice(source.index, 1);
          itemsStart.splice(destination.index);
          itemsEnd.push(...reorderedItem);
          if (draggableItem) {
            dispatch(
              addTask({
                boardId: boardId,
                columnId: endColumn.id,
                taskData: {
                  userId: draggableItem.userId,
                  title: draggableItem.title,
                  description: draggableItem.description,
                },
              })
            );
            dispatch(
              removeTask({ boardId: boardId, columnId: startColumn.id, taskId: draggableItem.id })
            );
          }
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section>
        <Droppable droppableId={boardId} type="column" direction="horizontal">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <>
              <button
                style={{ marginLeft: '15px' }}
                className={s.mainBtn}
                onClick={() => setIsOpen(true)}
              >
                <img src={imageAdd} alt={'add board'} className={s.iconAdd} />
                {t('create_column')}
              </button>
              <div
                className={`${s.columnsWrapper} ${
                  snapshot.isDraggingOver ? s.draggingOver : s.noDraggingOver
                }`}
                {...provided.droppableProps}
                id={boardId}
                ref={provided.innerRef}
              >
                {columns &&
                  columns.map((column) => (
                    <Column key={column.id} column={column} index={column.order} />
                  ))}

                {provided.placeholder}
              </div>
            </>
          )}
        </Droppable>

        <Modal onClose={onClose} open={isOpen}>
          <CreateColumn onClose={onClose} />
        </Modal>
      </section>
    </DragDropContext>
  );
};

export default ColumnsField;
