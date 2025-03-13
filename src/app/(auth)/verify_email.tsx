import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "~/src/components/CustomButton";
import InputField from "~/src/components/InputField";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
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
            value={email}
            placeholder="example@email.com"
            handleChangeText={(e) => setEmail(e)}
            keyboardType="email-address"
          />
          <CustomButton title="Sign up" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
