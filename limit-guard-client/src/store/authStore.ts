import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserDataIntaerface } from "../interfaces/user.interace";

interface AuthState {
  user: UserDataIntaerface | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: Partial<UserDataIntaerface> | null) => void;
  setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

    setUser: (userData) =>
      set((state) => {
        if (userData === null) {
          return {
            user: null,
            isAuthenticated: false,
          };
        }

        return {
          user: state.user
            ? {
                ...state.user,
                ...userData,
              }
            : null,
          isAuthenticated: true,
        };
      }),

      setLoading: (value) =>
        set({
          isLoading: value,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);