import { api } from "@/shared/api/client";

export const loginApi = (data: {
    email: string;
    password: string
}) => {
    return api.post("/login", data);
};