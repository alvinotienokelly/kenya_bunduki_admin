import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios instance for making authenticated requests
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token') || '';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios instance for handling 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove('user');
      Cookies.remove('token');
      window.location.assign('/accounts/login');
    }
    return Promise.reject(error);
  }
);

export default api;
