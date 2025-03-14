import { ActivityIndicator, Pressable, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  loading: boolean;
};

export default function CustomButton({ title, onPress, loading }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={{
        backgroundColor: "#FFC300",
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
        <Text style={{ alignSelf: "center", fontSize: 18 }}>{title}</Text>
      )}
    </Pressable>
  );
}
