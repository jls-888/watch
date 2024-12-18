import axios from "axios";
import {
  ElMessage
} from "element-plus";


const service = axios.create({
  // baseURL: '/api',
  timeout: 5000,
  withCredentials: true
});

// Request interceptors
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      ElMessage({
        type: "error",
        message: "服务器忙,请稍后再试~",
      });
      return;
    }

    return response;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);

export default service;