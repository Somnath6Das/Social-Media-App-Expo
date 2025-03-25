import { useCommentStore } from "../global/useComments";
import { supabase } from "../lib/superbase";

export const fatchComments = async (postid: any) => {
  const { data, count, error } = await supabase
    .from("comments")
    .select("*, user:profiles(*)", {
      count: "exact",
    })
    .eq("post_id", postid)
    .order("created_at", { ascending: true });
  if (error) {
    console.log(error);
  }
  if (data) {
    useCommentStore.getState().setComments(data);
  }
  return { data, count, error };
  // console.log(JSON.stringify(data, null, 2));
  // console.log(count);
};
