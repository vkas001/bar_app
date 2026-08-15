import { api } from "@/shared/api/client";

export const loginApi = (data: {
    email: string;
    password: string
}) => {
   // console.log("[DEBUG] BASE URL:", process.env.EXPO_PUBLIC_API_URL);
    return api.post("/login", data);
};