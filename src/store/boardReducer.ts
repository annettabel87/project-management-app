import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData, BoardStateType, FullBoardData } from '../interfaces/Interfaces';

export const initialState: BoardStateType = {
  boards: [],
  isLoading: false,
  error: '',
  selectBoard: {
    id: '',
    title: '',
    columns: [],
  },
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    dataFetching(state) {
      state.isLoading = true;
    },
    dataFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    dataFetchingAll(state, action: PayloadAction<BoardData[]>) {
      state.isLoading = false;
      state.error = '';
      state.boards = action.payload;
    },
    dataFetchingItem(state, action: PayloadAction<FullBoardData>) {
      state.isLoading = false;
      state.error = '';
      state.selectBoard = action.payload;
    },
    dataFetchingAddItem(state, action: PayloadAction<BoardData>) {
      state.isLoading = false;
      state.error = '';
      state.boards.push(action.payload);
    },
    dataFetchingDeleteItem(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = '';
      state.boards = state.boards.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  dataFetchingAll,
  dataFetchingItem,
  dataFetchingAddItem,
  dataFetching,
  dataFetchingDeleteItem,
  dataFetchingError,
} = boardsSlice.actions;
export default boardsSlice.reducer;
