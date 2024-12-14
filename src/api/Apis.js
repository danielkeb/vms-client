import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


console.log('Environment:', process.env);
console.log('REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);


const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const publicApi = axios.create({
  baseURL: BASE_URL,
});

export { api, publicApi };
