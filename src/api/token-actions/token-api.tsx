import axiosApiInstance from '../../api/axios-api-instance';
import { ILoginData } from '../../interfaces/Interfaces';

const tokenApi = {
  createToken(login: ILoginData) {
    return axiosApiInstance.post('signin', { ...login }).then((response) => response.data);
  },
};

export default tokenApi;
