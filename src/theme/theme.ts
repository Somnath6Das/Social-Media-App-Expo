export const lightTheme = {
  background: "#ffffff",
  content: "#e5e5e5",
  text: "#000000",
  primary: "#009cf5",
  cardback: "#dcdcdd",
  cardfore: "white",
};

export const darkTheme = {
  background: "#212121",
  content: "#525252",
  text: "#ffffff",
  primary: "#38b6fe",
  cardback: "#343434",
  cardfore: "#212121",
};

export const getTheme = (colorScheme: "light" | "dark") => {
  return colorScheme === "light" ? lightTheme : darkTheme;
};
