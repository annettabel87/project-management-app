import { rootReducer, setupStore } from '../redux/store';

export interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}
export interface ICreateBoardFormProps {
  onClose: () => void;
}
export interface ICreateTaskFormProps {
  onClose: () => void;
  columnId: string;
}

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore['dispatch'];

// Boards slice
export type TBoardsSliceState = {
  reloadStatus: boolean;
  boards: IBoardData[];
  requestStatus: string;
  error: string;
  selectBoard: IFullBoardData;
  users?: TUsersResponse;
};

export type TUsersResponse = {
  [key: string]: string;
}[];

export interface IBoardData {
  id: string;
  title: string;
  description: string;
}

export interface IAddBoardData {
  title: string;
  description: string;
}

// Columns slice
export type TColumnsSliceState = {
  reloadColumnsStatus: boolean;
  columns: IColumnData[];
  error?: string;
};

export type TCreateColumnRequest = {
  columnData: TColumnData;
  boardId: string;
};

export type TDeleteColumnRequest = {
  boardId: string;
  columnId: string;
};

export type TAddTaskRequest = {
  taskData: TTaskData;
  boardId: string;
  columnId: string;
};

export type TColumnData = {
  title: string;
};

export type TTaskData = {
  title: string;
  description: string;
  userId: string;
};

export type TUpdateTaskRequest = {
  taskData: TUpdateTaskData;
  boardId: string;
  columnId: string;
  taskId: string;
};

export type TUpdateColumnRequest = {
  columnData: { title: string; order: number };
  boardId: string;
  columnId: string;
};

export type TUpdateTaskData = {
  title: string;
  description: string;
  boardId: string;
  columnId: string;
  userId: string;
  order: number;
};

export type TTaskResponse = {
  [key: string]: string;
};

export type TDeleteTaskRequest = {
  boardId: string;
  columnId: string;
  taskId: string;
};

// Profile slice

export type TProfileSliceState = {
  reloadProfileStatus: boolean;
  error?: string;
  users?: TUsersResponse;
};

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
  description: string;
  columns: IColumnData[];
}

export type TUpdateBoardType = {
  id: string;
  body: IAddBoardData;
};

export type TUpdateUser = {
  userId?: string;
  user: IRegistrationData;
};

export interface IColumnData {
  id: string;
  title: string;
  order: number;
  tasks: ITaskData[];
}
export interface ITaskData {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: IFileData[];
}
export interface ITaskProps {
  task: ITaskData;
  columnId: string;
}
export interface ICreateTaskData {
  title: string;
  description: string;
  file: FileList;
  userId: string;
}

export interface IFileData {
  filename: string;
  fileSize: number;
}

export type TResponseUserData = {
  id: string;
  name: string;
  login: string;
};
