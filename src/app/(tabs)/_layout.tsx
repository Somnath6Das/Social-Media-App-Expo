import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useAuth } from "~/src/global/useAuth";
import { useTheme } from "~/src/theme/ThemeProvider";
import { AuthContextType } from "~/src/types";

export default function Layout() {
  const theme = useTheme();
  const { auth, updateAuth } = useAuth() as AuthContextType;

  if (!auth.isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        headerStyle: {
          elevation: 0,
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
              color={color}
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
              color={color}
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
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
