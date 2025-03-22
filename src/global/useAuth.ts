import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { AuthContextType } from "../types";

export const useAuth = create((set) => ({
  auth: {
    isAuthenticated: false,
    session: null,
    user: null,
    isReady: false,
  },
  updateAuth: (newAuth: AuthContextType) =>
    set((state: { auth: AuthContextType }) => ({
      auth: { ...state.auth, ...newAuth },
    })),
}));
