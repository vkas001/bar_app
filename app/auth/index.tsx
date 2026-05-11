import ApiSetup from '@/components/apiSetup';
import { hasApiBeenSetup } from '@/shared/storage/async';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginForm from '../../modules/auth/LoginForm';

type SetUp = "loading" | "apiSetup" | "login";

export default function Auth() {
  const [setUp, setSetUp] = useState<SetUp>("loading");

  useEffect(() => {
    // On every app launch, check if the API URL has already been saved
    hasApiBeenSetup().then((ready) => {
      setSetUp(ready ? 'login' : 'apiSetup');
    });
  }, []);

  const resetApiConfig = async () => {
    await AsyncStorage.removeItem('app_api_config');
    setSetUp('apiSetup');
  };

  return (
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
      <View className='flex-1 justify-center p-6 z-10'>
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

        {/* Conditional rendering based on setup state */}

        {setUp === 'loading' && (
          <ActivityIndicator size="large" color="#fff" />
        )}

        {setUp === 'apiSetup' && (
          <ApiSetup onApiSaved={() => setSetUp('login')} />
        )}

        {setUp === 'login' && (
          <LoginForm />
        )}

        {setUp === 'login' && (
          <TouchableOpacity 
            onPress={resetApiConfig} 
            className="absolute bottom-6 left-6 px-3 py-2 bg-gray-700 rounded"
          >
            <Text className="text-gray-300 text-xs">Reset API</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView >
  );
}