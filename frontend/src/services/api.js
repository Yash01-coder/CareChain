import axios from "axios";

// ==========================
// AXIOS INSTANCE
// ==========================
const API = axios.create({
  baseURL: "http://localhost:5000/api",
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
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================
// EXPORT API
// ==========================
export default API;