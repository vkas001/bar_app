import axios from "axios";
import { getApiBaseUrl, subscribeApiBaseUrl } from "./baseUrl";

export const api = axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

subscribeApiBaseUrl((baseUrl) => {
    api.defaults.baseURL = baseUrl;
});

// auto attach token to every request

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("API ERROR:", JSON.stringify({
            url: error?.config?.url,
            status: error?.response?.status,
            data: error?.response?.data,
            message: error?.message,
        }));
        return Promise.reject(error);
    }
);