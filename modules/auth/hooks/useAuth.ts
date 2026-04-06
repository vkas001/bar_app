import { useState } from "react";
import { login } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import { saveToken } from "@/shared/storage/secure";
import { saveAuthData } from "@/shared/storage/async";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();

  const logIn = async (data: {
    email: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const res = await login(data);
      const { token, user, roles, permissions } = res;

      //  SAVE SESSION
      await saveToken(token);
      await saveAuthData({
        user,
        roles,
        permissions
      });

      return user;
    } catch (e: any) {
      const message =
        e?.response?.data?.message ||
        e?.response?.status ||
        e?.message ||
        "unknown error";

      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { logIn, loading };
};