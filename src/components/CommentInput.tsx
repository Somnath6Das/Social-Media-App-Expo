import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../global/useAuth";
import { AuthContextType, PostIdType } from "../types";
import { supabase } from "../lib/superbase";
import { cld } from "../lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "cloudinary-react-native";
import { usePostId } from "../global/usePostId";
import { sendCommentNotification } from "../notification/comment_notification";

export default function CommandInput() {
  const isMounted = useRef(false);
  const [text, onChangeText] = useState("");
  const { auth, updateAuth } = useAuth() as AuthContextType;
  const [avatar, setAvatar] = useState("");
  const { postId } = usePostId() as PostIdType;
  const [loading, setLoading] = useState(false);
  // console.log(JSON.stringify(postId, null, 2));

  const getProfile = async () => {
    if (!auth.user?.id) {
      return;
    }
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", auth.user.id)
      .single();
    if (error) {
      Alert.alert("Failed to fetch profile");
    }
    onChangeText("");
    setAvatar(data.avatar_url);

    // console.log(JSON.stringify(data, null, 2));
  };
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      getProfile();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  let remoteCldImage = cld.image(avatar);
  remoteCldImage.resize(thumbnail().width(300).height(300));

  const makeComment = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .insert([{ user_id: auth.user?.id, post_id: postId, comment: text }])
      .select();
    onChangeText("");
    setLoading(false);
    // console.log(JSON.stringify(error, null, 2));
    if (data) {
      sendCommentNotification(data[0]);
    }
  };

  return (
    <View
      style={{
        height: 45,
        margin: 12,
        borderWidth: 2,
        borderColor: "#755fff",
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      {avatar ? (
        <AdvancedImage
          cldImg={remoteCldImage}
          style={{ width: 25, height: 25, aspectRatio: 1, borderRadius: 50 }}
        />
      ) : (
        <Image
          source={require("~/assets/photos/user.png")}
          style={{ width: 25, height: 25, aspectRatio: 1, borderRadius: 50 }}
        />
      )}
      <TextInput
        onChangeText={onChangeText}
        placeholder="make a comment"
        value={text}
        keyboardType="default"
      />
      <TouchableOpacity
        style={{ marginLeft: "auto" }}
        onPress={makeComment}
        disabled={loading}
      >
        <Ionicons
          name="send"
          size={20}
          color={loading ? "#a9a9a9 " : "#755fff"}
        />
      </TouchableOpacity>
    </View>
  );
}
