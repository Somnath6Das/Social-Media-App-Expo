import { Stack } from "expo-router";

import { useTheme } from "~/src/theme/ThemeProvider";

export default function Layout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="verify_email" />
      <Stack.Screen name="verify_otp" />
      <Stack.Screen name="set_password" />
    </Stack>
  );
}
