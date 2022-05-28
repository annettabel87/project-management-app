import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authorisationSlice from './authorisation-slice';
import boardsSlice from './boards-slice';
import columnsSlice from './columns-slice';
//import profileSlice from './profile-slice';
import usersSlice from './edit-profile-slice';

export const rootReducer = combineReducers({
  boardsSlice,
  authorisationSlice,
  columnsSlice,
  //profileSlice,
  usersSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
