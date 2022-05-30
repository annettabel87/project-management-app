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
import { localStorageActions } from '../utils/localStorageActions';

export const registrationUser = createAsyncThunk<IResponseRegistrationData, IRegistrationData>(
  'authorization/registration',
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
  'authorization/login',
  async (login, { rejectWithValue }) => {
    try {
      const response = await tokenApi.createToken(login);
      if (response) {
        const { token } = response as IResponseLoginData;
        localStorageActions.setToken(token);
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
  isLanguage: true,
};

export const authorisationSlice = createSlice({
  name: 'authorization',
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    updateLanguage: (state, action) => {
      state.isLanguage = action.payload;
    },
    logout: (state) => {
      state.loginRequestStatus = 'idle';
      state.registrationRequestStatus = 'idle';
      state.user = undefined;
      state.token = undefined;
    },
    cancel: (state) => {
      state.errorLogin = '';
      state.errorRegistration = '';
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
      state.errorLogin = undefined;
      state.errorRegistration = undefined;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loginRequestStatus = 'failed';
      state.errorLogin = 'Error! Failed to login! Try again!';
      state.errorRegistration = undefined;
    });
    builder.addCase(registrationUser.pending, (state) => {
      state.registrationRequestStatus = 'pending';
    });
    builder.addCase(registrationUser.fulfilled, (state, action) => {
      state.registrationRequestStatus = 'succeeded';
      state.user = action.payload;
      state.errorLogin = undefined;
      state.errorRegistration = undefined;
    });
    builder.addCase(registrationUser.rejected, (state) => {
      state.registrationRequestStatus = 'failed';
      state.errorLogin = undefined;
      state.errorRegistration = 'Error! User not registration! Try again!';
    });
  },
});

export const { logout, cancel, setToken, updateLanguage } = authorisationSlice.actions;
export default authorisationSlice.reducer;
