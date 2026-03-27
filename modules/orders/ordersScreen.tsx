import React, { useMemo, useState } from 'react'
import { FlatList, RefreshControl, View, Text, ActivityIndicator } from 'react-native'
import OrderCard from './components/OrderCard'
import OrderDetailsModal from './components/OrderDetailsModal'
import OrderFilter from './components/OrderFilter'
import { useOrders } from './hook/useOrder'
import { order } from './types/order.types'
import { PaymentFilter, StatusFilter } from './types/orderFilter.types'
import { filterOrders, getTableOptions } from './utils/orderFilter'

type OrderModuleProps = {
  refreshing?: boolean
  onRefresh?: () => void
}

export default function OrderModule({
  refreshing = false,
  onRefresh
}: OrderModuleProps) {
  const { orders, loading, error, refetch } = useOrders()

  // Filter states
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>('All')
  const [tableFilter, setTableFilter] = useState<string>('All')

  // Modal states
  const [selectedOrder, setSelectedOrder] = useState<order | null>(null)
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)

  // Filter options
  const statusOptions: StatusFilter[] = ['All', 'Processing', 'Completed', 'Pending', 'Cancelled']
  const paymentOptions: PaymentFilter[] = ['All', 'Paid', 'Pending']
  
  // Dynamically generate table options from fetched orders
  const tableOptions = useMemo(() => getTableOptions(orders), [orders])

  // Apply filters using the utility function
  const filteredOrders = useMemo(
    () => filterOrders(orders, statusFilter, paymentFilter, tableFilter),
    [orders, statusFilter, paymentFilter, tableFilter]
  )

  // Handlers
  const handleOrderPress = (selected: order) => {
    setSelectedOrder(selected)
    setIsDetailsVisible(true)
  }

  const handleCloseDetails = () => {
    setIsDetailsVisible(false)
    setSelectedOrder(null)
  }

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh()
    } else {
      refetch()
    }
  }

  // Loading state
  if (loading && orders.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-[#1a1a1a]">
        <ActivityIndicator size="large" color="#fcd34d" />
        <Text className="mt-4 text-white text-base">Loading orders...</Text>
      </View>
    )
  }

  // Error state
  if (error && orders.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-[#1a1a1a] px-6">
        <Text className="text-red-500 text-lg font-bold mb-2">Error Loading Orders</Text>
        <Text className="text-white text-center mb-4">{error}</Text>
        <Text 
          className="text-yellow-500 text-base font-semibold"
          onPress={handleRefresh}
        >
          Tap to retry
        </Text>
      </View>
    )
  }

  return (
    <View className='flex-1 bg-[#1a1a1a]'>
      {/* Filter Component */}
      <OrderFilter
        statusValue={statusFilter}
        paymentValue={paymentFilter}
        tableValue={tableFilter}
        statusOptions={statusOptions}
        paymentOptions={paymentOptions}
        tableOptions={tableOptions}
        onStatusChange={setStatusFilter}
        onPaymentChange={setPaymentFilter}
        onTableChange={setTableFilter}
      />

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        numColumns={1}
        key={'one-column-grid'}
        style={{ zIndex: 1, elevation: 1 }}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing || loading} 
            onRefresh={handleRefresh}
            tintColor="#fcd34d"
            colors={["#fcd34d"]}
          />
        }
        contentContainerStyle={{ 
          paddingHorizontal: 8, 
          paddingBottom: 12,
          flexGrow: 1
        }}
        renderItem={({ item }) => (
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <OrderCard order={item} onPress={handleOrderPress} />
          </View>
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-white text-xl font-bold mb-2">
              No Orders Found
            </Text>
            <Text className="text-gray-400 text-sm text-center px-6">
              {orders.length === 0 
                ? "No orders available at the moment"
                : "No orders match your current filters"
              }
            </Text>
            {orders.length > 0 && (
              <Text 
                className="text-yellow-500 text-base font-semibold mt-4"
                onPress={() => {
                  setStatusFilter('All')
                  setPaymentFilter('All')
                  setTableFilter('All')
                }}
              >
                Clear Filters
              </Text>
            )}
          </View>
        }
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        visible={isDetailsVisible}
        order={selectedOrder}
        onClose={handleCloseDetails}
      />
    </View>
  )
}