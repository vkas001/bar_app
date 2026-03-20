import Greetings from '@/components/Header/greetings';
import PageHeader from '@/components/Header/PageHeader';
import { useScreenRefresh } from '@/components/refresh/refresh';
import React from 'react';
import { RefreshControl, ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarTabScreen from '@/modules/barTabs/barTabScreen';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '@/modules/home/homeScreen';

export default function home() {
  const { refreshing, onRefresh } = useScreenRefresh()

  return (
    <SafeAreaView className='flex-1 bg-black'>

      <PageHeader />

      <Greetings />
      <View className='mx-4 border-b border-[#2a2a2a] my-2' />

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <HomeScreen />
      </ScrollView>

    </SafeAreaView>
  )
}