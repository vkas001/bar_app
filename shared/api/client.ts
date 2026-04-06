import axios from "axios";
import { getToken } from "../storage/secure";

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
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