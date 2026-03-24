import React, { useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native'
import { TableCard } from './components/TableCard'
import TableFilter from './components/TableFilter'
import TableStatusFilter from './components/TableStatusFilter'
import { useTables } from './hooks/useTable'
import { TableType } from './types/table.types'

type TableScreenProps = {
  refreshing?: boolean
  onRefresh?: () => void
}

export default function TableScreen({ refreshing = false, onRefresh }: TableScreenProps) {
  const { tables, tableTypes, selectedIds, toggleTableSelection, loading, error } = useTables()
  const [selectedType, setSelectedType] = useState<TableType>('AllTypes')
  const [hideOccupied, setHideOccupied] = useState(false)

  // Loading state
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    )
  }

  // Error state
  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-red-400 text-center text-lg">
          {error}
        </Text>
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
          onRefresh ? <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          /> : undefined
        }
        contentContainerClassName='px-2 pt-4 pb-4'
        renderItem={({ item: table }) => (
          <View
            style={{
              width: '50%', paddingHorizontal: 8, marginBottom: 16
            }}
          >
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
    </View>
  )
}