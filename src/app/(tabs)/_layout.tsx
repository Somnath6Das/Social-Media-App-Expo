import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
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
