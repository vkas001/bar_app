import PageHeader from '@/components/Header/PageHeader';
import { useScreenRefresh } from '@/components/refresh/refresh';
import ScreenHeader from '@/components/Header/ScreenHeader';
import OrderModule from '@/modules/orders/ordersScreen';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Orders() {
  const { refreshing, onRefresh } = useScreenRefresh()

  return (
    <SafeAreaView className="flex-1 bg-black">
      <PageHeader />

      <ScreenHeader title="Orders" />

      <OrderModule refreshing={refreshing} onRefresh={onRefresh} />
    </SafeAreaView>
  )
}