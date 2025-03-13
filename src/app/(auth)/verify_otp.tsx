import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtpInput } from "react-native-otp-entry";
import CustomButton from "~/src/components/CustomButton";

export default function VerifyOtp() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text>Put your otp here.</Text>
          <OtpInput
            focusColor="#FFC300"
            type="numeric"
            numberOfDigits={6}
            // onTextChange={(text) => setOtp(text)}
            autoFocus={true}
            theme={{ containerStyle: styles.container }}
          />
          <CustomButton title="Sign up" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    gap: 8,
    alignItems: "center",
    height: 10,
    width: 10,
    marginVertical: 40,
  },
});
