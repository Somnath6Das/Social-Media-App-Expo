import { Pressable, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
};

export default function CustomButton({ title, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#FFC300",
        marginTop: 10,
        width: "90%",
        paddingVertical: 15,
        borderRadius: 5,
      }}
    >
      <Text style={{ alignSelf: "center", fontSize: 18 }}>{title}</Text>
    </Pressable>
  );
}
