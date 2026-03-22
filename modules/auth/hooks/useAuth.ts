import { useState } from "react";
import { login } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import { saveToken } from "@/shared/storage/secure";
import { saveUserLocal } from "@/shared/storage/async";

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

      const { token, user } = res;

      //  SAVE SESSION
      await saveToken(token);
      await saveUserLocal(user);

      //  UPDATE GLOBAL STATE
      setUser(user);

      return user;
    } finally {
      setLoading(false);
    }
  };

  return { logIn, loading };
};