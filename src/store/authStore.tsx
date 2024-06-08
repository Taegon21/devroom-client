import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

const userDummyStudent = {
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

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isLoading: true,
      login: (user: User) => {
        set({ user: user, isLoggedIn: true, isLoading: false });
        sessionStorage.setItem("isLoggedIn", "true");
      },
      logout: () => {
        set({ user: null, isLoggedIn: false, isLoading: false });
        sessionStorage.removeItem("isLoggedIn");
      },
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setLoading(false);
      },
    }
  )
);

export const authenticateUser = (email: string, password: string) => {
  if (email === "student" && password === "123") {
    return userDummyStudent;
  } else if (email === "professor" && password === "123") {
    return userDummyProfessor;
  } else {
    return null;
  }
};
