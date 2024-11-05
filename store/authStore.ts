// src/store/authStore.ts

import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  login: () => void;
  logout: () => void;
  setUser: (user: any) => void;
  user: any;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {},
  setUser: (user: any) => set({ user: user }),
  isAuthenticated: false,
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));
