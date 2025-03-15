import { Image, Text, useWindowDimensions, View } from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import PostContent from "./PostContent";
import { useEffect, useRef, useState } from "react";
import { cld } from "~/src/lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";
import { supabase } from "../lib/superbase";
import { useAuth } from "../global/useAuth";
import { AuthContextType } from "../types";
// import { sendLikeNotification } from "../notification/messages";

export default function PostList({ post }: any) {
  const likeCountRef = useRef(post.likes?.[0]?.count);
  const { auth, updateAuth } = useAuth() as AuthContextType;
  const [isLiked, setIsLiked] = useState(false);
  const [likeRecord, setLikeRecord] = useState<{ id: string } | null>(null);

  let avatar = cld.image(post.user.avatar_url);

  useEffect(() => {
    if (post.my_likes.length > 0) {
      setLikeRecord(post.my_likes[0]);
      setIsLiked(true);
    }
  }, [post.my_likes]);

  useEffect(() => {
    if (isLiked) {
      saveLike();
    } else {
      deleteLike();
    }
  }, [isLiked]);

  const saveLike = async () => {
    if (likeRecord) {
      return;
    }
    const { data } = await supabase
      .from("likes")
      .insert([{ user_id: auth.user?.id, post_id: post.id }])
      .select();

    if (data) {
      // send notification to the owner of that post
      //   sendLikeNotification(data[0]);
      setLikeRecord(data[0]);
    }
  };

  const deleteLike = async () => {
    if (likeRecord) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("id", likeRecord.id);
      if (!error) {
        setLikeRecord(null);
      }
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        {post.user.avatar_url ? (
          <AdvancedImage
            cldImg={avatar}
            style={{
              width: 40,
              height: 40,
              aspectRatio: 1,
              borderRadius: 50,
              marginLeft: 10,
            }}
          />
        ) : (
          <Image
            source={require("~/assets/photos/user.png")}
            style={{ width: 50, height: 50, aspectRatio: 1, borderRadius: 50 }}
          />
        )}
        <Text style={{ fontSize: 18 }}>{post.user.username || "New user"}</Text>
      </View>
      {post.caption && (
        <View style={{ paddingLeft: 3, paddingBottom: 3, paddingRight: 3 }}>
          <Text style={{ color: "black", fontWeight: "semibold" }}>
            {post.caption}
          </Text>
        </View>
      )}

      <PostContent post={post} />
      <View style={{ flexDirection: "row", gap: 3, padding: 3 }}>
        <AntDesign
          onPress={() => {
            if (!isLiked) {
              likeCountRef.current += 1;
              setIsLiked(true);
            } else {
              likeCountRef.current -= 1;
              setIsLiked(false);
            }
          }}
          name={isLiked ? "heart" : "hearto"}
          size={20}
          color={isLiked ? "crimson" : "black"}
        />
        <Ionicons name="chatbubble-outline" size={20} />
        <Feather name="send" size={20} />

        <Feather name="bookmark" size={20} className="ml-auto" />
      </View>

      <View style={{ paddingHorizontal: 3, gap: 1 }}>
        <Text style={{ fontWeight: "semibold" }}>
          Likes {likeCountRef.current || 0}
        </Text>
      </View>
    </View>
  );
}
