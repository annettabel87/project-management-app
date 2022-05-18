import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authorisationSlice from './authorisation-slice';
import boardsSlice from './boards-slice';

// import loginReducer from './login-reducer';
// import registrationReducer from './registration-reducer';

export const rootReducer = combineReducers({
  boardsSlice,
  // loginReducer,
  // registrationReducer,
  authorisationSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};