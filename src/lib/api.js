import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  // timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
});

// api.interceptors.response.use(
//   function (response) {
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Do something with response error
//     console.log("INTERCEPTED");
//     return Promise.reject(error);
//   }
// );

export default api;
