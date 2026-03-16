import React, { useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import OrderCard from './components/OrderCard'
import OrderFilter from './components/OrderFilter'
import { orders } from './data/order.data'
import { orderStatus } from './types/order.types'
import { PaymentFilter } from './types/orderFilter.types'

export default function OrderModule() {
  const [statusFilter, setStatusFilter] = useState<orderStatus | 'All'>('All')
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>('All')
  const [tableFilter, setTableFilter] = useState<string>('All')

  const tableOptions = useMemo(() => {
    const uniqueTables = Array.from(new Set(orders.map((order) => order.table)))
    return ['All', ...uniqueTables]
  }, [])

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const statusMatch = statusFilter === 'All' || order.status === statusFilter
      const paymentMatch = paymentFilter === 'All' || order.paymentStatus === paymentFilter
      const tableMatch = tableFilter === 'All' || order.table === tableFilter
      return statusMatch && paymentMatch && tableMatch
    })
  }, [statusFilter, paymentFilter, tableFilter])

  return (
    <View className='flex-1'>
      <OrderFilter
        statusValue={statusFilter}
        paymentValue={paymentFilter}
        tableValue={tableFilter}
        statusOptions={['All', 'Processing', 'Completed', 'Pending', 'Cancelled']}
        paymentOptions={['All', 'Pending', 'Paid']}
        tableOptions={tableOptions}
        onStatusChange={setStatusFilter}
        onPaymentChange={setPaymentFilter}
        onTableChange={setTableFilter}
      />

      <FlatList
        data={filteredOrders}
        numColumns={2}
        key={'two-column-grid'}
        style={{ zIndex: 1, elevation: 1 }}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 12 }}
        columnWrapperStyle={{ gap: 8, justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <View style={{ width: '48.5%', flexGrow: 0, flexShrink: 0 }}>
            <OrderCard order={item} />
          </View>
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
     
    </View>
  )
}