import axiosApiInstance from '../../api/axios-api-instance';
import { ILoginData, IRegistrationData } from '../../interfaces/Interfaces';
import { API_ENDPOINTS } from '../../constants/constants';

export const usersApi = {
  registerUser(data: IRegistrationData) {
    return axiosApiInstance
      .post(API_ENDPOINTS.SIGNUP, { ...data })
      .then((response) => response.data);
  },
};

export const tokenApi = {
  createToken(login: ILoginData) {
    return axiosApiInstance
      .post(API_ENDPOINTS.SIGNIN, { ...login })
      .then((response) => response.data);
  },
};
