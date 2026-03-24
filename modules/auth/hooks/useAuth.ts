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

      //  UPDATE GLOBAL STATE
      setUser({
        user,
        roles,
        permissions
      });

      return user;
    } finally {
      setLoading(false);
    }
  };

  return { logIn, loading };
};