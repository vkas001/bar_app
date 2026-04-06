import { useOrderStore } from '@/modules/orders/store/createOrderStore'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { TableCard } from './components/TableCard'
import TableFilter from './components/TableFilter'
import TableStatusFilter from './components/TableStatusFilter'
import { useTables } from './hooks/useTable'
import { TableType } from './types/table.types'

type CustomerData = {
  customerName: string
  customerPhone: string
  guestCount: number
}

type TableScreenProps = {
  refreshing?: boolean
  onRefresh?: () => void
  fromOrder?: boolean
  customerData?: CustomerData
}

export default function TableScreen({
  refreshing = false,
  onRefresh,
  fromOrder = false,
  customerData,
}: TableScreenProps) {
  // console.log('TableScreen fromOrder:', fromOrder)
  // console.log('TableScreen customerData:', customerData)

  const { tables, tableTypes, selectedIds, toggleTableSelection, loading, error } = useTables()
  const [selectedType, setSelectedType] = useState<TableType>('AllTypes')
  const [hideOccupied, setHideOccupied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const navigation = useNavigation()

  const setPendingCustomerData = useOrderStore(s => s.setPendingCustomerData)
  const setSelectedTableIds = useOrderStore(s => s.setSelectedTableIds)

  const handleConfirmSelection = () => {
    if (selectedIds.length === 0) {
      Alert.alert('Error', 'Please select at least one table')
      return
    }

    if (!customerData) {
      Alert.alert('Error', 'Customer data is missing')
      return
    }

    // Save customer data and selected tables to store
    setPendingCustomerData(customerData)
    setSelectedTableIds(selectedIds.map(id => Number(id)))

    // Navigate to menu to add items
    navigation.navigate('menu' as never)
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-red-400 text-center text-lg">{error}</Text>
      </View>
    )
  }

  const visibleTables = tables.filter((table) => {
    const matchesType = selectedType === 'AllTypes' || table.table_type.name === selectedType
    const matchesStatus = !hideOccupied || table.is_available !== false
    return matchesType && matchesStatus
  })

  return (
    <View className='flex-1'>
      <View className='flex-row items-center px-4 py-3'>
        <View className='flex-1'>
          <TableFilter
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            tableTypes={tableTypes}
          />
        </View>
        <View>
          <TableStatusFilter
            hideOccupied={hideOccupied}
            setHideOccupied={setHideOccupied}
          />
        </View>
      </View>

      <FlatList
        data={visibleTables}
        keyExtractor={(item) => item.id}
        numColumns={2}
        className='flex-1'
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
        contentContainerClassName='px-2 pt-4 pb-4'
        renderItem={({ item: table }) => (
          <View style={{ width: '50%', paddingHorizontal: 8, marginBottom: 16 }}>
            <TableCard
              table={table}
              selected={selectedIds.includes(table.id)}
              onPress={() => toggleTableSelection(table.id)}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text className='text-neutral-400 text-center mt-6 text-lg'>
            No tables match the selected filters.
          </Text>
        }
      />

      {/* Only show when coming from create order */}
      {fromOrder && (
        <View className='px-4 pb-4 pt-2 border-t border-zinc-800'>
          {/* Show selected count */}
          <Text className='text-red-500 text-lg text-center mb-3'>
            {selectedIds.length === 0
              ? 'No tables selected'
              : `${selectedIds.length} table${selectedIds.length > 1 ? 's' : ''} selected`}
          </Text>

          <TouchableOpacity
            onPress={handleConfirmSelection}
            disabled={submitting || selectedIds.length === 0}
            className={`rounded-xl items-center py-4 ${selectedIds.length === 0 ? 'bg-zinc-700' : 'bg-yellow'
              }`}
          >
            {submitting ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              <Text className={`font-bold text-lg ${selectedIds.length === 0 ? 'text-white' : 'text-black'
                }`}>
                Confirm Selection
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}