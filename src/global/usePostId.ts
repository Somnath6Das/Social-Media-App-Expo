import { create } from "zustand";
import { PostIdType } from "../types";

export const usePostId = create((set) => ({
  postId: "",
  setPostId: (newId: PostIdType) => set(() => ({ postId: newId })),
}));
