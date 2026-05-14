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
    // console.log('[LoginForm] handleLogin called');
    // console.log('[LoginForm] Email:', email);

    setError("");
    try {
      // console.log('[LoginForm] Attempting to log in with email:', email);
      const user = await logIn({ email, password });
      // console.log('[LoginForm] Login response received:', user);
      
      if (user) {
        // console.log('[LoginForm] Login successful, user:', user);
        router.replace("/(tabs)/home");
      } else {
        // console.warn('[LoginForm] Login failed: Invalid credentials');
        setError("Invalid credentials");
      }
    } catch (e: any) {
      // console.error('[LoginForm] Login error caught:', e);
      // Show the REAL error instead of generic message
      const msg =
        e?.response?.data?.message ||
        e?.response?.status ||
        e?.message ||
        JSON.stringify(e);
      // console.error('[LoginForm] Error message:', msg);
      setError(`Error: ${msg}`);
    }
  };

  return (
    <View
      className=" p-6 rounded-3xl border border-black/20"
      style={{ width: "90%", alignSelf: "center", backgroundColor: "black" }}
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
    </View>
  );
};

export default LoginForm;