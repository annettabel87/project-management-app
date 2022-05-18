import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardReducer';
import loginReducer from './login-reducer';
import registrationReducer from './registration-reducer';

export const rootReducer = combineReducers({
  boardReducer,
  loginReducer,
  registrationReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
