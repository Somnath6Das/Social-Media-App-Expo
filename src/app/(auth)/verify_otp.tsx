import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtpInput } from "react-native-otp-entry";

export default function VerifyOtp() {
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
        <Text>Put your otp here.</Text>
        <OtpInput
          focusColor="#6ba6fa"
          type="numeric"
          numberOfDigits={6}
          // onTextChange={(text) => setOtp(text)}
          autoFocus={true}
          theme={{ containerStyle: styles.container }}
        />
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
