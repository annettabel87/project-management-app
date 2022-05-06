import { combineReducers, configureStore } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
