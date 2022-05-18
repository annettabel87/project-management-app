import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  RegistrationData,
  RegistrationStateType,
  ResponseRegistrationData,
} from '../interfaces/Interfaces';
import errorMessage from '../shared/error-nessage/error-message';
import usersApi from '../api/token-actions/api';

export const registrationUser = createAsyncThunk<ResponseRegistrationData, RegistrationData>(
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

export const initialState: RegistrationStateType = {
  id: '',
  name: '',
  login: '',
  password: '',
  isLoading: false,
  error: '',
  isRegistration: false,
  requestStatus: 'idle',
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registrationUser.pending, (state) => {
      state.requestStatus = 'pending';
      state.isLoading = true;
      state.isRegistration = false;
    });
    builder.addCase(registrationUser.fulfilled, (state, action) => {
      state.requestStatus = 'succeeded';
      state.isLoading = false;
      state.isRegistration = true;
      console.log(action.payload);
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.id = action.payload.id;
      state.error = '';
    });
    builder.addCase(registrationUser.rejected, (state) => {
      state.requestStatus = 'failed';
      state.isLoading = false;
      state.error = 'Error! User not registration!';
    });
  },
});

export default registrationSlice.reducer;
