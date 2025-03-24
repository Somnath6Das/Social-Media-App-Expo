import { supabase } from "../lib/superbase";

export async function sendLikeNotification(like: any) {
  // console.log(like);
  const { data } = await supabase
    .from("likes")
    .select("*, posts(*, profiles(*))")
    .eq("id", like.id)
    .single();

  // console.log(JSON.stringify(data, null, 2));

  const pushToken = data?.posts?.profiles?.push_token;
  if (!pushToken) {
    return;
  }

  const message = {
    to: pushToken,
    sound: "default",
    title: "Someone liked your post",
    body: `${data?.posts?.profiles.username} liked your post!`,
    data: { postId: data.posts.id },
  };
  sendPushNotification(message);
}

async function sendPushNotification(message: any) {
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
