export const lightTheme = {
  background: "#ffffff",
  content: "#e5e5e5",
  text: "#000000",
  primary: "#1e71f9",
};

export const darkTheme = {
  background: "#353535",
  content: "#525252",
  text: "#ffffff",
  primary: "#3d86ff",
};

export const getTheme = (colorScheme: "light" | "dark") => {
  return colorScheme === "light" ? lightTheme : darkTheme;
};
