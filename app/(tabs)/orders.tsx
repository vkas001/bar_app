import PageHeader from '@/components/Header/PageHeader';
import { useScreenRefresh } from '@/components/refresh/refresh';
import LoadingScreen from '@/components/refresh/LoadingScreen';
import ScreenHeader from '@/components/Header/ScreenHeader';
import OrderModule from '@/modules/orders/ordersScreen';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrders } from '@/modules/orders/hook/useOrder';

export default function Orders() {
  const { refetch: refetchOrders } = useOrders();
  
  const { refreshing, onRefresh } = useScreenRefresh(async () => {
    await Promise.all([
      refetchOrders?.(),
    ]);
  });


  return (
    <SafeAreaView className="flex-1 bg-black">
      <PageHeader />

      <ScreenHeader title="Orders" />

      <OrderModule refreshing={refreshing} onRefresh={onRefresh} />

      {refreshing && <LoadingScreen />}
    </SafeAreaView>
  )
}