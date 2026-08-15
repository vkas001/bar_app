import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL_KEY = "api_base_url";

export const getApiBaseUrl = async (): Promise<string> => {
  try {
    const saved = await AsyncStorage.getItem(API_URL_KEY);
    if (saved && saved.trim()) return saved.trim();
  } catch {}
  return process.env.EXPO_PUBLIC_API_URL || "";
};

export const getSavedApiBaseUrl = async (): Promise<string | null> => {
  try {
    const saved = await AsyncStorage.getItem(API_URL_KEY);
    return saved && saved.trim() ? saved.trim() : null;
  } catch {
    return null;
  }
};

export const saveApiBaseUrl = async (url: string) => {
  await AsyncStorage.setItem(API_URL_KEY, url.trim());
};

export const removeApiBaseUrl = async () => {
  await AsyncStorage.removeItem(API_URL_KEY);
};