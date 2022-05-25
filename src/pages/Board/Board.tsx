import { FC, useEffect } from 'react';
import ColumnsField from '../../components/ColumnsField/ColumnsField';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { getBoardById } from '../../redux/boards-slice';
import { useNavigate } from 'react-router-dom';
import { ROUTERS } from '../../constants/constants';
import s from './Board.module.scss';

const Board: FC = () => {
  const { selectBoard } = useAppSelector((state) => state.boardsSlice);
  let requestStatus;
  const { title, description, columns } = selectBoard;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toMain = () => {
    navigate(ROUTERS.MAIN);
  };
  useEffect(() => {
    const id = localStorage.getItem('selectBoard');
    if (id) {
      dispatch(getBoardById(id));
    }
  }, []);
  return (
    <section className={s.boardPage}>
      <div className={s.container}>
        <button className={s.homeBtn} onClick={toMain}></button>
        <p className={s.boardTitle}>{title}</p>
        <p className={s.text}>{description}</p>
        {requestStatus === 'pending' ? (
          <div>Loading</div>
        ) : columns.length ? (
          <ColumnsField columns={columns} />
        ) : (
          <p>This board have no columns</p>
        )}
      </div>
    </section>
  );
};

export default Board;
