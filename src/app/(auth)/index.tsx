import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "~/src/components/CustomButton";
import InputField from "~/src/components/InputField";
import { useAuth } from "~/src/global/useAuth";
import { supabase } from "~/src/lib/superbase";
import { AuthContextType } from "~/src/types";

export default function Home() {
  const { auth, updateAuth } = useAuth() as AuthContextType;
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorInfo, setErrorInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const signInWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    updateAuth({
      session,
      isReady: true,
      user: session?.user,
      isAuthenticated: !!session?.user,
    });
    if (!session || error)
      Alert.alert("wrong credentials! Try forget password.");
    setErrorInfo(error?.status === 400);
    setLoading(false);
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
          <CustomButton title="Sign in" onPress={() => signInWithEmail()} />
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>Don't have an account ?</Text>
          <Link
            href="/verify_email?heading=Sign up for new profile"
            style={{ fontSize: 16, color: "#ecaf0a" }}
          >
            Sign up
          </Link>
        </View>
        {errorInfo && (
          <TouchableOpacity
            style={{ alignItems: "center", marginTop: 8 }}
            onPress={() =>
              router.push(
                "/verify_email?heading=Verify email to set new password"
              )
            }
          >
            <Text style={{ fontSize: 16 }}>Forget Password ?</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
