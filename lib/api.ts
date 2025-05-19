import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // URL da API em Java Spring Boot
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
});

export default api;
