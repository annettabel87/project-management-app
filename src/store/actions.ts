import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api_endpoints } from '../constants/constants';
import { updateBoardType } from '../interfaces/Interfaces';
import {
  boardsSlice,
  dataFetchingAddItem,
  dataFetching,
  dataFetchingAll,
  dataFetchingItem,
  dataFetchingDeleteItem,
  dataFetchingError,
} from './boardReducer';

export const addBoard = createAsyncThunk('board/addBoard', async (title: string, { dispatch }) => {
  dispatch(dataFetching());
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
    .then((data) => dispatch(dataFetchingAddItem(data.data)))
    .catch((error) => dispatch(dataFetchingError(error.message)));
});

export const getBoards = createAsyncThunk('board/getBoards', async (_, { dispatch }) => {
  dispatch(boardsSlice.actions.dataFetching());
  axios
    .get(api_endpoints.BOARDS, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer token`,
      },
    })
    .then((data) => dispatch(dataFetchingAll([...data.data])))
    .catch((error) => dispatch(dataFetchingError(error.message)));
});

export const getBoardById = createAsyncThunk(
  'board/getBoardById',
  async (id: string, { dispatch }) => {
    dispatch(dataFetching());
    axios
      .get(`${api_endpoints.BOARDS}/${id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer token`,
        },
      })
      .then((data) => dispatch(dataFetchingItem(data.data)))
      .catch((error) => dispatch(dataFetchingError(error.message)));
  }
);

export const deleteBoardById = createAsyncThunk(
  'board/deleteBoardById',
  async (id: string, { dispatch }) => {
    dispatch(dataFetching());
    axios
      .delete(`${api_endpoints.BOARDS}/${id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer token`,
        },
      })
      .then(() => dispatch(dataFetchingDeleteItem(id)))
      .catch((error) => dispatch(dataFetchingError(error.message)));
  }
);

export const updateBoard = createAsyncThunk(
  'board/updateBoard',
  async ({ id, title }: updateBoardType, { dispatch }) => {
    dispatch(boardsSlice.actions.dataFetching());
    axios
      .put(
        `${api_endpoints.BOARDS}/${id}`,
        { title },
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer token`,
          },
        }
      )
      .catch((error) => dispatch(dataFetchingError(error.message)));
  }
);
