import { Session, User } from "@supabase/supabase-js";

export type AuthContextType = {
  auth: {
    isAuthenticated: boolean;
    session: Session | null;
    user?: User | null;
    isReady: boolean;
  };
  updateAuth: (auth: any) => void;
};

export type ButtonProps = {
  title: string;
  onPress?: () => void;
};

export type EmailType = {
  email: string;
  otp: string;
  setEmail: (email: any) => void;
  setOtp: (otp: any) => void;
};
export type PostIdType = {
  postId: string;
  setPostId: (postId: any) => void;
};
