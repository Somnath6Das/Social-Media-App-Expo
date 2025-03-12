import { create } from "zustand";
import { Appearance } from "react-native";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  colorScheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system", // Default theme
      colorScheme: Appearance.getColorScheme() || "light", // Initial system scheme
      setTheme: (theme: Theme) => {
        const systemColorScheme = Appearance.getColorScheme() || "light";
        const newColorScheme = theme === "system" ? systemColorScheme : theme;
        set({ theme, colorScheme: newColorScheme });
      },
    }),
    {
      name: "theme-storage", // Storage key
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
// Listen to system theme changes
Appearance.addChangeListener(({ colorScheme }) => {
  const { theme, setTheme } = useThemeStore.getState();
  if (theme === "system" && colorScheme) {
    useThemeStore.setState({ colorScheme });
  }
});
