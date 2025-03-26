import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useRef, useState } from "react";
import CustomButton from "~/src/components/CustomButton";
import { supabase } from "~/src/lib/superbase";
import { useAuth } from "~/src/global/useAuth";
import { AuthContextType } from "~/src/types";
import { cld, uploadImage } from "~/src/lib/cloudinary";
import InputField from "~/src/components/InputField";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "cloudinary-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import BottomSheetComponent from "~/src/components/BottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import ColorModeSettings from "~/src/components/ColorModeSettings";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/src/theme/ThemeProvider";

export default function Profile() {
  const isMounted = useRef(false);
  const { auth, updateAuth } = useAuth() as AuthContextType;
  const [image, setImage] = useState<string | undefined>("");
  const [remoteImage, setRemoteImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useTheme();
  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  useEffect(() => {
    isMounted.current = true;
    getProfile();
    return () => {
      isMounted.current = false;
    };
  }, []);

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
    // console.log(JSON.stringify(currentUser, null, 2));

    // console.log(data);
    setUsername(data.username);
    setBio(data.bio);
    setRemoteImage(data.avatar_url);
  };

  const updateProfile = async () => {
    if (!auth.user?.id) {
      return;
    }

    const updatedProfile = {
      id: auth.user.id,
      username,
      bio,
      avatar_url: "",
    };
    setLoading(true);
    if (image) {
      const response = await uploadImage(image);
      updatedProfile.avatar_url = response.public_id;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(updatedProfile)
      .eq("id", auth.user.id);

    setLoading(false);

    if (error) {
      Alert.alert("Failed to update profile");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  let remoteCldImage;
  if (remoteImage) {
    remoteCldImage = cld.image(remoteImage);
    remoteCldImage.resize(thumbnail().width(300).height(300));
  }
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <TouchableOpacity
        onPress={openSheet}
        style={{ alignItems: "flex-end", marginRight: 15, marginTop: 15 }}
      >
        <Ionicons name="settings-sharp" size={26} color={theme.text} />
      </TouchableOpacity>
      <View style={styles.container}>
        {image ? (
          // local picked image
          <Image
            source={{ uri: image }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 104,
              backgroundColor: theme.content,
              borderColor: theme.text,
              borderWidth: 4,
            }}
          />
        ) : remoteCldImage ? (
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
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 104,
              backgroundColor: "#CBD5E1",
              borderColor: theme.primary,
              borderWidth: 3,
              alignSelf: "center",
            }}
          />
        )}
        <TouchableOpacity onPress={pickImage}>
          <Text
            style={{
              color: theme.text, // text-blue-500
              fontWeight: "600",
              marginVertical: 10,
              fontSize: 16,
            }}
          >
            Change
          </Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <InputField
            title="Username"
            placeholder="Username"
            value={username}
            handleChangeText={(e) => {
              setUsername(e);
            }}
            keyboardType="default"
          />
          <InputField
            title="Bio"
            placeholder="Bio"
            value={bio}
            handleChangeText={(e) => {
              setBio(e);
            }}
            keyboardType="default"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Update profile"
            onPress={updateProfile}
            loading={loading}
          />
        </View>
      </View>
      <BottomSheetComponent
        bottomSheetRef={bottomSheetRef}
        ViewModel={<ColorModeSettings />}
        minIndex="25%"
        maxIndex="50%"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "10%",
  },
  inputContainer: {
    alignItems: "center",
    marginTop: "10%",
    width: "90%",
    gap: 15,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 30,
    width: "90%",
  },
});
