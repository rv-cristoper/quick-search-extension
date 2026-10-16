import axios from "axios";

axios.interceptors.request.use(async (config) => {
  config.headers["Content-Type"] =
    config.data instanceof FormData ? "multipart/form-data" : "application/json";
  config.baseURL = import.meta.env.VITE_API_URL;
  return config;
});

export default axios;
