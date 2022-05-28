import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TAuthorisationSliceState,
  ILoginData,
  IRegistrationData,
  IResponseLoginData,
  IResponseRegistrationData,
} from '../interfaces/Interfaces';
import { tokenApi, usersApi } from '../api/token-actions/api';
import errorMessage from '../shared/error-nessage/error-message';
import tokenActions from '../api/token-actions/token-actions';

export const registrationUser = createAsyncThunk<IResponseRegistrationData, IRegistrationData>(
  'registration/fetch',
  async (registration, { rejectWithValue }) => {
    try {
      const response = await usersApi.registerUser(registration);
      if (response) {
        return response;
      }
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const loginUser = createAsyncThunk<IResponseLoginData, ILoginData>(
  'login/fetch',
  async (login, { rejectWithValue }) => {
    try {
      const response = await tokenApi.createToken(login);
      if (response) {
        const { token } = response as IResponseLoginData;
        tokenActions.setUserToken(token);
        return response;
      }
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const initialState: TAuthorisationSliceState = {
  loginRequestStatus: 'idle',
  registrationRequestStatus: 'idle',
};

export const authorisationSlice = createSlice({
  name: 'authorization',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.loginRequestStatus = 'idle';
      state.registrationRequestStatus = 'idle';
      state.user = undefined;
      state.token = undefined;
    },
    cancel: (state) => {
      state.error = '';
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loginRequestStatus = 'pending';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginRequestStatus = 'succeeded';
      state.token = action.payload.token;
      state.error = undefined;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loginRequestStatus = 'failed';
      state.error = 'Error! Failed to login! Try again!';
    });
    builder.addCase(registrationUser.pending, (state) => {
      state.registrationRequestStatus = 'pending';
    });
    builder.addCase(registrationUser.fulfilled, (state, action) => {
      state.registrationRequestStatus = 'succeeded';
      state.user = action.payload;
      state.error = undefined;
    });
    builder.addCase(registrationUser.rejected, (state) => {
      state.registrationRequestStatus = 'failed';
      state.error = 'Error! User not registration! Try again!';
    });
  },
});

export const { logout, cancel } = authorisationSlice.actions;
export default authorisationSlice.reducer;
