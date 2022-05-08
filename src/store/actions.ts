import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api_endpoints } from '../constants/constants';
import { boardsSlice } from './boardReducer';

export const addBoard = createAsyncThunk('board/fetch', async (title: string, { dispatch }) => {
  dispatch(boardsSlice.actions.dataFetching());
  axios
    .post(
      api_endpoints.BOARDS,
      { title },
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer token`,
        },
      }
    )
    .then((data) => console.log(data.data))
    .catch(() => dispatch(boardsSlice.actions.dataFetchingError('Failed to create')));
});
