import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IBoardData,
  TBoardsSliceState,
  IFullBoardData,
  TupdateBoardType,
  IAddBoardData,
  TCreateColumnRequest,
  TDeleteColumnRequest,
  TUsersResponse,
  TAddTaskRequest,
  TTaskResponse,
  TDeleteTaskRequest,
  TUpdateTaskRequest,
  TUpdateColumnRequest,
} from '../interfaces/Interfaces';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants/constants';
import { authUser } from '../api/auth-user';

export const addBoard = createAsyncThunk<IBoardData, IAddBoardData>(
  'boards/addBoard',
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

export const getBoards = createAsyncThunk<IBoardData[]>('boards/getBoards', async () => {
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
  'boards/getBoardById',
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
  'boards/deleteBoardById',
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
  'boards/updateBoard',
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

export const createColumn = createAsyncThunk<IBoardData, TCreateColumnRequest>(
  'boards/createColumn',
  async (body: TCreateColumnRequest) => {
    return axios
      .post(
        `${API_ENDPOINTS.BOARDS}/${body.boardId}/columns`,
        { ...body.columnData },
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

export const deleteColumn = createAsyncThunk<{ [key: string]: string }, TDeleteColumnRequest>(
  'boards/deleteColumn',
  async (body: TDeleteColumnRequest) => {
    return axios
      .delete(`${API_ENDPOINTS.BOARDS}/${body.boardId}/columns/${body.columnId}`, {
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

export const updateColumn = createAsyncThunk<TTaskResponse, TUpdateColumnRequest>(
  'boards/updateColumn',
  async (body: TUpdateColumnRequest) => {
    return axios
      .put(
        `${API_ENDPOINTS.BOARDS}/${body.boardId}/columns/${body.columnId}`,
        { ...body.columnData },
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

export const getUsers = createAsyncThunk<TUsersResponse>('boards/getUsers', async () => {
  return axios
    .get(API_ENDPOINTS.USERS, {
      headers: {
        accept: 'application/json',
        Authorization: authUser(),
      },
    })
    .then((data) => {
      return [...data.data];
    });
});

export const addTask = createAsyncThunk<TTaskResponse, TAddTaskRequest>(
  'boards/addTask',
  async (body: TAddTaskRequest) => {
    return axios
      .post(
        `${API_ENDPOINTS.BOARDS}/${body.boardId}/columns/${body.columnId}/tasks`,
        { ...body.taskData },
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

export const removeTask = createAsyncThunk<{ [key: string]: string }, TDeleteTaskRequest>(
  'boards/removeTask',
  async (body: TDeleteTaskRequest) => {
    return axios
      .delete(
        `${API_ENDPOINTS.BOARDS}/${body.boardId}/columns/${body.columnId}/tasks/${body.taskId}`,
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

export const updateTask = createAsyncThunk<TTaskResponse, TUpdateTaskRequest>(
  'boards/updateTask',
  async (body: TUpdateTaskRequest) => {
    return axios
      .put(
        `${API_ENDPOINTS.BOARDS}/${body.boardId}/columns/${body.columnId}/tasks/${body.taskId}`,
        { ...body.taskData },
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

export const initialState: TBoardsSliceState = {
  reloadStatus: true,
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
      state.reloadStatus = false;
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
      state.reloadStatus = false;
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
    builder.addCase(createColumn.pending, (state) => {
      state.error = '';
    });
    builder.addCase(createColumn.fulfilled, (state) => {
      state.reloadStatus = true;
    });
    builder.addCase(createColumn.rejected, (state) => {
      state.error = '';
    });
    builder.addCase(deleteColumn.pending, (state) => {
      state.error = '';
    });
    builder.addCase(deleteColumn.fulfilled, (state) => {
      state.reloadStatus = true;
    });
    builder.addCase(deleteColumn.rejected, (state) => {
      state.error = '';
    });
    builder.addCase(getUsers.pending, (state) => {
      state.error = '';
    });
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<TUsersResponse>) => {
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.error = '';
    });
    builder.addCase(addTask.pending, (state) => {
      state.error = '';
    });
    builder.addCase(addTask.fulfilled, (state) => {
      state.reloadStatus = true;
    });
    builder.addCase(addTask.rejected, (state) => {
      state.error = '';
    });
    builder.addCase(removeTask.pending, (state) => {
      state.error = '';
    });
    builder.addCase(removeTask.fulfilled, (state) => {
      state.reloadStatus = true;
    });
    builder.addCase(removeTask.rejected, (state) => {
      state.error = '';
    });
    builder.addCase(updateTask.pending, (state) => {
      state.error = '';
    });
    builder.addCase(updateTask.fulfilled, (state) => {
      state.reloadStatus = true;
    });
    builder.addCase(updateTask.rejected, (state) => {
      state.error = '';
    });
    builder.addCase(updateColumn.pending, (state) => {
      state.error = '';
    });
    builder.addCase(updateColumn.fulfilled, (state) => {
      state.reloadStatus = true;
    });
    builder.addCase(updateColumn.rejected, (state) => {
      state.error = '';
    });
  },
});

export default boardsSlice.reducer;
