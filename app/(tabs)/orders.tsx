import PageHeader from '@/components/Header/PageHeader';
import ScreenHeader from '@/components/Header/ScreenHeader';
import OrderModule from '@/modules/orders/ordersScreen';
import IonIcons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Orders() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <PageHeader />

      <ScreenHeader title="Orders" />

      <OrderModule />
    </SafeAreaView>
  )
}