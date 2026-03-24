import { create } from "zustand";

type AuthState = {
  user: any | null;
  roles: String[];
  permissions: String[];
  isAuthenticated: boolean;

  setUser: (data: {
    user: any;
    roles: String[];
    permissions: String[]
  }) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  roles: [],
  permissions: [],
  isAuthenticated: false,

  setUser: (data) =>
    set({
      user: data.user,
      roles: data.roles,
      permissions: data.permissions,
      isAuthenticated: true,
    }),

  clearUser: () =>
    set({
      user: null,
      roles: [],
      permissions: [],
      isAuthenticated: false,
    }),
}));