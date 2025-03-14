import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";

type Auth = {
  isAuthenticated: boolean;
  session: Session | null;
  user?: User | null;
  isReady: boolean;
};

export const useAuth = create((set) => ({
  auth: {
    isAuthenticated: false,
    session: null,
    user: null,
    isReady: false,
  },
  updateAuth: (newAuth: Auth) =>
    set((state: { auth: Auth }) => ({ auth: { ...state.auth, ...newAuth } })),
}));
