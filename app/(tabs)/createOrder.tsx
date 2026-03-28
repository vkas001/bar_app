import ScreenHeader from '@/components/Header/ScreenHeader'
import { useScreenRefresh } from '@/components/refresh/refresh'
import CreateOrderForm from '@/modules/orders/components/CreateOrderForm'
import React from 'react'
import { RefreshControl, ScrollView, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;
  const isLandscape = width > height;
  return { width, isTablet, isLargeTablet, isLandscape };
};

export default function createOrder() {
  const { refreshing, onRefresh } = useScreenRefresh()
  const { isTablet, isLargeTablet } = useResponsive();

  const handleCreate = (data: any) => {
    // Placeholder for create behavior until form submission is wired.
    console.log('Created order:', data)
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScreenHeader title="Create Order" />
      <ScrollView
        className="flex-1"
        contentContainerClassName={`
          pb-6
          ${isLargeTablet ? "px-16" : isTablet ? "px-8" : "px-0"}
        `}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Center + constrain content width on large tablets */}
        <View
          className={`
            w-full self-center
            ${isLargeTablet ? "max-w-4xl" : isTablet ? "max-w-2xl" : "max-w-full"}
          `}
        >
          <CreateOrderForm onCreate={handleCreate} />
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}