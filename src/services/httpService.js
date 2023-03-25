import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

const http = {
    get: axiosInstance.get,
    post: axiosInstance.post,
    put: axiosInstance.put,
    delete: axiosInstance.delete
    // CancelToken: axiosInstance.CancelToken,
    // all: axiosInstance.all,
    // spread: axiosInstance.spread
};

export default http;
