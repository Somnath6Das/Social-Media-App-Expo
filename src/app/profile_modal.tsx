import { Link, router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../lib/superbase";
import { useEffect, useRef, useState } from "react";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "../lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
} from "react-native-reanimated";

export default function Modal() {
  const isPresented = router.canGoBack();
  const theme = useTheme();
  const isMounted = useRef(false);
  const params = useLocalSearchParams();
  const postId = params.postId ?? null;
  const userId = params.userId ?? null;

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [user, setUser] = useState({
    name: "",
    bio: "",
  });

  const getProfile = async () => {
    let { data, error } = await supabase
      .from("posts")
      .select("*, profiles(*)")
      .eq("id", postId);
    if (data && data.length > 0) {
      setAvatarUrl(data[0].profiles.avatar_url);
      setUser({
        ...user,
        name: data[0].profiles.username,
        bio: data[0].profiles.bio,
      });
    }
  };

  const getUser = async () => {
    let { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);
    if (data && data.length > 0) {
      setAvatarUrl(data[0].avatar_url);

      setUser({
        ...user,
        name: data[0].username,
        bio: data[0].bio,
      });
    }
  };
  // console.log(JSON.stringify(data, null, 2));
  useEffect(() => {
    isMounted.current = true;
    if (postId) {
      getProfile();
    }
    if (userId) {
      getUser();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
  if (!avatarUrl) {
    return;
  }
  let remoteCldImage = cld.image(avatarUrl);
  remoteCldImage.resize(thumbnail().width(300).height(300));

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.cardback,
      }}
    >
      <Link href={"../"} asChild>
        <Pressable style={StyleSheet.absoluteFill} />
      </Link>
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={{
          width: "90%",
          height: "80%",

          backgroundColor: theme.cardfore,
        }}
      >
        {isPresented && (
          <Link
            style={{ color: theme.text, marginLeft: 10, marginTop: 10 }}
            href="../"
          >
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </Link>
        )}
        <View style={{ alignItems: "center", marginTop: "10%" }}>
          {postId || userId ? (
            <AdvancedImage
              cldImg={remoteCldImage}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
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
                borderRadius: 100,
                backgroundColor: theme.content,
                borderColor: theme.text,
                borderWidth: 4,
              }}
            />
          )}
        </View>
        <View
          style={{
            marginTop: "8%",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{ color: theme.text, fontSize: 28 }}>{user.name}</Text>
          <Text style={{ color: theme.text, fontSize: 18 }}>{user.bio}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}
