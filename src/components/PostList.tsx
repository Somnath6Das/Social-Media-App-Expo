import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons, Feather, AntDesign, Entypo } from "@expo/vector-icons";
import PostContent from "./PostContent";
import { useEffect, useRef, useState } from "react";
import { cld } from "~/src/lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";
import { supabase } from "../lib/superbase";
import { useAuth } from "../global/useAuth";
import { AuthContextType, PostIdType } from "../types";
import { sendLikeNotification } from "../notification/like_notification";
import { useCommentStore } from "../global/useComments";
import { usePostId } from "../global/usePostId";
import { fatchComments } from "../func/fetchComments";
import { useTheme } from "../theme/ThemeProvider";
import { router } from "expo-router";

export default function PostList({ post, openSheet }: any) {
  const isMounted = useRef(false);
  const likeCountRef = useRef(post.likes?.[0]?.count);
  const { auth } = useAuth() as AuthContextType;

  const [isLiked, setIsLiked] = useState(false);
  const [likeRecord, setLikeRecord] = useState<{ id: string } | null>(null);

  const [commentCount, setCommentCount] = useState<number | null>(null);
  const { setPostId } = usePostId() as PostIdType;
  const theme = useTheme();
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
      sendLikeNotification(data[0]);
      // console.log(JSON.stringify(data[0], null, 2));
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
  const commentByPostId = () => {
    fatchComments(post.id).then(({ data, count, error }) => {
      setCommentCount(count);
    });
  };

  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      commentByPostId();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.cardfore }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
          marginTop: 10,
          gap: 8,
          marginBottom: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push(`/profile_modal?postId=${post.id}`)}
        >
          {post.user.avatar_url ? (
            <AdvancedImage
              cldImg={avatar}
              style={{
                width: 47,
                height: 47,
                aspectRatio: 1,
                borderRadius: 50,
              }}
            />
          ) : (
            <Image
              source={require("~/assets/photos/user.png")}
              style={{
                width: 47,
                height: 47,
                aspectRatio: 1,
                borderRadius: 50,
              }}
            />
          )}
        </TouchableOpacity>
        <View style={{ flexDirection: "column", gap: 2 }}>
          <Text style={{ fontSize: 16, color: theme.text }}>
            {post.user.username || "new user"}
          </Text>
          {post.caption && (
            <View>
              <Text
                style={{
                  fontWeight: "semibold",
                  fontSize: 16,
                  color: theme.text,
                }}
              >
                {post.caption}
              </Text>
            </View>
          )}
        </View>
      </View>

      <PostContent post={post} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 6,
        }}
      >
        <View style={{ flexDirection: "row", marginLeft: 10, gap: 7 }}>
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
            color={isLiked ? "crimson" : theme.text}
          />
          <TouchableOpacity
            onPress={() => {
              setPostId(post.id);
              commentByPostId();
              openSheet();
            }}
          >
            <Ionicons name="chatbubble-outline" size={20} color={theme.text} />
          </TouchableOpacity>
          <Feather name="send" size={20} color={theme.text} />
        </View>

        <Feather
          name="bookmark"
          size={20}
          style={{ marginRight: 10 }}
          color={theme.text}
        />
      </View>

      <View
        style={{ flexDirection: "row", marginTop: 5, gap: 1, marginBottom: 10 }}
      >
        <Text
          style={{ fontWeight: "semibold", marginLeft: 7, color: theme.text }}
        >
          Likes {likeCountRef.current || 0}
        </Text>
        <Text
          style={{ fontWeight: "semibold", marginLeft: 7, color: theme.text }}
        >
          Comments {commentCount?.toString()}
        </Text>
      </View>
    </View>
  );
}
