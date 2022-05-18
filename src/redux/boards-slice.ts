import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IBoardData,
  TBoardSliceState,
  IFullBoardData,
  TupdateBoardType,
} from '../interfaces/Interfaces';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants/constants';

export const addBoard = createAsyncThunk<IBoardData, string>(
  'board/addBoard',
  async (title: string) => {
    return axios
      .post(
        API_ENDPOINTS.BOARDS,
        { title },
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjFlMGZhZC00MTU3LTQ0OTMtODkyNi0yMjhhZTI4ZjVkMGYiLCJsb2dpbiI6ImFubmEiLCJpYXQiOjE2NTI3MTc2ODl9.F-KeNIddUj3_W3dQNkpp3WGrjt__1K4rikivt0wMhLA`,
          },
        }
      )
      .then((data) => {
        return data.data;
      });
  }
);

export const getBoards = createAsyncThunk<IBoardData[]>('board/getBoards', async () => {
  return axios
    .get(API_ENDPOINTS.BOARDS, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjFlMGZhZC00MTU3LTQ0OTMtODkyNi0yMjhhZTI4ZjVkMGYiLCJsb2dpbiI6ImFubmEiLCJpYXQiOjE2NTI3MTc2ODl9.F-KeNIddUj3_W3dQNkpp3WGrjt__1K4rikivt0wMhLA`,
      },
    })
    .then((data) => {
      return [...data.data];
    });
});

export const getBoardById = createAsyncThunk<IFullBoardData, string>(
  'board/getBoardById',
  async (id: string) => {
    return axios
      .get(`${API_ENDPOINTS.BOARDS}/${id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjFlMGZhZC00MTU3LTQ0OTMtODkyNi0yMjhhZTI4ZjVkMGYiLCJsb2dpbiI6ImFubmEiLCJpYXQiOjE2NTI3MTc2ODl9.F-KeNIddUj3_W3dQNkpp3WGrjt__1K4rikivt0wMhLA`,
        },
      })
      .then((data) => {
        return data.data;
      });
  }
);

export const deleteBoardById = createAsyncThunk<string, string>(
  'board/deleteBoardById',
  async (id: string) => {
    return axios
      .delete(`${API_ENDPOINTS.BOARDS}/${id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjFlMGZhZC00MTU3LTQ0OTMtODkyNi0yMjhhZTI4ZjVkMGYiLCJsb2dpbiI6ImFubmEiLCJpYXQiOjE2NTI3MTc2ODl9.F-KeNIddUj3_W3dQNkpp3WGrjt__1K4rikivt0wMhLA`,
        },
      })
      .then(() => {
        return id;
      });
  }
);

export const updateBoard = createAsyncThunk<IBoardData, TupdateBoardType>(
  'board/updateBoard',
  async ({ id, title }: TupdateBoardType) => {
    return axios
      .put(
        `${API_ENDPOINTS.BOARDS}/${id}`,
        { title },
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjFlMGZhZC00MTU3LTQ0OTMtODkyNi0yMjhhZTI4ZjVkMGYiLCJsb2dpbiI6ImFubmEiLCJpYXQiOjE2NTI3MTc2ODl9.F-KeNIddUj3_W3dQNkpp3WGrjt__1K4rikivt0wMhLA`,
          },
        }
      )
      .then((data) => {
        return data.data;
      });
  }
);

export const initialState: TBoardSliceState = {
  boards: [],
  requestStatus: '',
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoards.pending, (state) => {
      state.requestStatus = 'pending';
    });
    builder.addCase(getBoards.fulfilled, (state, action: PayloadAction<IBoardData[]>) => {
      state.error = '';
      state.requestStatus = 'succeeded';
      state.boards = action.payload;
    });
    builder.addCase(getBoards.rejected, (state) => {
      state.requestStatus = 'failed';
      state.error = 'Board was not founded!';
    });
    builder.addCase(getBoardById.pending, (state) => {
      state.requestStatus = 'pending';
    });
    builder.addCase(getBoardById.fulfilled, (state, action: PayloadAction<IFullBoardData>) => {
      state.error = '';
      state.requestStatus = 'succeeded';
      state.selectBoard = action.payload;
    });
    builder.addCase(getBoardById.rejected, (state) => {
      state.requestStatus = 'failed';
      state.error = 'Board was not founded!';
    });
    builder.addCase(addBoard.pending, (state) => {
      state.requestStatus = 'pending';
    });
    builder.addCase(addBoard.fulfilled, (state, action: PayloadAction<IBoardData>) => {
      state.error = '';
      state.requestStatus = 'succeeded';
      state.boards.push(action.payload);
    });
    builder.addCase(addBoard.rejected, (state) => {
      state.requestStatus = 'failed';
      state.error = 'Board not create!';
    });
    builder.addCase(deleteBoardById.pending, (state) => {
      state.requestStatus = 'pending';
    });
    builder.addCase(deleteBoardById.fulfilled, (state, action: PayloadAction<string>) => {
      state.error = '';
      state.requestStatus = 'succeeded';
      state.boards = state.boards.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteBoardById.rejected, (state) => {
      state.requestStatus = 'failed';
      state.error = 'Board not delete!';
    });
    builder.addCase(updateBoard.pending, (state) => {
      state.requestStatus = 'pending';
    });
    builder.addCase(updateBoard.fulfilled, (state, action: PayloadAction<IBoardData>) => {
      state.error = '';
      state.requestStatus = 'succeeded';
      const updateItem = state.boards.find((item) => item.id == action.payload.id);
      if (updateItem) {
        updateItem.title = action.payload.title;
      }
    });
    builder.addCase(updateBoard.rejected, (state) => {
      state.requestStatus = 'failed';
      state.error = 'Board not update!';
    });
  },
});

export default boardsSlice.reducer;
