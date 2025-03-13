import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "~/src/components/InputField";

export default function Home() {
  const [form, setForm] = useState({
    email: "",
    password: "",
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
