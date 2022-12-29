import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
axiosConfig.defaults.headers.post["Content-Type"] = "application/json";

axiosConfig.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    request.headers!.Authorization = `Bearer ${token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
