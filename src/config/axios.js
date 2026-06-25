/*export const BASE_URL = 'https://my-json-server.typicode.com/guilhermeadsilva/jsonfake';
export const BASE_URL2 = 'https://my-json-server.typicode.com/guilhermeadsilva/jsonfake2';
export const BASE_URL3 = 'https://my-json-server.typicode.com/guilhermeadsilva/jsonfake3';
export const BASE_URL4 = 'https://my-json-server.typicode.com/guilhermeadsilva/jsonfake4';
export const BASE_URL5 = 'https://my-json-server.typicode.com/guilhermeadsilva/jsonfake5';*/


import axios from 'axios';

export const BASE_URL = 'http://localhost:8081/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;