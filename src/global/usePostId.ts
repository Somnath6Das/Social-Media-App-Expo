import { create } from "zustand";
import { PostIdType } from "../types";

export const usePostId = create((set) => ({
  postId: "",
  setPostId: (newPostId: PostIdType) => set(() => ({ postId: newPostId })),
}));
