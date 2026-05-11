import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "auth_user";
const API_URL = "app_api_config";

export interface AuthData {
    user: any;
    roles: string[];
    permissions: string[];
}

export const saveAuthData = async (data: AuthData) => {
    const userLabel = data.user?.name ?? data.user?.email ?? data.user?.id ?? "unknown";

    console.log("[auth] saving session", {
        user: userLabel,
        roles: data.roles,
        permissions: data.permissions,
    });

    await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
};

export const getAuthData = async (): Promise<AuthData | null> => {
    const authData = await AsyncStorage.getItem(USER_KEY);
    return authData ? JSON.parse(authData) : null;
};

export const getUserLocal = async () => {
    const data = await getAuthData();
    return data?.user || null;
};

export const removeUserLocal = async () => {
    await AsyncStorage.removeItem(USER_KEY);
};

export interface ApiConfig {
    url: string;
}

export const saveApiConfig = async (config: ApiConfig): Promise<void> => {
    await AsyncStorage.setItem(API_URL, JSON.stringify(config));
};

export const loadApiConfig = async (): Promise<ApiConfig | null> => {
    const raw = await AsyncStorage.getItem(API_URL);
    return raw ? (JSON.parse(raw) as ApiConfig) : null;
};

export const hasApiBeenSetup = async (): Promise<boolean> => {
    const config = await loadApiConfig();
    return !!config?.url?.trim();
};

export const getApiUrl = async (): Promise<string> => {
    const config = await loadApiConfig();
    return config?.url ?? "";
};