import { rootReducer, setupStore } from '../store/store';

export interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}
export interface CreateBoardFormProps {
  isAuth: boolean;
  onClose: () => void;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export type BoardStateType = {
  boards: BoardData[];
  isLoading: boolean;
  error: string;
};
export interface BoardData {
  id: string;
  title: string;
}

export type LoginStateType = {
  login: string;
  password: string;
  token: string;
  isLoading: boolean;
  error: string;
  requestStatus: string;
};
export interface LoginData {
  login: string;
  password: string;
}

export interface ResponseLoginData {
  token: string;
}

export type RegistrationStateType = {
  id: string;
  name: string;
  login: string;
  password: string;
  isLoading: boolean;
  error: string;
  isRegistration: boolean;
  requestStatus: string;
};
export interface RegistrationData {
  name: string;
  login: string;
  password: string;
}

export interface ResponseRegistrationData {
  id: string;
  login: string;
  name: string;
}

export type AuthorisationStateType = {
  id: string;
  name: string;
  login: string;
  password: string;
  isLoading: boolean;
  error: string;
  isRegistration: boolean;
  requestStatus: string;
  token: string;
};
