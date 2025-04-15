import axios from "axios";
import config from "@/constants/environment";
import { logout, refreshToken } from "@/redux/service/auth/authSlice";
import type { AppDispatch } from "@/redux/store";

let dispatch: AppDispatch;

export function injectStore(_dispatch: AppDispatch) {
  dispatch = _dispatch;
}

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: config.API_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: true,
});

// Request interceptor – add token if available
axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Response interceptor – handle 401 / 403 errors
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (original.url?.includes("/refresh")) {
      dispatch(logout());
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !original._retry
    ) {
      original._retry = true;
      try {
        const { accessToken } = await dispatch(refreshToken()).unwrap();
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        original.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(original);
      } catch {
        dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(new Error("Session expired"));
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
