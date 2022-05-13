import React, { FC } from 'react';
import { BoardData } from '../../../interfaces/Interfaces';
import { BoardPreview } from '../BoardPreview/BoardPreview';
import './BoardsField';

export type BoardsFieldPropsType = {
  boards: BoardData[];
};
export const BoardsField: FC<BoardsFieldPropsType> = ({ boards }: BoardsFieldPropsType) => {
  const boardsCard = boards.map((board) => <BoardPreview key={board.id} {...board} />);
  return (
    <section>
      <div className="cards-wrapper">{boardsCard}</div>
    </section>
  );
};
