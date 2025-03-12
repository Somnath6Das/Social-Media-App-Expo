import { create } from "zustand";
import { useColorScheme } from "react-native";

interface ThemeStore {
  theme: "light" | "dark";
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: useColorScheme() ?? "light",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
