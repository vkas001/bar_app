import AsyncStorage from "@react-native-async-storage/async-storage";
import { log, logError } from "@/shared/debug/startupLog";

const USER_KEY = "auth_user";

export const saveAuthData = async (data: {
    user: any;
    roles: String[];
    permissions: String[]
}) => {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
};

export const getUserLocal = async () => {
    try {
        log("async-storage getItem start");
        const user = await AsyncStorage.getItem(USER_KEY);
        log("async-storage getItem ok, user present =", !!user);
        return user ? JSON.parse(user) : null;
    } catch (e: any) {
        logError("async-storage getItem FAILED", e?.name, e?.message);
        throw e;
    }
};

export const removeUserLocal = async () => {
    await AsyncStorage.removeItem(USER_KEY);
};