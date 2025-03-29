import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useAuth } from "~/src/global/useAuth";
import NotificationProvider from "~/src/notification/provider";
import { useTheme } from "~/src/theme/ThemeProvider";
import { AuthContextType } from "~/src/types";

export default function Layout() {
  const theme = useTheme();
  const { auth, updateAuth } = useAuth() as AuthContextType;

  if (!auth.isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <GestureHandlerRootView>
      <NotificationProvider>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            headerTitleAlign: "center",
            headerTintColor: theme.primary,
            headerStyle: {
              elevation: 0,
              backgroundColor: theme.background,
            },
            tabBarStyle: {
              backgroundColor: theme.background,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              headerTitle: "Home",
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons
                  name="home-circle"
                  size={focused ? 30 : 25}
                  color={focused ? theme.primary : theme.text}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="new_post"
            options={{
              headerTitle: "Create Post",
              tabBarIcon: ({ color, focused }) => (
                <FontAwesome
                  name="plus-circle"
                  size={focused ? 30 : 25}
                  color={focused ? theme.primary : theme.text}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              headerTitle: "Profile",
              tabBarIcon: ({ color, focused }) => (
                <FontAwesome
                  name="user-circle-o"
                  size={focused ? 28 : 23}
                  color={focused ? theme.primary : theme.text}
                />
              ),
            }}
          />
        </Tabs>
        <StatusBar
          backgroundColor={theme.background}
          style={theme.background === "#212121" ? "light" : "dark"}
        />
      </NotificationProvider>
    </GestureHandlerRootView>
  );
}
