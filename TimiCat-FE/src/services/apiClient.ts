import axios from "axios";
import { API_BASE_URL } from "@/lib/constants/config";

// Axios 客户端：使用后端地址并携带 Cookie
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// 在请求头附加访客令牌
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("guestToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
