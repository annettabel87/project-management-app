import axios from 'axios';
import { authUser } from './auth-user';

const axiosApiInstance = axios.create({ baseURL: 'https://kanban71.herokuapp.com/' });
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
