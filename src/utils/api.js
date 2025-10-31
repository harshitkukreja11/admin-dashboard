import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com", // you can replace this with your backend API later
});

// Optional: Add interceptors for auth tokens or logging
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
