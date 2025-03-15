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
import { useEffect, useState } from "react";
import CustomButton from "~/src/components/CustomButton";
import { supabase } from "~/src/lib/superbase";
import { useAuth } from "~/src/global/useAuth";
import { AuthContextType } from "~/src/types";
import { cld, uploadImage } from "~/src/lib/cloudinary";
import InputField from "~/src/components/InputField";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "cloudinary-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { auth, updateAuth } = useAuth() as AuthContextType;
  const [image, setImage] = useState<string | undefined>("");
  const [remoteImage, setRemoteImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProfile();
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

    if (image) {
      const response = await uploadImage(image);
      updatedProfile.avatar_url = response.public_id;
    }
    setLoading(true);
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
    <SafeAreaView style={styles.container}>
      {image ? (
        // local picked image
        <Image source={{ uri: image }} style={styles.profileImage} />
      ) : remoteCldImage ? (
        <AdvancedImage cldImg={remoteCldImage} style={styles.profileImage} />
      ) : (
        <View style={styles.profilePlaceholder} />
      )}
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.changeText}>Change</Text>
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
        <CustomButton
          title="Sign out"
          onPress={() => supabase.auth.signOut()}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 104,
    backgroundColor: "#CBD5E1", // bg-slate-300
  },
  profilePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 104,
    backgroundColor: "#CBD5E1",
    alignSelf: "center",
  },
  changeText: {
    color: "#3B82F6", // text-blue-500
    fontWeight: "600",
    marginVertical: 10,
  },
  inputContainer: {
    alignItems: "center",
    gap: 10,
    width: "90%",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: "auto",
    width: "90%",
    gap: 8,
  },
});
