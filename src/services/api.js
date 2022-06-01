import axios from "axios";

export const api = axios.create({
  baseURL: 'https://vendergas-desafio-production.up.railway.app',
});
