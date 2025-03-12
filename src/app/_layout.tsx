import { Stack } from "expo-router";
import { ThemeProvider } from "../theme/ThemeProvider";
import { useTheme } from "../theme/ThemeProvider";

export default function RootLayout() {
  const theme = useTheme();
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </ThemeProvider>
  );
}
