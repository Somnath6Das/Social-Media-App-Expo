import { create } from "zustand";

export const useEmail = create((set) => ({
  email: "",
  setEmail: (newEmail: any) => set(() => ({ email: newEmail })),
}));
