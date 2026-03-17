import ScreenHeader from '@/components/Header/ScreenHeader'
import CreateOrderForm from '@/modules/orders/components/CreateOrderForm'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function createOrder() {
 
  const handleCreate = (data: any) => {
    // Placeholder for create behavior until form submission is wired.
    console.log('Created order:', data)
  }

  return (
   <SafeAreaView className="flex-1 bg-black">
    <ScreenHeader title="Create Order" />
    <CreateOrderForm onCreate={handleCreate} />

   </SafeAreaView>
  )
}