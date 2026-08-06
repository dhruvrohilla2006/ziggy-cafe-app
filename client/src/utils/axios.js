import axios from "axios";

const axiosInstance = axios.create({
  adapter: "fetch",
  baseURL: "http://localhost:3000",
  timeout: 10000,
  withCredentials: true,
});

export default axiosInstance;
