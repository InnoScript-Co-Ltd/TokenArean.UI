import axios from "axios";
import config from "@/constants/environment";
import { logout } from "@/redux/service/auth/authSlice";
import type { AppDispatch } from "@/redux/store";

let dispatch: AppDispatch;

export function injectStore(_dispatch: AppDispatch) {
  dispatch = _dispatch;
}

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor – add token if available
axiosInstance.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("authToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Response interceptor – handle 401 / 403 errors
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;

    if ((status === 401 || status === 403) && dispatch) {
      dispatch(logout());
      window.location.href = "/login";
      return Promise.reject(new Error("Session expired"));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
