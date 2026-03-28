import AppInput from '@/components/input'
import ReservationDetailsMotal from '@/modules/home/components/ReservationDetailsMotal'
import {
    filterReservations,
    mapOrderToReservation
} from '@/modules/home/utils/reservationMapper'
import { useOrders } from '@/modules/orders/hook/useOrder'
import { Ionicons } from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from 'react-native'
import {
    Reservation,
    RESERVATION_STATUS_FILTERS,
    RESERVATION_STATUS_STYLES,
    ReservationStatusFilter
} from '../types/reservation.types'

export default function ViewReservation() {
    const { orders, loading, error, refetch } = useOrders()
    
    const [query, setQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<ReservationStatusFilter>('all')
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

    // Map orders to reservations
    const reservations = useMemo(() => {
        return orders.map(mapOrderToReservation)
    }, [orders])

    // Filter reservations based on query and status
    const filteredReservations = useMemo(() => {
        return filterReservations(reservations, query, statusFilter)
    }, [reservations, query, statusFilter])

    // Loading state
    if (loading && orders.length === 0) {
        return (
            <View className='bg-zinc-900 mt-4 rounded-lg'>
                <View className='flex-1 mt-8 ml-4 mr-4 mb-8 items-center justify-center py-20'>
                    <ActivityIndicator size="large" color="#fcd34d" />
                    <Text className="mt-4 text-white text-base">Loading reservations...</Text>
                </View>
            </View>
        )
    }

    // Error state
    if (error && orders.length === 0) {
        return (
            <View className='bg-zinc-900 mt-4 rounded-lg'>
                <View className='flex-1 mt-8 ml-4 mr-4 mb-8 items-center justify-center py-20'>
                    <Text className="text-red-500 text-lg font-bold mb-2">Error Loading Reservations</Text>
                    <Text className="text-white text-center mb-4">{error}</Text>
                    <Pressable onPress={refetch}>
                        <Text className="text-yellow-500 text-base font-semibold">Tap to retry</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <View className='bg-zinc-900 mt-4 rounded-lg'>
            <View className='flex-1 mt-8 ml-4 mr-4 mb-8'>
                <View className='flex-row justify-between items-center'>
                    <Text className='text-white font-bold text-xl'>
                        Today's Reservations
                    </Text>
                    <Text className='text-zinc-400 text-base'>
                        {filteredReservations.length} of {reservations.length}
                    </Text>
                </View>

                <View className='mt-4 relative'>
                    <AppInput
                        placeholder='Search by customer or table...'
                        inputClassName='h-14'
                        inputTextClassName='text-xl'
                        value={query}
                        onChangeText={setQuery}
                        leftIcon={<Ionicons name='search' size={24} color='rgba(255,255,255,0.45)' />}
                        rightIcon={<Ionicons name='filter' size={24} color='rgba(255,255,255,0.8)' />}
                        onRightIconPress={() => setIsFilterOpen((prev) => !prev)}
                    />

                    {/* Filter Dropdown */}
                    {isFilterOpen && (
                        <View className='absolute right-0 top-16 z-20 min-w-[170px] rounded-xl border border-white/10 bg-zinc-900 p-2'>
                            {RESERVATION_STATUS_FILTERS.map((status) => {
                                const isSelected = statusFilter === status
                                const label = status.charAt(0).toUpperCase() + status.slice(1)

                                return (
                                    <Pressable
                                        key={status}
                                        onPress={() => {
                                            setStatusFilter(status)
                                            setIsFilterOpen(false)
                                        }}
                                        className='mb-1 flex-row items-center justify-between rounded-lg px-3 py-2'
                                    >
                                        <Text className='text-base text-white'>{label}</Text>
                                        {isSelected && <Ionicons name='checkmark' size={18} color='#fcd34d' />}
                                    </Pressable>
                                )
                            })}
                        </View>
                    )}
                </View>

                {/* Reservations List */}
                <View className='mt-3 gap-3 mr-2 ml-2'>
                    {filteredReservations.map((reservation) => {
                        const statusColor = RESERVATION_STATUS_STYLES[reservation.status]
                        const customerInitial = reservation.customerName.trim().charAt(0).toUpperCase() || '?'

                        return (
                            <View
                                key={reservation.id}
                                className='flex-row items-center rounded-xl border border-white/10 bg-zinc-900/70 py-4'
                            >
                                <View className='w-[56%] flex-row items-center px-4 py-2'>
                                    <View className='h-12 w-12 items-center justify-center rounded-full bg-yellow'>
                                        <Text className='text-base font-bold text-black'>
                                            {customerInitial}
                                        </Text>
                                    </View>

                                    <View className='ml-3 flex-1'>
                                        <Text className='text-lg font-semibold text-white' numberOfLines={1}>
                                            {reservation.customerName}
                                        </Text>
                                        <Text className='text-base text-zinc-400' numberOfLines={1}>
                                            {reservation.peopleCount === 1
                                              ? '1 person'
                                              : `${reservation.peopleCount} people`} • {reservation.time}
                                        </Text>
                                    </View>
                                </View>

                                <View className='flex-1 min-w-[90px] max-w-[180px] items-center'>
                                    <Text className='text-lg text-yellow'>
                                        Table{reservation.tableNumber.includes(',') ? 's' : ''}
                                    </Text>
                                    <View className='flex-row flex-wrap justify-center items-center w-full'>
                                        {reservation.tableNumber.split(',').map((table, idx) => (
                                            <Text
                                                key={table.trim() + idx}
                                                className='text-lg font-bold text-yellow mr-2 mb-1'
                                                numberOfLines={1}
                                            >
                                                {table.trim()}
                                            </Text>
                                        ))}
                                    </View>
                                </View>

                                <View className='ml-auto min-w-[90px] max-w-[180px] items-end pr-4'>
                                    <View className='rounded-full px-2 py-1 max-w-full'
                                        style={{ backgroundColor: statusColor.bg }}
                                    >
                                        <Text
                                            className='text-base font-semibold capitalize max-w-full'
                                            style={{ color: statusColor.text }}
                                            numberOfLines={1}
                                            ellipsizeMode='tail'
                                        >
                                            {reservation.status}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedReservation(reservation)
                                            setIsDetailsOpen(true)
                                        }}
                                        className='mt-2 self-end flex-row items-center gap-2 rounded-md border border-yellow px-3 py-2'
                                    >
                                        <Ionicons name='eye-outline' size={20} color='yellow' />
                                        <Text numberOfLines={1} className='text-base font-semibold text-yellow'>
                                            Details
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </View>

                {/* Empty State */}
                {filteredReservations.length === 0 && (
                    <View className='mt-8 items-center justify-center py-12'>
                        <Ionicons name='calendar-outline' size={48} color='rgba(255,255,255,0.3)' />
                        <Text className='mt-4 text-center text-lg text-zinc-400'>
                            No reservations found
                        </Text>
                        {(query || statusFilter !== 'all') && (
                            <Pressable
                                onPress={() => {
                                    setQuery('')
                                    setStatusFilter('all')
                                }}
                                className='mt-4'
                            >
                                <Text className='text-yellow text-base font-semibold'>
                                    Clear filters
                                </Text>
                            </Pressable>
                        )}
                    </View>
                )}

                {/* Reservation Details Modal */}
                <ReservationDetailsMotal
                    visible={isDetailsOpen}
                    reservation={selectedReservation}
                    onClose={() => {
                        setIsDetailsOpen(false)
                        setSelectedReservation(null)
                    }}
                />
            </View>
        </View>
    )
}