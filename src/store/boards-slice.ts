import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BoardData,
  BoardStateType,
  FullBoardData,
  updateBoardType,
} from '../interfaces/Interfaces';
import axios from 'axios';
import { api_endpoints } from '../constants/constants';

export const addBoard = createAsyncThunk<BoardData, string>(
  'board/addBoard',
  async (title: string) => {
    return axios
      .post(
        api_endpoints.BOARDS,
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

export const getBoards = createAsyncThunk<BoardData[]>('board/getBoards', async () => {
  return axios
    .get(api_endpoints.BOARDS, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjFlMGZhZC00MTU3LTQ0OTMtODkyNi0yMjhhZTI4ZjVkMGYiLCJsb2dpbiI6ImFubmEiLCJpYXQiOjE2NTI3MTc2ODl9.F-KeNIddUj3_W3dQNkpp3WGrjt__1K4rikivt0wMhLA`,
      },
    })
    .then((data) => {
      return [...data.data];
    });
});

export const getBoardById = createAsyncThunk<FullBoardData, string>(
  'board/getBoardById',
  async (id: string) => {
    return axios
      .get(`${api_endpoints.BOARDS}/${id}`, {
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
      .delete(`${api_endpoints.BOARDS}/${id}`, {
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

export const updateBoard = createAsyncThunk<BoardData, updateBoardType>(
  'board/updateBoard',
  async ({ id, title }: updateBoardType) => {
    return axios
      .put(
        `${api_endpoints.BOARDS}/${id}`,
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

export const initialState: BoardStateType = {
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
    builder.addCase(getBoards.fulfilled, (state, action: PayloadAction<BoardData[]>) => {
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
    builder.addCase(getBoardById.fulfilled, (state, action: PayloadAction<FullBoardData>) => {
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
    builder.addCase(addBoard.fulfilled, (state, action: PayloadAction<BoardData>) => {
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
    builder.addCase(updateBoard.fulfilled, (state, action: PayloadAction<BoardData>) => {
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
