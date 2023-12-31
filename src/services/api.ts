import axios from 'axios';
import { LOCAL_STORAGE_USER_AUTH_KEY } from '../constants/storageKeys';

const baseURL = 'http://localhost:3000/api/';

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  (config) => {
    const storageUser = localStorage.getItem(LOCAL_STORAGE_USER_AUTH_KEY);
    const userCredentials = JSON.parse(storageUser);

    if (userCredentials?.token) {
      config.headers.Authorization = `${userCredentials.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
