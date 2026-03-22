import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import AppInput from "../../components/input";
import { useAuth } from "./hooks/useAuth";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { logIn, loading } = useAuth();

  const handleLogin = async () => {
    setError("");
    try {
      const user = await logIn({ email, password });
      if (user) {
        router.replace("/(tabs)/home");
      } else {
        setError("Invalid credentials");
      }
    } catch (e) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <View
      className=" p-6 rounded-3xl border border-black/20"
      style={{ width: "90%", alignSelf: "center", backgroundColor:"black" }}
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
      />


      <AppInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="********"
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        containerClassName="mb-8"
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
    </View>
  );
};

export default LoginForm;