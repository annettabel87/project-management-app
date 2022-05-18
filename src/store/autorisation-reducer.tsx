import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  AuthorisationStateType,
  LoginData,
  RegistrationData,
  RegistrationStateType,
  ResponseLoginData,
  ResponseRegistrationData,
} from '../interfaces/Interfaces';
import usersApi from '../api/token-actions/api';
import errorMessage from '../shared/error-nessage/error-message';
import tokenApi from '../api/token-actions/token-api';

/*export const registrationUser = createAsyncThunk<ResponseRegistrationData, RegistrationData>(
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

export const loginUser = createAsyncThunk<ResponseLoginData, LoginData>(
  'login/fetch',
  async (login, { rejectWithValue }) => {
    try {
      const response = await tokenApi.createToken(login);
      if (response) {
        return response;
      }
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const initialState: AuthorisationStateType = {
  id: '',
  name: '',
  login: '',
  password: '',
  isLoading: false,
  error: '',
  isRegistration: false,
  requestStatus: 'idle',
  token: '',
};

export const authorisationSlice = createSlice({
  name: 'authorisation',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.requestStatus = 'pending';
      state.isLoading = true;
      state.logIn = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.requestStatus = 'succeeded';
      state.isLoading = false;
      state.logIn = true;
      state.token = action.payload.token;
      state.authStatus = state.logIn ? AuthStatusEnum.authorized : AuthStatusEnum.notAuthorized;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.requestStatus = 'failed';
      state.isLoading = false;
      state.error = 'error';
    });
  },
});*/
