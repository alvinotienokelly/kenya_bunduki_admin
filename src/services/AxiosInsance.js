import axios from "axios";
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Failed to decrypt data:', error);
    return null;
  }
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const encryptedToken = Cookies.get('token');
    if (encryptedToken) {
      
      const token = decryptData(encryptedToken);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log("token" + token);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
