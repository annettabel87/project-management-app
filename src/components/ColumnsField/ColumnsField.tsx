import { FC, useState } from 'react';
import { IColumnData } from '../../interfaces/Interfaces';
import Column from '../Column/Column';
import CreateColumn from '../CreateColumn/CreateColumn';
import Modal from '../Modal/Modal';
import s from './ColumnsField.module.scss';

export type ColumnFieldPropsType = {
  columns: IColumnData[];
};
const ColumnsField: FC<ColumnFieldPropsType> = ({ columns }: ColumnFieldPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <section>
      <div className={s.columnsWrapper}>
        {columns && columns.map((column) => <Column key={column.id} {...column} />)}
        <button className={s.createBtn} onClick={() => setIsOpen(true)}>
          + Create column
        </button>
      </div>
      <Modal onClose={onClose} open={isOpen}>
        <CreateColumn onClose={onClose} />
      </Modal>
    </section>
  );
};

export default ColumnsField;
