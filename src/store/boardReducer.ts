import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardStateType } from '../interfaces/Interfaces';

export const initialState: BoardStateType = {
  boards: [],
  isLoading: false,
  error: '',
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
    dataFetchingSuccess(state) {
      state.isLoading = false;
      state.error = '';
    },
  },
});

export const { dataFetchingSuccess } = boardsSlice.actions;
export default boardsSlice.reducer;
