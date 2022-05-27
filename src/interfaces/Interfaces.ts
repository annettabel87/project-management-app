import { rootReducer, setupStore } from '../redux/store';

export interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}
export interface ICreateBoardFormProps {
  isAuth: boolean;
  onClose: () => void;
}

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore['dispatch'];

export type TBoardSliceState = {
  boards: IBoardData[];
  requestStatus: string;
  error: string;
  selectBoard: IFullBoardData;
};
export interface IBoardData {
  id: string;
  title: string;
}

export type TLoginState = {
  login: string;
  password: string;
  token: string;
  isLoading: boolean;
  error: string;
  requestStatus: string;
};
export interface ILoginData {
  login: string;
  password: string;
}

export interface IResponseLoginData {
  token: string;
}

export type TRegistrationStateType = {
  id: string;
  name: string;
  login: string;
  password: string;
  isLoading: boolean;
  error: string;
  isRegistration: boolean;
  requestStatus: string;
};
export interface IRegistrationData {
  name: string;
  login: string;
  password: string;
}

export interface IResponseRegistrationData {
  [key: string]: string;
}

export type TAuthorisationSliceState = {
  loginRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  registrationRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  user?: {
    [key: string]: string;
  };
  error?: string;
  token?: string;
};

export interface IFullBoardData {
  id: string;
  title: string;
  columns: IColumnData[];
}

export type TUpdateBoardType = {
  id: string;
  title: string;
};

export type TUpdateUser = {
  userId?: string;
  user: IRegistrationData;
};

export interface IColumnData {
  id: string;
  title: string;
  order: number;
  tasks: [];
}

export type TResponseUserData = {
  id: string;
  name: string;
  login: string;
};
