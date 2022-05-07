import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api_endpoints } from '../constants/constants';
import { boardsSlice } from './boardReducer';

export const addBoard = createAsyncThunk('board/fetch', async (title: string, { dispatch }) => {
  //   dispatch(boardsSlice.actions.dataFetching());
  //   axios({
  //     method: 'post',
  //     url: api_endpoints.BOARDS,
  //     data: {
  //       title,
  //     },
  //   }).catch(() => dispatch(boardsSlice.actions.dataFetchingError('Failed to create')));
});
