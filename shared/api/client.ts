import axios from "axios";
import { getToken } from "../storage/secure";
import { getApiBaseUrl } from "./config";

export const api = axios.create({
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use(async (config) => {
    config.baseURL = await getApiBaseUrl();
    return config;
});

// auto attach token to every request

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // console.log("API ERROR:", JSON.stringify({
        //     url: error?.config?.url,
        //     status: error?.response?.status,
        //     data: error?.response?.data,
        //     message: error?.message,
        // }));
        return Promise.reject(error);
    }
);