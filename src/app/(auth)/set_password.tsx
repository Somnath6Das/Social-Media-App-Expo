import { useState } from "react";
import { Alert, Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "~/src/components/CustomButton";
import InputField from "~/src/components/InputField";
import { useEmail } from "~/src/global/useEmail";
import { supabase } from "~/src/lib/superbase";
import { EmailType } from "~/src/types";

export default function SetPassword() {
  const { email, otp } = useEmail() as EmailType;
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState({
    passWord: "",
    confirmPassword: "",
  });
  const setPassword = async () => {
    if (!pass.passWord && !pass.confirmPassword) {
      Alert.alert("Please set Password and Corfirm!");
      return;
    }
    if (pass.passWord !== pass.confirmPassword) {
      Alert.alert("Password and corfirm is not match!");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      Alert.alert(error?.message);
      return;
    }
    const { error: updateError } = await supabase.auth.updateUser({
      password: pass.passWord,
    });
    setLoading(false);
    if (updateError) {
      setLoading(false);
      Alert.alert(updateError?.message);
      return;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("~/assets/photos/social-media.png")}
          resizeMode="contain"
          style={{
            alignSelf: "center",
            width: 120,
            height: 120,
            marginBottom: 35,
          }}
        />
        <View style={{ width: "100%", alignItems: "center", gap: 10 }}>
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
          <CustomButton
            loading={loading}
            title="Sign up"
            onPress={setPassword}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
