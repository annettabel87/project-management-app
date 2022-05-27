import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authorisationSlice from './authorisation-slice';
import boardsSlice from './boards-slice';

export const rootReducer = combineReducers({
  boardsSlice,
  authorisationSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
