// store/authStore.ts
import { create } from "zustand";

// 유저 정보 추가
interface User {
  name: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

//  const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   isLoggedIn: true,
//   login: (user) => set({ user: user, isLoggedIn: true }),
//   logout: () => set({ user: null, isLoggedIn: false }),
// }));

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user) => set({ user: user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
