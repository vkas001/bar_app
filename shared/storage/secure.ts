import * as SecureStore from "expo-secure-store";
import { log, logError } from "@/shared/debug/startupLog";

const TOKEN_KEY = "auth_token";

export const saveToken = async (token: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getToken = async () => {
    try {
        log("secure-store getItemAsync start");
        const value = await SecureStore.getItemAsync(TOKEN_KEY);
        log("secure-store getItemAsync ok, token present =", !!value);
        return value;
    } catch (e: any) {
        logError("secure-store getItemAsync FAILED", e?.name, e?.message, e?.code);
        throw e;
    }
};

export const removeToken = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
};