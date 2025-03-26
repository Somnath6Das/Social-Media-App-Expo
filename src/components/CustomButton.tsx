import { ActivityIndicator, Pressable, Text } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
};

export default function CustomButton({
  title,
  onPress,
  loading = false,
}: ButtonProps) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={{
        backgroundColor: theme.primary,
        marginTop: 10,
        width: "90%",
        paddingVertical: 15,
        borderRadius: 5,
      }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color="white"
          style={{ alignSelf: "center" }}
        />
      ) : (
        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            color: theme.text,
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
