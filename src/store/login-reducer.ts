import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginData, LoginStateType, ResponseLoginData } from '../interfaces/Interfaces';
import errorMessage from '../shared/error-nessage/error-message';
import tokenApi from '../api/token-actions/token-api';
import tokenActions from '../api/token-actions/token-actions';

export const loginUser = createAsyncThunk<ResponseLoginData, LoginData>(
  'login/fetch',
  async (login, { rejectWithValue }) => {
    try {
      const response = await tokenApi.createToken(login);
      if (response) {
        const { token } = response as ResponseLoginData;
        tokenActions.setUserToken(token);
        return response;
      }
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const logoutUser = createAsyncThunk('logout/fetch', async (_, { rejectWithValue }) => {
  try {
    tokenActions.removeUserToken();
  } catch (error) {
    return rejectWithValue(errorMessage(error));
  }
});

export const initialState: LoginStateType = {
  login: '',
  password: '',
  requestStatus: 'idle',
  token: '',
  isLoading: false,
  error: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.requestStatus = 'pending';
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.requestStatus = 'succeeded';
      state.isLoading = false;
      state.token = tokenActions.getUserToken() as string;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.requestStatus = 'failed';
      state.isLoading = false;
      state.error = 'error';
    });
  },
});

export default loginSlice.reducer;
