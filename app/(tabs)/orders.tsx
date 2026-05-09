import PageHeader from '@/components/Header/PageHeader';
import ScreenHeader from '@/components/Header/ScreenHeader';
import LoadingScreen from '@/components/refresh/LoadingScreen';
import { useScreenRefresh } from '@/components/refresh/refresh';
import { useOrders } from '@/modules/orders/hook/useOrder';
import OrderModule from '@/modules/orders/ordersScreen';
import { useToast } from '@/shared/ui/toast';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Orders() {
  const { refetch: refetchOrders } = useOrders();
  const { showToast } = useToast();
  
  const { refreshing, onRefresh } = useScreenRefresh(async () => {
    await Promise.all([
      refetchOrders?.(),
    ]);
    showToast('Orders refreshed successfully', 'success');
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