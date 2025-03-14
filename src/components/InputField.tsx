import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { KeyboardTypeOptions } from "react-native";

type FormField = {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  keyboardType: KeyboardTypeOptions;
};

const InputField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  keyboardType,
}: FormField) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={{
        height: 20,
        width: "90%",
        gap: 7,
      }}
    >
      <Text
        style={{
          color: "black",
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
          backgroundColor: "#ffffff",
          borderColor: "#FFC300",
          borderWidth: 3,
          paddingVertical: 10,
          borderRadius: 10,
        }}
      >
        <TextInput
          style={{
            color: "black",
            textAlignVertical: "center",
            fontSize: 18,
            height: 35,
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
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
