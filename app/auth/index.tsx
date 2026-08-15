import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginForm from '../../modules/auth/LoginForm';
import SetupForm from '../../modules/auth/SetupForm';
import { getSavedApiBaseUrl } from '@/shared/api/config';

export default function Auth() {
  const [needsSetup, setNeedsSetup] = useState<boolean | null>(null);

  useEffect(() => {
    getSavedApiBaseUrl().then((url) => {
      setNeedsSetup(!url);
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className="flex-1 ">
        <View className="absolute inset-0">
          {/* Background Image with blur and overlay */}
          <ImageBackground
            source={require("../../assets/images/restaurant-img.jpg")}
            className='flex-1'
            resizeMode="cover"
          >
         
            <View className='absolute inset-0 bg-black/70' />
          </ImageBackground>
        </View>
        {/* Foreground content above blur/overlay */}
        <ScrollView
          className="z-10"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 8 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo and Name */}
          <View className="items-center mb-8">
            <Image
              source={require("../../assets/images/logo.png")}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/10 p-2"
              resizeMode="contain"
            />
            <Text className="text-white text-3xl font-bold mt-2">Vintage Bar</Text>
            <Text className="text-gray-300 text-lg">Management System</Text>
          </View>
          {needsSetup === null ? null : needsSetup ? (
            <SetupForm onSetupComplete={() => setNeedsSetup(false)} />
          ) : (
            <LoginForm onSessionReset={() => setNeedsSetup(true)} />
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}