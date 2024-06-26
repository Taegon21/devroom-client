// store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  email: string;
  name: string;
  role: string;
  studentId: string;
  idToken: string;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setRole: (role: string) => void;
  setStudentId: (studentId: string) => void;
  setIdToken: (idToken: string) => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      email: "",
      name: "",
      role: "",
      studentId: "",
      idToken: "",
      setEmail: (email) => set({ email }),
      setName: (name) => set({ name }),
      setRole: (role) => set({ role }),
      setStudentId: (studentId) => set({ studentId }),
      setIdToken: (idToken) => set({ idToken }),
    }),
    {
      name: "userData",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null; // 문자열을 객체로 파싱
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value)); // 객체를 문자열로 직렬화
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
