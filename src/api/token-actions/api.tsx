import axiosApiInstance from '../../api/axios-api-instance';
import { IRegistrationData } from '../../interfaces/Interfaces';

const usersApi = {
  registerUser(data: IRegistrationData) {
    return axiosApiInstance.post('signup', { ...data }).then((response) => response.data);
  },
};

export default usersApi;
