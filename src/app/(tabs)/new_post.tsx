import { useEffect, useState } from "react";
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "~/src/components/CustomButton";
import { uploadImage } from "~/src/lib/cloudinary";
import { useRouter } from "expo-router";
import { supabase } from "~/src/lib/superbase";
import { useAuth } from "~/src/global/useAuth";
import { AuthContextType } from "~/src/types";
import { useVideoPlayer, VideoView } from "expo-video";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "~/src/components/InputField";
import { useTheme } from "~/src/theme/ThemeProvider";

export default function NewPost() {
  const router = useRouter();
  const { auth, updateAuth } = useAuth() as AuthContextType;
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState<string | null>("");
  const theme = useTheme();
  const [mediaType, setMediaType] = useState<
    "video" | "image" | "livePhoto" | "pairedVideo" | undefined
  >();
  const player = useVideoPlayer(media || "", (player) => {
    player.loop = false;
    // player.play();
  });

  useEffect(() => {
    if (!media) {
      pickMedia();
    }
  }, [media]);

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5, // cloudinary free plan limit 1mb of any file
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
      setMediaType(result.assets[0].type);
    }
  };

  const createPost = async () => {
    setLoading(true);
    let response;
    if (media) {
      response = await uploadImage(media);
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          caption,
          image: response?.public_id,
          user_id: auth.session?.user.id,
          media_type: mediaType,
        },
      ])
      .select();
    setLoading(false);
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        padding: 2,
        backgroundColor: theme.background,
      }}
    >
      {!media ? (
        <View
          style={{
            width: 150,
            aspectRatio: 3 / 4,
            borderRadius: 10,
            backgroundColor: theme.content,
          }}
        />
      ) : mediaType === "image" ? (
        <Image
          source={{ uri: media }}
          style={{
            width: 150,
            aspectRatio: 3 / 4,
            borderRadius: 10,
            backgroundColor: "#bababa",
          }}
        />
      ) : (
        <VideoView
          style={{ width: "100%", aspectRatio: 16 / 9 }}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      )}
      <TouchableOpacity onPress={pickMedia}>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 16,
            margin: 8,
            color: theme.text,
          }}
        >
          Change
        </Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: "20%",
          width: "100%",
          alignItems: "center",
          gap: 16,
        }}
      >
        <InputField
          title="Caption"
          placeholder="What is on your mind ?"
          value={caption}
          handleChangeText={(e) => {
            setCaption(e);
          }}
          keyboardType="default"
        />

        <CustomButton title="Share" onPress={createPost} loading={loading} />
      </View>
    </SafeAreaView>
  );
}
