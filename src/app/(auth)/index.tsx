import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/src/theme/ThemeProvider";

export default function Login() {
  const theme = useTheme();
  return <SafeAreaView style={{ flex: 1 }}></SafeAreaView>;
}
