import { FC, useState } from 'react';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../hooks/ReduxHooks';
import { ColumnFieldPropsType } from '../../interfaces/Interfaces';
import { updateColumn } from '../../redux/columns-slice';
import Column from '../Column/Column';
import CreateColumn from '../CreateColumn/CreateColumn';
import Modal from '../Modal/Modal';
import s from './ColumnsField.module.scss';

const ColumnsField: FC<ColumnFieldPropsType> = ({ columns, boardId }: ColumnFieldPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section>
        <Droppable droppableId={boardId} type="column" direction="horizontal">
          {(provided: DroppableProvided) => (
            <div
              className={s.columnsWrapper}
              {...provided.droppableProps}
              id={boardId}
              ref={provided.innerRef}
            >
              {columns &&
                columns.map((column) => (
                  <Column key={column.id} column={column} index={column.order} />
                ))}
              <button className={s.createBtn} onClick={() => setIsOpen(true)}>
                + Create column
              </button>
              {provided.placeholder}
            </div>
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
