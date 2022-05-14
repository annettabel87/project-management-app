import { rootReducer, setupStore } from '../store/store';

export interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}
export interface CreateBoardFormProps {
  isAuth: boolean;
  onClose: () => void;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export type BoardStateType = {
  boards: BoardData[];
  isLoading: boolean;
  error: string;
  selectBoard: FullBoardData;
};
export interface BoardData {
  id: string;
  title: string;
}

export interface FullBoardData {
  id: string;
  title: string;
  columns: ColumnData[];
}

export type updateBoardType = {
  id: string;
  title: string;
};

export interface ColumnData {
  id: string;
  title: string;
  order: number;
  tasks: [];
}
