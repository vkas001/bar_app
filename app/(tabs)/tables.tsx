import { useRoute } from '@react-navigation/native'
import ScreenHeader from '@/components/Header/ScreenHeader'
import { useScreenRefresh } from '@/components/refresh/refresh'
import TableScreen from '@/modules/tables/tableScreen'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from '@/.expo/types/router'
import { useOrderStore } from '@/modules/orders/store/createOrderStore'


export default function tables() {
  const { refreshing, onRefresh } = useScreenRefresh()
  const pendingCustomerData = useOrderStore(s => s.pendingCustomerData)

  return (
    <SafeAreaView className='flex-1 bg-black'>

      <ScreenHeader title="Tables" />

      <TableScreen
        refreshing={refreshing}
        onRefresh={onRefresh}
        fromOrder={!!pendingCustomerData}
        customerData={pendingCustomerData ?? undefined}
      />

    </SafeAreaView>
  )
}