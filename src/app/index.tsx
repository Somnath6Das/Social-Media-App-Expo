import { Button, View } from "react-native";
import { useThemeStore } from "../global/theme";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  const { theme, toggleTheme } = useThemeStore() as any;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Toggle Theme" onPress={toggleTheme} />
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </View>
  );
}
