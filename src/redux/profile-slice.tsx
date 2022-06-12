import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TProfileSliceState, TResponseUserData, TUpdateUser } from '../interfaces/Interfaces';
import { usersApi } from '../api/token-actions/api';
import errorMessage from '../shared/error-nessage/error-message';
import { authUser } from '../api/auth-user';
import axios from 'axios';

export const getUsers = createAsyncThunk<TResponseUserData[]>(
  'profile/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await usersApi.getUsers();
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const getUser = createAsyncThunk<TResponseUserData, string>(
  'profile/getUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await usersApi.getUser(userId);
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const updateUser = createAsyncThunk<TResponseUserData, TUpdateUser>(
  'profile/updateUser',
  async ({ userId, user }: TUpdateUser, { rejectWithValue }) => {
    try {
      return await usersApi.updateUser(userId, user);
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const deleteUser = createAsyncThunk<{ [key: string]: string }, string>(
  'profile/deleteUser',
  async (body: string) => {
    return axios
      .delete(`https://kanban71.herokuapp.com/users/${body}`, {
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

export const initialState: TProfileSliceState = {
  reloadProfileStatus: true,
  getUsersStatus: 'idle',
  users: [],
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    cancel: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.getUsersStatus = 'pending';
      state.error = '';
    });
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<TResponseUserData[]>) => {
      state.getUsersStatus = 'succeeded';
      state.users = action.payload;
      state.error = undefined;
      state.reloadProfileStatus = false;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.getUsersStatus = 'failed';
      state.error = 'Error! In page loading! Try again!';
    });

    builder.addCase(getUser.pending, (state) => {
      state.error = '';
    });
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<TResponseUserData>) => {
      state.currentUser = {
        ...state.currentUser,
        name: action.payload.name,
        login: action.payload.login,
        id: action.payload.id,
      };
      state.error = undefined;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.error = 'Error! In page loading! Try again!';
    });

    builder.addCase(updateUser.pending, (state) => {
      state.error = '';
    });
    builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<TResponseUserData>) => {
      state.reloadProfileStatus = true;
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.error = undefined;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.error = 'Error! In page loading! Try again!';
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.error = '';
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.currentUser = undefined;
      state.error = undefined;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.error = 'Error! In page loading! Try again!';
    });
  },
});

export const { cancel, setUser } = profileSlice.actions;
export default profileSlice.reducer;
