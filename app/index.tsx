
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { getUserLocal } from "@/shared/storage/async";
import { getToken } from "@/shared/storage/secure";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const { loading } = useAuth();
  const { isAuthenticated, setUser } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUserLocal();
      const token = await getToken();
      if (user && token) {
        setUser(user);
      }
      setChecking(false);
    };
    checkAuth();
    // eslint-disable-next-line
  }, []);

  if (loading || checking) return null;

  return isAuthenticated
    ? <Redirect href="/(tabs)/home" />
    : <Redirect href="/auth" />;
}