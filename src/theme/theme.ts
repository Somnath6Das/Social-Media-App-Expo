export const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  primary: "#4d12ea",
};

export const darkTheme = {
  background: "#353535",

  text: "#ffffff",
  primary: "#4d12ea ",
};

export const getTheme = (colorScheme: "light" | "dark") => {
  return colorScheme === "light" ? lightTheme : darkTheme;
};
