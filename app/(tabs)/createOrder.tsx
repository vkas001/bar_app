import ScreenHeader from '@/components/Header/ScreenHeader'
import { useScreenRefresh } from '@/components/refresh/refresh'
import CreateOrderForm from '@/modules/orders/components/CreateOrderForm'
import React from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function createOrder() {
  const { refreshing, onRefresh } = useScreenRefresh()
 
  const handleCreate = (data: any) => {
    // Placeholder for create behavior until form submission is wired.
    console.log('Created order:', data)
  }

  return (
   <SafeAreaView className="flex-1 bg-black">
    <ScreenHeader title="Create Order" />
    <ScrollView
      className='flex-1'
      contentContainerClassName='pb-4'
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <CreateOrderForm onCreate={handleCreate} />
    </ScrollView>

   </SafeAreaView>
  )
}