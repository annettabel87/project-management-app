import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardReducer';

export const rootReducer = combineReducers({
  boardReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
