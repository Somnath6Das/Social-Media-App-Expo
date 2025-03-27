import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../lib/superbase";
import { useEffect } from "react";

export default function Modal() {
  const isPresented = router.canGoBack();
  const { postId } = useLocalSearchParams();
  const theme = useTheme();

  const getProfile = async () => {
    let { data, error } = await supabase
      .from("posts")
      .select("*, profiles(*)")
      .eq("id", postId);
    console.log(JSON.stringify(data, null, 2));
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <View style={styles.container}>
      {isPresented && (
        <Link style={{ color: theme.text }} href="../">
          <Ionicons name="arrow-back" size={24} color={theme.text} />
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
