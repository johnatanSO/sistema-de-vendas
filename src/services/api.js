import axios from "axios";

export const api = axios.create({
  baseURL: process.env.BACK_END_URL,
});
