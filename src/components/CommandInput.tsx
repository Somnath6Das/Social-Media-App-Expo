import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CommandInput() {
  const [text, onChangeText] = useState("");

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
      <Image
        source={require("~/assets/photos/user.png")}
        style={{ width: 25, height: 25, aspectRatio: 1, borderRadius: 50 }}
      />
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
