import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { KeyboardTypeOptions } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

type FormField = {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  keyboardType: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
};

const InputField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
}: FormField) => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  return (
    <View
      style={{
        width: "90%",
        gap: 7,
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 18,
        }}
      >
        {title}
      </Text>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 64,
          justifyContent: "space-between",
          paddingHorizontal: 16,
          backgroundColor: theme.background,
          borderColor: theme.primary,
          borderWidth: 3,
          paddingVertical: 10,
          borderRadius: 10,
        }}
      >
        <TextInput
          style={{
            color: theme.text,
            textAlignVertical: "center",
            fontSize: 18,
            height: 35,
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={theme.text}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />

        {title === "Password" && (
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={
                !showPassword
                  ? require("~/assets/photos/eye.png")
                  : require("~/assets/photos/eye-hide.png")
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;
