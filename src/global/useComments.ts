import { create } from "zustand";
import { CommentsType } from "../types";

export const useComments = create((set) => ({
  comments: "",
  setPostId: (newComment: CommentsType) =>
    set(() => ({ comments: newComment })),
}));
