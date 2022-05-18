import axiosApiInstance from '../../api/axios-api-instance';
import { RegistrationData } from '../../interfaces/Interfaces';

const usersApi = {
  registerUser(data: RegistrationData) {
    return axiosApiInstance.post('signup', { ...data }).then((response) => response.data);
  },
};

export default usersApi;
