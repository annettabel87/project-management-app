import axiosApiInstance from '../../api/axios-api-instance';
import { ILoginData, IRegistrationData, TResponseUserData } from '../../interfaces/Interfaces';
import { API_ENDPOINTS } from '../../constants/constants';

export const usersApi = {
  registerUser(data: IRegistrationData) {
    return axiosApiInstance
      .post(API_ENDPOINTS.SIGNUP, { ...data })
      .then((response) => response.data);
  },
  getUser() {
    return axiosApiInstance.get<TResponseUserData[]>(API_ENDPOINTS.USERS);
  },
  updateUser(userId: string | undefined, userUpdateData: IRegistrationData) {
    return axiosApiInstance
      .put<TResponseUserData>(`${API_ENDPOINTS.USERS}/${userId}`, {
        ...userUpdateData,
      })
      .then((response) => response.data);
  },
  deleteUser(userId: string | undefined) {
    return axiosApiInstance.delete(`${API_ENDPOINTS.USERS}/${userId}`).then(() => userId);
  },
};

export const tokenApi = {
  createToken(login: ILoginData) {
    return axiosApiInstance
      .post(API_ENDPOINTS.SIGNIN, { ...login })
      .then((response) => response.data);
  },
};
