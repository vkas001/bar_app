import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <BlurView
      intensity={80}
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
      className="w-[90%] bg-white/10 p-6 rounded-3xl border border-white/20"
    >
      <Text className="text-white/75 text-lg font-semibold text-center mb-6">
        Staff Login
      </Text>

      <View className="mb-6">
        <Text className="text-white/60 text-xs mb-3">
          Employee Email
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@vintageBar.com"
          placeholderTextColor="rgba(255,255,255,0.35)"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          className="bg-white/10 text-white/85 text-sm px-4 py-3 rounded-xl border border-white/20"
        />
      </View>

      <View className="mb-6">
        <Text className="text-white/60 text-xs mb-3">
          Password
        </Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          placeholderTextColor="rgba(255,255,255,0.35)"
          secureTextEntry
          autoCapitalize="none"
          className="bg-white/10 text-white/85 text-sm px-4 py-3 rounded-xl border border-white/20"
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        className="bg-yellow rounded-xl py-3 items-center mb-6"
      >
        <Text className="text-black/70 font-semibold text-sm">
          Login
        </Text>
      </TouchableOpacity>

      <Text className="text-white/55 text-xs text-center" >
        Secure access to Vintage Bar POS
      </Text>
    </BlurView>
  );
};

export default LoginForm;