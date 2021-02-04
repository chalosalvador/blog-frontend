import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  // timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
});

export default api;