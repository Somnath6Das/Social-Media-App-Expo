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
  comments: [], // Ensure default value is an empty array
  setComments: (newComments) => set(() => ({ comments: newComments || [] })), // Default to an empty array
}));
