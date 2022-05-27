import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TResponseUserData, TUpdateUser } from '../interfaces/Interfaces';
import { usersApi } from '../api/token-actions/api';
import saveLogin from '../shared/login-save/login-save';

export const getUser = createAsyncThunk<TResponseUserData[]>('getUsers/fetch', async () => {
  return await usersApi.getUser().then((data) => {
    return data.data;
  });
});

export const updateUser = createAsyncThunk<TResponseUserData, TUpdateUser>(
  'updateUser/fetch',
  async ({ userId, user }: TUpdateUser) => {
    return await usersApi.updateUser(userId, user).then((data) => {
      return data;
    });
  }
);

export const deleteUser = createAsyncThunk<string, string>(
  'deleteUser/fetch',
  async (userId: string) => {
    return await usersApi.deleteUser(userId).then(() => {
      return userId;
    });
  }
);

export const initialState: {
  user?: TResponseUserData;
  getUserRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  updateUserRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  deleteUserRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  error?: string;
} = {
  user: {
    id: '',
    name: '',
    login: '',
  },
  getUserRequestStatus: 'idle',
  updateUserRequestStatus: 'idle',
  deleteUserRequestStatus: 'idle',
  error: '',
};

export const usersSlice = createSlice({
  name: 'authorisation',
  initialState: initialState,
  reducers: {
    cancel: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.getUserRequestStatus = 'pending';
    });
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<TResponseUserData[]>) => {
      state.getUserRequestStatus = 'succeeded';
      state.user = action.payload.find(
        (user) => user.login === saveLogin.getUserLogin()
      ) as TResponseUserData;
      state.error = undefined;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.getUserRequestStatus = 'failed';
      state.error = 'Error! In page loading! Try again!';
    });

    builder.addCase(updateUser.pending, (state) => {
      state.updateUserRequestStatus = 'pending';
    });
    builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<TResponseUserData>) => {
      state.updateUserRequestStatus = 'succeeded';
      state.user = action.payload;
      state.error = undefined;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.updateUserRequestStatus = 'failed';
      state.error = 'Error! In page loading! Try again!';
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.deleteUserRequestStatus = 'pending';
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.deleteUserRequestStatus = 'succeeded';
      state.user = undefined;
      state.error = undefined;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.deleteUserRequestStatus = 'failed';
      state.error = 'Error! In page loading! Try again!';
    });
  },
});

export const { cancel } = usersSlice.actions;
export default usersSlice.reducer;
