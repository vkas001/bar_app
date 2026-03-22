import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "auth_user";

export const saveUserLocal = async (user: any) => {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserLocal = async () => {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const removeUserLocal = async () => {
    await AsyncStorage.removeItem(USER_KEY);
};