import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IBoardData,
  TCreateColumnRequest,
  TDeleteColumnRequest,
  TAddTaskRequest,
  TTaskResponse,
  TDeleteTaskRequest,
  TUpdateTaskRequest,
  TUpdateColumnRequest,
  TColumnsSliceState,
  IColumnData,
} from '../interfaces/Interfaces';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants/constants';
import { authUser } from '../api/auth-user';

export const getColumns = createAsyncThunk<IColumnData[], string>(
  'columns/getColumns',
  async (body: string) => {
    return axios
      .get(`${API_ENDPOINTS.BOARDS}/${body}/columns`, {
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

export const createColumn = createAsyncThunk<IBoardData, TCreateColumnRequest>(
  'columns/createColumn',
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
  'columns/deleteColumn',
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
  'columns/updateColumn',
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

export const addTask = createAsyncThunk<TTaskResponse, TAddTaskRequest>(
  'columns/addTask',
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
  'columns/removeTask',
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
  'columns/updateTask',
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

export const initialState: TColumnsSliceState = {
  reloadColumnsStatus: true,
  columns: [],
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColumns.pending, (state) => {
      state.error = '';
    });
    builder.addCase(getColumns.fulfilled, (state, action: PayloadAction<IColumnData[]>) => {
      state.reloadColumnsStatus = false;
      state.columns = action.payload;
    });
    builder.addCase(getColumns.rejected, (state) => {
      state.error = 'Error';
    });
    builder.addCase(createColumn.pending, (state) => {
      state.reloadColumnsStatus = false;
      state.error = '';
    });
    builder.addCase(createColumn.fulfilled, (state) => {
      state.reloadColumnsStatus = true;
    });
    builder.addCase(createColumn.rejected, (state) => {
      state.error = 'Error';
    });
    builder.addCase(updateColumn.pending, (state) => {
      state.reloadColumnsStatus = false;
      state.error = '';
    });
    builder.addCase(updateColumn.fulfilled, (state) => {
      state.reloadColumnsStatus = true;
    });
    builder.addCase(updateColumn.rejected, (state) => {
      state.error = 'Error';
    });
    builder.addCase(deleteColumn.pending, (state) => {
      state.reloadColumnsStatus = false;
      state.error = '';
    });
    builder.addCase(deleteColumn.fulfilled, (state) => {
      state.reloadColumnsStatus = true;
    });
    builder.addCase(deleteColumn.rejected, (state) => {
      state.error = 'Error';
    });
    builder.addCase(addTask.pending, (state) => {
      state.reloadColumnsStatus = false;
      state.error = '';
    });
    builder.addCase(addTask.fulfilled, (state) => {
      state.reloadColumnsStatus = true;
    });
    builder.addCase(addTask.rejected, (state) => {
      state.error = 'Error';
    });
    builder.addCase(updateTask.pending, (state) => {
      state.reloadColumnsStatus = false;
      state.error = '';
    });
    builder.addCase(updateTask.fulfilled, (state) => {
      state.reloadColumnsStatus = true;
    });
    builder.addCase(updateTask.rejected, (state) => {
      state.error = 'Error';
    });
    builder.addCase(removeTask.pending, (state) => {
      state.reloadColumnsStatus = false;
      state.error = '';
    });
    builder.addCase(removeTask.fulfilled, (state) => {
      state.reloadColumnsStatus = true;
    });
    builder.addCase(removeTask.rejected, (state) => {
      state.error = 'Error';
    });
  },
});

export default columnsSlice.reducer;
