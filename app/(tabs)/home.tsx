import Greetings from '@/components/Header/greetings';
import PageHeader from '@/components/Header/PageHeader';
import LoadingScreen from '@/components/refresh/LoadingScreen';
import { useScreenRefresh } from '@/components/refresh/refresh';
import { useBarTabs } from '@/modules/barTabs/hook/useBarTabs';
import HomeScreen from '@/modules/home/homeScreen';
import { useOrders } from '@/modules/orders/hook/useOrder';
import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function home() {
  const { refetch: refetchOrders } = useOrders();
  const { refresh: refreshBarTabs } = useBarTabs();
  const { refreshing, onRefresh } = useScreenRefresh(async () => {
    await Promise.all([
      refetchOrders?.(),
      refreshBarTabs?.(),
    ]);
  });

  return (
    <SafeAreaView className='flex-1 bg-black'>

      <PageHeader />

      <Greetings />
      <View className='mx-4 border-b border-[#2a2a2a] my-2' />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <HomeScreen />
      </ScrollView>

      {refreshing && <LoadingScreen />}

    </SafeAreaView>
  )
}