import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TProfileSliceState, TResponseUserData, TUpdateUser } from '../interfaces/Interfaces';
import { usersApi } from '../api/token-actions/api';
import errorMessage from '../shared/error-nessage/error-message';

export const getUsers = createAsyncThunk<TResponseUserData[]>(
  'getUsers/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await usersApi.getUsers();
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const getUser = createAsyncThunk<TResponseUserData, string>(
  'getUser/fetch',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await usersApi.getUser(userId);
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const updateUser = createAsyncThunk<TResponseUserData, TUpdateUser>(
  'updateUser/fetch',
  async ({ userId, user }: TUpdateUser, { rejectWithValue }) => {
    try {
      return await usersApi.updateUser(userId, user);
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
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

export const initialState: TProfileSliceState = {
  reloadProfileStatus: true,
  getUsersStatus: 'idle',
};

export const profileSlice = createSlice({
  name: 'edit-profile-slice',
  initialState: initialState,
  reducers: {
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
      state.user = action.payload;
      state.user = {
        name: action.payload.name,
        login: action.payload.login,
        id: action.payload.id,
      };
      state.error = undefined;
      state.reloadProfileStatus = false;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.error = 'Error! In page loading! Try again!';
    });

    builder.addCase(updateUser.pending, (state) => {
      state.error = '';
    });
    builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<TResponseUserData>) => {
      state.reloadProfileStatus = true;
      state.user = action.payload;
      state.error = undefined;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.error = 'Error! In page loading! Try again!';
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.reloadProfileStatus = false;
      state.error = '';
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.reloadProfileStatus = true;
      state.user = undefined;
      state.error = undefined;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.error = 'Error! In page loading! Try again!';
    });
  },
});

export const { cancel } = profileSlice.actions;
export default profileSlice.reducer;
