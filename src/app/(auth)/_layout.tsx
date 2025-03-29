import { Redirect, Stack } from "expo-router";
import { useAuth } from "~/src/global/useAuth";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "~/src/theme/ThemeProvider";
import { AuthContextType } from "~/src/types";

export default function Layout() {
  const theme = useTheme();
  const { auth, updateAuth } = useAuth() as AuthContextType;
  if (auth.isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
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
      <StatusBar
        backgroundColor={theme.background}
        style={theme.background === "#212121" ? "light" : "dark"}
      />
    </Stack>
  );
}
