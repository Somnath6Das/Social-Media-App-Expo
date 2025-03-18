import { Stack } from "expo-router";
import { ThemeProvider } from "../theme/ThemeProvider";
import { useTheme } from "../theme/ThemeProvider";
import { ActivityIndicator, AppState, View } from "react-native";
import { supabase } from "../lib/superbase";
import { useEffect } from "react";
import { useAuth } from "../global/useAuth";
import { AuthContextType } from "../types";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function RootLayout() {
  const theme = useTheme();
  const { auth, updateAuth } = useAuth() as AuthContextType;
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateAuth({
        session,
        isReady: true,
        user: session?.user,
        isAuthenticated: !!session?.user,
      });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      updateAuth({
        session,
        isReady: true,
        user: session?.user,
        isAuthenticated: !!session?.user,
      });
    });
  }, []);
  if (!auth.isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ecaf0a" />
      </View>
    );
  }
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
