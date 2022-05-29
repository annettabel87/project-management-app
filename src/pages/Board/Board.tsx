import { FC, useEffect } from 'react';
import ColumnsField from '../../components/ColumnsField/ColumnsField';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { getBoardById } from '../../redux/boards-slice';
import { useNavigate } from 'react-router-dom';
import { ROUTERS } from '../../constants/constants';
import s from './Board.module.scss';

const Board: FC = () => {
  const { selectBoard, reloadStatus } = useAppSelector((state) => state.boardsSlice);

  const { reloadColumnsStatus } = useAppSelector((state) => state.columnsSlice);
  const { id, title, description, columns } = selectBoard;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toMain = () => {
    navigate(ROUTERS.MAIN);
  };
  useEffect(() => {
    const id = localStorage.getItem('selectBoard');

    if (id && reloadColumnsStatus) {
      dispatch(getBoardById(id));
    }
  }, [dispatch, reloadColumnsStatus]);

  return (
    <section className={s.boardPage}>
      <div className={s.container}>
        <button className={s.homeBtn} onClick={toMain}></button>
        <p className={s.boardTitle}>{title}</p>
        <p className={s.text}>{description}</p>
        {reloadStatus ? <div>Loading</div> : <ColumnsField columns={columns} boardId={id} />}
      </div>
    </section>
  );
};

export default Board;
