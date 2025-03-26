import {
  Button,
  Pressable,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useThemeStore } from "../theme/themeStore";
import { useTheme } from "../theme/ThemeProvider";
import { darkTheme, lightTheme } from "../theme/theme";

export default function ColorModeSettings() {
  const theme = useTheme();
  const { setTheme } = useThemeStore();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    setTheme(isDarkTheme ? "light" : "dark");
  };

  return (
    <View style={{ margin: 12 }}>
      <TouchableOpacity
        onPress={() => setIsDarkTheme((prevValue) => !prevValue)}
        style={{
          flexDirection: "row",
        }}
      >
        <Switch
          trackColor={{ false: "#767577", true: "#f4f3f4" }}
          thumbColor={isDarkTheme ? "#767577" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkTheme}
        />
        <Text
          style={{
            fontSize: 20,
            alignSelf: "center",
            marginLeft: 16,
            color: theme.text,
          }}
        >
          {isDarkTheme ? "Dark Mode" : "Light Mode"}
        </Text>
      </TouchableOpacity>
      <Pressable
        onPress={() => setTheme("system")}
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
