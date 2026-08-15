import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import AppInput from "../../components/input";
import { useAuth } from "./hooks/useAuth";
import { useAuthStore } from "./store/auth.store";
import { removeToken } from "@/shared/storage/secure";
import { removeUserLocal } from "@/shared/storage/async";

const LoginForm = ({ onSessionReset }: { onSessionReset?: () => void }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetting, setResetting] = useState(false);
  const { logIn, loading } = useAuth();
  const { clearUser } = useAuthStore();

  const handleResetEnv = async () => {
    setResetting(true);
    setError("");
    try {
      await removeToken();
      await removeUserLocal();
      clearUser();
      setEmail("");
      setPassword("");
      if (onSessionReset) {
        onSessionReset();
      } else {
        router.replace("/auth");
      }
    } catch (e: any) {
      setError(`Reset failed: ${e?.message || "unknown error"}`);
    } finally {
      setResetting(false);
    }
  };

  const handleLogin = async () => {
    setError("");
    try {
      const user = await logIn({ email, password });
      if (user) {
        router.replace("/(tabs)/home");
      } else {
        setError("Invalid credentials");
      }
    } catch (e: any) {
      // Show the REAL error instead of generic message
      const msg =
        e?.response?.data?.message ||
        e?.response?.status ||
        e?.message ||
        JSON.stringify(e);
      setError(`Error: ${msg}`);
    }
  };

  return (
    <View
      className=" p-4 rounded-3xl border border-black/20"
      style={{ width: "95%", alignSelf: "center", backgroundColor: "black" }}
    >
      <Text className="text-white text-lg font-semibold text-center mb-6">
        Staff Login
      </Text>


      <AppInput
        label="Employee Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@vintageBar.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        inputTextClassName="text-lg"
        labelClassName="text-lg"
      />


      <AppInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="********"
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        containerClassName="mb-8"
        inputTextClassName="text-lg"
        labelClassName="text-lg"
        rightIcon={
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="rgba(255,255,255,0.7)"
          />
        }
        onRightIconPress={() => setShowPassword((prev) => !prev)}
      />


      {error ? (
        <Text className="text-red-500 text-center mb-2">{error}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.85}
        className="bg-yellow rounded-lg py-3 items-center mb-8"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-xl">
            Login
          </Text>
        )}
      </TouchableOpacity>

      <Text className="text-white text-xs text-center" >
        Secure access to Vintage Bar POS
      </Text>

      <TouchableOpacity
        onPress={handleResetEnv}
        activeOpacity={0.85}
        className="mt-4 border border-gray-700 rounded-lg py-2 items-center"
        disabled={resetting}
      >
        {resetting ? (
          <ActivityIndicator color="rgba(255,255,255,0.7)" size="small" />
        ) : (
          <Text className="text-gray-400 text-xs font-semibold">
            Reset Env
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;