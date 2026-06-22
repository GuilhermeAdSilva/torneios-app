/*export const BASE_URL = 'https://my-json-server.typicode.com/guilhermeadsilva/jsonfake';
export const BASE_URL2 = 'https://my-json-server.typicode.com/guilhermeadsilva/jsonfake2';
export const BASE_URL3 = 'https://my-json-server.typicode.com/guilhermeadsilva/jsonfake3';
export const BASE_URL4 = 'https://my-json-server.typicode.com/guilhermeadsilva/jsonfake4';
export const BASE_URL5 = 'https://my-json-server.typicode.com/guilhermeadsilva/jsonfake5';*/


import axios from 'axios';

// Mantém a sua constante que você já usa no projeto
export const BASE_URL = 'http://localhost:8081/api/v1';

// Cria uma instância do axios configurada com a sua URL base
const api = axios.create({
  baseURL: BASE_URL,
});

// Criamos um "interceptador": antes de QUALQUER requisição sair do frontend,
// ele passa aqui dentro, pega o token do localStorage e coloca no cabeçalho.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Adiciona o formato "Bearer seu_token_aqui" exigido pelo Spring Security
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Exporta a instância configurada para você usar nas telas
export default api;