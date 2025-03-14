import { create } from "zustand";
import { EmailType } from "../types";

export const useEmail = create((set) => ({
  email: "",
  otp: "",
  setEmail: (newEmail: EmailType) => set(() => ({ email: newEmail })),
  setOtp: (newOtp: EmailType) => set(() => ({ otp: newOtp })),
}));
