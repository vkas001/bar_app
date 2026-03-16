import Greetings from '@/components/Header/greetings';
import PageHeader from '@/components/Header/PageHeader';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function home() {
  return (
    <SafeAreaView className='flex-1 bg-black'>

      <PageHeader />
      
      <Greetings />
      <View className='mx-4 border-b border-[#2a2a2a] my-2' />

      <ScrollView>

      </ScrollView>

    </SafeAreaView>
  )
}