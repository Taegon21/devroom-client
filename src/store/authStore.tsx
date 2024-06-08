// store/authStore.ts
import { create } from "zustand";

// 유저 정보 추가
interface User {
  name: string;
  studentId: string;
  email: string;
  isStudent: boolean;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const userDummy = {
  name: "김태건",
  studentId: "2019312430",
  email: "aksen5240@gmail.com",
  isStudent: true,
};

const userDummyProfessor = {
  name: "교수자1",
  studentId: "1999312430",
  email: "aksen5240@gmail.com",
  isStudent: false,
};

export const useAuthStore = create<AuthState>((set) => ({
  user: userDummyProfessor,
  isLoggedIn: true,
  login: (user) => set({ user: user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
