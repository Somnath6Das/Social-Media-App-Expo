import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "~/src/global/useAuth";
import { useTheme } from "~/src/theme/ThemeProvider";
import { AuthContextType } from "~/src/types";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function Layout() {
  const theme = useTheme();
  const { auth, updateAuth } = useAuth() as AuthContextType;
  if (auth.isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <GestureHandlerRootView>
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
      <StatusBar
        backgroundColor={theme.background}
        style={theme.background === "#212121" ? "light" : "dark"}
      />
    </GestureHandlerRootView>
  );
}
