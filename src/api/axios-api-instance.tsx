import axios from 'axios';
import { authUser } from './auth-user';
import { API_PROJECT_MANAGEMENT_APP } from '../constants/constants';

const axiosApiInstance = axios.create({ baseURL: API_PROJECT_MANAGEMENT_APP });
axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: authUser(),
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiInstance;
