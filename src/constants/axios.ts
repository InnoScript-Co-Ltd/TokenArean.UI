import axios from "axios";
import config from "./environment";

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
