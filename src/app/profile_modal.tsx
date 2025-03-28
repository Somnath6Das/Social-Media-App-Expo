import { Link, router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../lib/superbase";
import { useEffect, useRef, useState } from "react";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "../lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

export default function Modal() {
  const isPresented = router.canGoBack();
  const theme = useTheme();

  const params = useLocalSearchParams();
  const postId = params.postId ?? null;
  const userId = params.userId ?? null;

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const username = useRef("");
  const getProfile = async () => {
    let { data, error } = await supabase
      .from("posts")
      .select("*, profiles(*)")
      .eq("id", postId);
    if (data && data.length > 0) {
      setAvatarUrl(data[0].profiles.avatar_url);
      username.current = data[0].profiles.username;
      console.log(username.current);
    }
  };

  const getUser = async () => {
    let { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);
    if (data && data.length > 0) {
      setAvatarUrl(data[0].avatar_url);
      username.current = data[0].username;
      console.log(username.current);
    }
  };
  // console.log(JSON.stringify(data, null, 2));
  useEffect(() => {
    if (postId) {
      getProfile();
    }
    if (userId) {
      getUser();
    }
  }, []);
  if (!avatarUrl) {
    return;
  }
  let remoteCldImage = cld.image(avatarUrl);
  remoteCldImage.resize(thumbnail().width(300).height(300));

  return (
    <View style={styles.container}>
      {isPresented && (
        <Link style={{ color: theme.text }} href="../">
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Link>
      )}
      <View style={{ flex: 1, alignItems: "center", marginTop: "10%" }}>
        {postId || userId ? (
          <AdvancedImage
            cldImg={remoteCldImage}
            style={{
              width: 150,
              height: 150,
              borderRadius: 104,
              backgroundColor: theme.content,
              borderColor: theme.text,
              borderWidth: 4,
            }}
          />
        ) : (
          <Image
            source={require("~/assets/photos/user.png")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 104,
              backgroundColor: theme.content,
              borderColor: theme.text,
              borderWidth: 4,
            }}
          />
        )}
      </View>
      <View style={{ marginTop: 10, alignItems: "center" }}>
        <Text style={{ color: theme.text }}>{username.current}</Text>
        {/* <Text style={{ color: theme.text }}>{userData.bio}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
