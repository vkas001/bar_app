import React from 'react';
import { ImageBackground, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SigninForm from './components/LoginForm';
import LoginForm from './components/LoginForm';

export default function Auth() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="absolute inset-0">

        {/* Background Image with overlay */}
        <ImageBackground
          source={require("../../assets/images/restaurant-img.jpg")}
          className='flex-1 justify-center items-center'
          resizeMode="cover"
        >

          {/* Semi-transparent overlay */}
          <View className='absolute inset-0 bg-black/70' />

          <View className='flex-1 justify-center items-center w-full'>

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
            <LoginForm />
          </View>

        </ImageBackground>
      </View>
    </SafeAreaView >
  );
}