import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
axiosConfig.defaults.headers.post["Content-Type"] = "application/json";

axiosConfig.interceptors.request.use(
  (request) => {
    console.log(request);
    const token = localStorage.getItem("token");
    request.headers!.Authorization = `Bearer ${token}`;
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
