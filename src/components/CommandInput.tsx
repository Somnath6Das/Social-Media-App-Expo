import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../global/useAuth";
import { AuthContextType } from "../types";
import { supabase } from "../lib/superbase";
import { cld } from "../lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "cloudinary-react-native";

export default function CommandInput() {
  const [text, onChangeText] = useState("");
  const { auth, updateAuth } = useAuth() as AuthContextType;
  const [avatar, setAvatar] = useState("");

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
    setAvatar(data.avatar_url);
    console.log(JSON.stringify(data, null, 2));
  };
  useEffect(() => {
    getProfile();
  }, []);

  let remoteCldImage = cld.image(avatar);
  remoteCldImage.resize(thumbnail().width(300).height(300));

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
      <TouchableOpacity style={{ marginLeft: "auto" }}>
        <Ionicons name="send" size={20} color="#755fff" />
      </TouchableOpacity>
    </View>
  );
}
