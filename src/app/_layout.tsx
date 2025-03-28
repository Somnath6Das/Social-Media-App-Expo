import { Stack } from "expo-router";
import { ThemeProvider } from "../theme/ThemeProvider";
import { useTheme } from "../theme/ThemeProvider";
import { ActivityIndicator, Alert, AppState, View } from "react-native";
import { supabase } from "../lib/superbase";
import { useEffect, useRef } from "react";
import { useAuth } from "../global/useAuth";
import { AuthContextType } from "../types";
import NetworkAware from "../components/networkAware";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function RootLayout() {
  const isMounted = useRef(false);
  const theme = useTheme();
  const { auth, updateAuth } = useAuth() as AuthContextType;

  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
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
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
  if (!auth.isReady) {
    return (
      <NetworkAware>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#ecaf0a" />
        </View>
      </NetworkAware>
    );
  }

  return (
    <NetworkAware>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: theme.background,
            },
          }}
        >
          <Stack.Screen
            name="profile_modal"
            options={{
              presentation: "transparentModal",
              animation: "fade",
              headerShown: false,
            }}
          />
          <Stack.Screen name="index" />
        </Stack>
      </ThemeProvider>
    </NetworkAware>
  );
}
