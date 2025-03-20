import { create } from "zustand";
import { CommentsType } from "../types";

export const useComments = create((set) => ({
  comments: "",
  setComments: (newComment: CommentsType) =>
    set(() => ({ comments: newComment })),
}));
