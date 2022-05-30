import { FC } from 'react';

import BoardPreview from '../BoardPreview/BoardPreview';

import { IBoardData } from '../../interfaces/Interfaces';

import s from './BoardsField.module.scss';

export type BoardsFieldPropsType = {
  boards: IBoardData[];
};
const BoardsField: FC<BoardsFieldPropsType> = ({ boards }: BoardsFieldPropsType) => {
  const boardsCard = boards.map((board) => <BoardPreview key={board.id} {...board} />);
  return (
    <section style={{ marginTop: '65px' }}>
      <div className={s.cardsWrapper}>{boardsCard}</div>
    </section>
  );
};

export default BoardsField;
