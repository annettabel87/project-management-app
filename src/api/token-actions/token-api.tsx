import axiosApiInstance from '../../api/axios-api-instance';
import { LoginData } from '../../interfaces/Interfaces';

const tokenApi = {
  createToken(login: LoginData) {
    return axiosApiInstance.post('signin', { ...login }).then((response) => response.data);
  },
};

export default tokenApi;
