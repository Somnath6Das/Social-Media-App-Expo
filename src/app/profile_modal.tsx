import { Link, router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";

export default function Modal() {
  const isPresented = router.canGoBack();
  const { postId } = useLocalSearchParams();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {isPresented && (
        <Link style={{ color: theme.text }} href="../">
          <Ionicons name="arrow-back" size={24} color="black" />
        </Link>
      )}
      <Text style={{ color: theme.text }}>{postId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
