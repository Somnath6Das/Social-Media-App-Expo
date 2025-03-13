import { useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "~/src/components/InputField";
import { useTheme } from "~/src/theme/ThemeProvider";

export default function Login() {
  const theme = useTheme();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <InputField
            title="Email"
            value={form.email}
            placeholder="example@email.com"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />

          <InputField
            title="Password"
            value={form.password}
            placeholder="******"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            keyboardType="default"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
