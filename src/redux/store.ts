import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authorisationSlice from './authorisation-slice';
import boardsSlice from './boards-slice';
import columnsSlice from './columns-slice';
import profileSlice from './profile-slice';

export const rootReducer = combineReducers({
  boardsSlice,
  authorisationSlice,
  columnsSlice,
  profileSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
