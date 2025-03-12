import { Stack } from "expo-router";
import { useThemeStore } from "./../global/theme";

export default function Layout() {
  const { theme } = useThemeStore();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme === "dark" ? "black" : "white",
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
