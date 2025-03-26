import {
  Button,
  Pressable,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../theme/themeStore";
import { useTheme } from "../theme/ThemeProvider";
import { darkTheme, lightTheme } from "../theme/theme";
import { supabase } from "../lib/superbase";

export default function ColorModeSettings() {
  const theme = useTheme();
  const { setTheme } = useThemeStore();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    setTheme(isDarkTheme ? "light" : "dark");
  };

  return (
    <View
      style={{
        flex: 1,
        margin: 12,
        marginTop: 20,
        justifyContent: "space-between",
      }}
    >
      <View>
        <TouchableOpacity
          onPress={() => setIsDarkTheme((prevValue) => !prevValue)}
          style={{
            flexDirection: "row",
            width: "100%",
            height: 40,
            backgroundColor: theme.content,
            borderRadius: 16,
          }}
        >
          <Switch
            trackColor={{ false: "#767577", true: "#f4f3f4" }}
            thumbColor={isDarkTheme ? "#767577" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={isDarkTheme}
            style={{ alignSelf: "center", marginLeft: 7 }}
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

            justifyContent: "flex-start",
            borderRadius: 16,
            width: "100%",
            height: 40,
            backgroundColor: theme.content,
          }}
        >
          <Entypo
            name="ccw"
            size={30}
            style={{ alignSelf: "center", marginLeft: 18 }}
            color={theme.text}
          />
          <Text
            style={{
              fontSize: 20,
              alignSelf: "center",
              color: theme.text,
              marginLeft: 26,
            }}
          >
            System Mode
          </Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => supabase.auth.signOut()}
          style={{
            flexDirection: "row",

            justifyContent: "flex-start",
            borderRadius: 16,
            width: "100%",
            height: 40,
            backgroundColor: theme.content,
          }}
        >
          <Ionicons
            name="log-out-outline"
            size={30}
            style={{ alignSelf: "center", marginLeft: 18 }}
            color={theme.text}
          />

          <Text
            style={{
              fontSize: 20,
              alignSelf: "center",
              color: theme.text,
              marginLeft: 26,
            }}
          >
            Log out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
