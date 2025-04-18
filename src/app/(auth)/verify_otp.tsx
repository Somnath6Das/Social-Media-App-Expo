import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtpInput } from "react-native-otp-entry";
import CustomButton from "~/src/components/CustomButton";
import { EmailType } from "~/src/types";
import { useEmail } from "~/src/global/useEmail";
import { router } from "expo-router";
import { useState } from "react";
import { useTheme } from "~/src/theme/ThemeProvider";

export default function VerifyOtp() {
  const { otp, setOtp } = useEmail() as EmailType;
  const theme = useTheme();
  const otpVerify = () => {
    if (otp.length === 6) {
      router.push("/set_password");
    } else {
      Alert.alert("Please put the 6 charcters otp.");
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
            marginBottom: 40,
          }}
        />
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={{ fontSize: 19, marginBottom: 14, color: theme.text }}>
            Put your otp here.
          </Text>
          <OtpInput
            focusColor={theme.primary}
            type="numeric"
            numberOfDigits={6}
            onTextChange={(text) => setOtp(text)}
            autoFocus={true}
            theme={{
              containerStyle: {
                justifyContent: "center",
                gap: 8,
                alignItems: "center",
                height: 10,
                width: 10,
                marginVertical: 40,
              },
              pinCodeTextStyle: { color: theme.primary },
              focusStickStyle: { borderColor: theme.primary },
              pinCodeContainerStyle: { backgroundColor: theme.cardback },
            }}
          />
          <CustomButton title="Sign up" onPress={() => otpVerify()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
