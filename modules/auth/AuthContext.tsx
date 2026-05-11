import { getAuthData, removeUserLocal, saveAuthData, type AuthData } from "@/shared/storage/async";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface AuthContextValue {
  user: any | null;
  roles: string[];
  permissions: string[];
  isAuthenticated: boolean;
  loading: boolean;
  setAuth: (data: AuthData) => Promise<void>;
  clearAuth: () => Promise<void>;
  hasRole: (...roles: string[]) => boolean;
  hasPermission: (...permissions: string[]) => boolean;
  hasAnyRole: (...roles: string[]) => boolean;
  hasAnyPermission: (...permissions: string[]) => boolean;
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from AsyncStorage on app launch
    getAuthData().then((data) => {
      if (data) {
        setUser(data.user);
        setRoles(data.roles ?? []);
        setPermissions(data.permissions ?? []);
      }
      setLoading(false);
    });
  }, []);

  async function setAuth(data: AuthData) {
    await saveAuthData(data);
    setUser(data.user);
    setRoles(data.roles ?? []);
    setPermissions(data.permissions ?? []);
  }

  async function clearAuth() {
    await removeUserLocal();
    setUser(null);
    setRoles([]);
    setPermissions([]);
  }

  /** User must have ALL of the given roles */
  function hasRole(...required: string[]) {
    return required.every((r) => roles.includes(r));
  }

  /** User must have ALL of the given permissions */
  function hasPermission(...required: string[]) {
    return required.every((p) => permissions.includes(p));
  }

  /** User must have AT LEAST ONE of the given roles */
  function hasAnyRole(...required: string[]) {
    return required.some((r) => roles.includes(r));
  }

  /** User must have AT LEAST ONE of the given permissions */
  function hasAnyPermission(...required: string[]) {
    return required.some((p) => permissions.includes(p));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        permissions,
        isAuthenticated: !!user,
        loading,
        setAuth,
        clearAuth,
        hasRole,
        hasPermission,
        hasAnyRole,
        hasAnyPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}