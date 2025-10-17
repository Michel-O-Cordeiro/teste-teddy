import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://boasorte.teddybackoffice.com.br',
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
});