import { create } from "zustand";

interface User {
  id: string;
  bio: string;
  website: string | null;
  username: string;
  full_name: string | null;
  avatar_url: string;
  push_token: string;
  updated_at: string | null;
}

interface Comment {
  id: number;
  created_at: string;
  post_id: number;
  user_id: string;
  comment: string;
  user: User;
}

interface CommentStore {
  comments: Comment[];
  setComments: (newComments: Comment[]) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  setComments: (newComments) => set({ comments: newComments }),
}));
