import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// ==========================
// AXIOS INSTANCE
// ==========================
const API = axios.create({
  baseURL: API_BASE_URL,
});

// ==========================
// ADD JWT TOKEN TO EVERY REQUEST
// ==========================
API.interceptors.request.use(
  (req) => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("jwt") ||
      localStorage.getItem("userToken");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

export default API;