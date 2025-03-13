import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "~/src/components/InputField";

export default function SetPassword() {
  const [pass, setPass] = useState({
    passWord: "",
    confirmPassword: "",
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ width: "100%", alignItems: "center", gap: 90 }}>
          <InputField
            title="Password"
            value={pass.passWord}
            placeholder="******"
            handleChangeText={(e) => setPass({ ...pass, passWord: e })}
            keyboardType="default"
          />
          <InputField
            title="Password"
            value={pass.confirmPassword}
            placeholder="******"
            handleChangeText={(e) => setPass({ ...pass, confirmPassword: e })}
            keyboardType="default"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
