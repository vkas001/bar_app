
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { getUserLocal } from "@/shared/storage/async";
import { getToken } from "@/shared/storage/secure";
import { log, logError } from "@/shared/debug/startupLog";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  log("Index render, useAuth() start");
  const { loading } = useAuth();
  const { isAuthenticated, setUser } = useAuthStore();
  const [checking, setChecking] = useState(true);
  log("Index state: loading =", loading, "checking =", checking, "isAuthenticated =", isAuthenticated);

  useEffect(() => {
    log("Index checkAuth effect running");
    const checkAuth = async () => {
      try {
        const user = await getUserLocal();
        const token = await getToken();
        log("checkAuth done: user =", !!user, "token =", !!token);
        if (user && token) {
          setUser(user);
        }
        setChecking(false);
      } catch (e: any) {
        logError("checkAuth FAILED", e?.name, e?.message, e?.stack);
        setChecking(false);
      }
    };
    checkAuth();
    // eslint-disable-next-line
  }, []);

  if (loading || checking) return null;

  return isAuthenticated
    ? <Redirect href="/(tabs)/home" />
    : <Redirect href="/auth" />;
}