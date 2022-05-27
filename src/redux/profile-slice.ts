import { TProfileSliceState, TUsersResponse } from './../interfaces/Interfaces';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants/constants';
import { authUser } from '../api/auth-user';

export const getUsers = createAsyncThunk<TUsersResponse>('profile/getUsers', async () => {
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

export const initialState: TProfileSliceState = {
  reloadProfileStatus: true,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.error = '';
    });
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<TUsersResponse>) => {
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.error = '';
    });
  },
});

export default profileSlice.reducer;
