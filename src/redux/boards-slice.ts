import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IBoardData,
  TBoardSliceState,
  IFullBoardData,
  TupdateBoardType,
  IAddBoardData,
} from '../interfaces/Interfaces';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants/constants';
import { authUser } from '../api/auth-user';

export const addBoard = createAsyncThunk<IBoardData, IAddBoardData>(
  'board/addBoard',
  async (body: IAddBoardData) => {
    return axios
      .post(
        API_ENDPOINTS.BOARDS,
        { ...body },
        {
          headers: {
            accept: 'application/json',
            Authorization: authUser(),
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
        Authorization: authUser(),
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
          Authorization: authUser(),
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
          Authorization: authUser(),
        },
      })
      .then(() => {
        return id;
      });
  }
);

export const updateBoard = createAsyncThunk<IBoardData, TupdateBoardType>(
  'board/updateBoard',
  async ({ id, body }: TupdateBoardType) => {
    return axios
      .put(
        `${API_ENDPOINTS.BOARDS}/${id}`,
        { ...body },
        {
          headers: {
            accept: 'application/json',
            Authorization: authUser(),
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
    description: '',
    columns: [],
  },
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoards.pending, (state) => {
      state.error = '';
      state.requestStatus = 'pending';
    });
    builder.addCase(getBoards.fulfilled, (state, action: PayloadAction<IBoardData[]>) => {
      state.requestStatus = 'succeeded';
      state.boards = action.payload;
    });
    builder.addCase(getBoards.rejected, (state) => {
      state.requestStatus = 'failed';
      state.error = 'Board was not founded!';
    });
    builder.addCase(getBoardById.pending, (state) => {
      state.error = '';
      state.requestStatus = 'pending';
    });
    builder.addCase(getBoardById.fulfilled, (state, action: PayloadAction<IFullBoardData>) => {
      state.requestStatus = 'succeeded';
      state.selectBoard = action.payload;
    });
    builder.addCase(getBoardById.rejected, (state) => {
      state.requestStatus = 'failed';
      state.error = 'Board was not founded!';
    });
    builder.addCase(addBoard.pending, (state) => {
      state.error = '';
      state.requestStatus = 'pending';
    });
    builder.addCase(addBoard.fulfilled, (state, action: PayloadAction<IBoardData>) => {
      state.requestStatus = 'succeeded';
      state.boards.push(action.payload);
    });
    builder.addCase(addBoard.rejected, (state) => {
      state.requestStatus = 'failed';
      state.error = 'Board not create!';
    });
    builder.addCase(deleteBoardById.pending, (state) => {
      state.error = '';
      state.requestStatus = 'pending';
    });
    builder.addCase(deleteBoardById.fulfilled, (state, action: PayloadAction<string>) => {
      state.requestStatus = 'succeeded';
      state.boards = state.boards.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteBoardById.rejected, (state) => {
      state.requestStatus = 'failed';
      state.error = 'Board not delete!';
    });
    builder.addCase(updateBoard.pending, (state) => {
      state.error = '';
      state.requestStatus = 'pending';
    });
    builder.addCase(updateBoard.fulfilled, (state, action: PayloadAction<IBoardData>) => {
      state.requestStatus = 'succeeded';
      const updateItem = state.boards.find((item) => item.id == action.payload.id);
      if (updateItem) {
        updateItem.title = action.payload.title;
        updateItem.description = action.payload.description;
      }
    });
    builder.addCase(updateBoard.rejected, (state) => {
      state.requestStatus = 'failed';
      state.error = 'Board not update!';
    });
  },
});

export default boardsSlice.reducer;
