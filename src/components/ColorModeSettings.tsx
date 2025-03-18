import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import Switch from "expo-dark-mode-switch";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

export default function ColorModeSettings() {
  const [value, setValue] = useState(true);
  return (
    <View style={{ margin: 12 }}>
      <TouchableOpacity
        onPress={() => setValue((prevValue) => !prevValue)}
        style={{
          flexDirection: "row",
        }}
      >
        <Switch
          value={value}
          onChange={(value) => setValue(value)}
          style={{}}
        />
        <Text
          style={{
            fontSize: 20,
            alignSelf: "center",
            marginLeft: 16,
          }}
        >
          Dark Mode
        </Text>
      </TouchableOpacity>
      <Pressable
        style={{
          marginTop: 16,
          flexDirection: "row",
          gap: 36,
          justifyContent: "flex-start",
          borderRadius: 16,
          width: "100%",
          height: 40,
          backgroundColor: "#e5e5e5",
        }}
      >
        <Entypo
          name="ccw"
          size={30}
          style={{ alignSelf: "center", marginLeft: 18 }}
          color="#666379"
        />
        <Text style={{ fontSize: 20, alignSelf: "center" }}>System Mode</Text>
      </Pressable>
    </View>
  );
}
