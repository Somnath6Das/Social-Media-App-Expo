import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "~/src/components/InputField";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <InputField
          title="Email"
          value={email}
          placeholder="example@email.com"
          handleChangeText={(e) => setEmail(e)}
          keyboardType="email-address"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
