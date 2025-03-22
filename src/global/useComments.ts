import { create } from "zustand";

type Comment = {
  comment: string;
  post_id: number;
  username: string;
  avatar_url: string;
};

type CommentState = {
  comments: Comment[];
  setComments: (newComments: Comment[]) => void;
};

export const useComments = create<CommentState>((set) => ({
  comments: [],
  setComments: (comments: any) => set({ comments }),
}));
