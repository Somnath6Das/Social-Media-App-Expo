export const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  primary: "#007AFF",
};

export const darkTheme = {
  background: "#454545",
  text: "#ffffff",
  primary: "#0A84FF",
};

export const getTheme = (colorScheme: "light" | "dark") => {
  return colorScheme === "light" ? lightTheme : darkTheme;
};
