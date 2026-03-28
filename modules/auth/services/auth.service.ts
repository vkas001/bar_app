import { removeUserLocal, saveAuthData } from "@/shared/storage/async";
import { removeToken, saveToken } from "@/shared/storage/secure";
import { loginApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await loginApi(data);

  const { token, user, roles, permissions } = res.data;

  await saveToken(token);
  await saveAuthData({ user, roles, permissions });

  return { token, user, roles, permissions };
};

export const logout = async () => {
  await removeToken();

  await removeUserLocal();

  useAuthStore.getState().clearUser();
};