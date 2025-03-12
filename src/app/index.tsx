import { Button, Text, View } from "react-native";
import { useThemeStore } from "../theme/themeStore";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";

export default function Home() {
  const theme = useTheme();
  const { setTheme } = useThemeStore();
  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <Text style={{ color: theme.text }}>Current Theme</Text>
      <Button
        title="Light"
        onPress={() => setTheme("light")}
        color={theme.primary}
      />
      <Button
        title="Dark"
        onPress={() => setTheme("dark")}
        color={theme.primary}
      />
      <Button
        title="System"
        onPress={() => setTheme("system")}
        color={theme.primary}
      />
    </SafeAreaView>
  );
}
