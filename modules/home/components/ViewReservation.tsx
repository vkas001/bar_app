import AppInput from '@/components/input'
import { ScreenState } from '@/components/screenState'
import ReservationDetailsModal from '@/modules/home/components/ReservationDetailsModal'
import {
    filterReservations,
    mapOrderToReservation
} from '@/modules/home/utils/reservationMapper'
import { useOrderStore } from '@/modules/orders/store/createOrderStore'
import { order } from '@/modules/orders/types/order.types'
import { useResponsive } from '@/shared/hooks/useResponsive'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import {
    Reservation,
    RESERVATION_STATUS_FILTERS,
    RESERVATION_STATUS_STYLES,
    ReservationStatusFilter
} from '../types/reservation.types'

interface Props {
    orders: order[]
    loading: boolean
    error: string | null
    refetch: () => Promise<void>
}

export default function ViewReservation({ orders, loading, error, refetch }: Props) {

    const [query, setQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<ReservationStatusFilter>('all')
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

    const { orderJustCompleted, setOrderJustCompleted } = useOrderStore();

    const handleOrderSuccess = async () => {
        await refetch();
    };

    useEffect(() => {
        if (orderJustCompleted) {
            refetch()
            setOrderJustCompleted(false)
        }
    }, [orderJustCompleted])

    useEffect(() => {
        if (!selectedReservation) return
        const updated = orders.find(o => String(o.id) === selectedReservation.id)
        if (updated) {
            setSelectedReservation(mapOrderToReservation(updated))
        }
    }, [orders])

    const { isSmallPhone, textXs, textSm, textBase, textLg, iconXs, iconSm, size } = useResponsive()

    const reservations = useMemo(() => orders.map(mapOrderToReservation), [orders])
    const filteredReservations = useMemo(
        () => filterReservations(reservations, query, statusFilter),
        [reservations, query, statusFilter]
    )

    if (loading && orders.length === 0 || error && orders.length === 0) {
        return <ScreenState
            loading={loading}
            error={error}
            onRetry={refetch}
            loadingText="Loading reservations..."
        />;
    }


    return (
        <View className='mt-4 overflow-hidden rounded-lg bg-zinc-900'>
            <View className='px-4 py-8'>

                {/* Header */}
                <View className='flex-row justify-between items-center'>
                    <Text className='text-white font-bold text-xl'>
                        Today's Reservations
                    </Text>
                    <Text className='text-zinc-400 text-base'>
                        {filteredReservations.length} of {reservations.length}
                    </Text>
                </View>

                {/* Search */}
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
                        const tables = reservation.tableNumber.split(',')
                        const hasMultipleTables = tables.length > 1

                        return (
                            <View
                                key={reservation.id}
                                className='rounded-xl border border-white/10 bg-zinc-900/70'
                            >
                                {/* Top row */}
                                <View className={`flex-row items-center justify-between ${isSmallPhone ? 'px-2 pt-2 pb-1' : 'px-4 pt-4 pb-2'}`}>

                                    {/* Avatar + Name/Info */}
                                    <View
                                        className='flex-row items-center flex-1 mr-2'
                                        style={{ gap: isSmallPhone ? size.padding.sm : size.padding.md }}
                                    >
                                        <View
                                            className={`items-center justify-center rounded-full bg-yellow flex-shrink-0 ${isSmallPhone ? 'h-8 w-8' : 'h-12 w-12'}`}
                                        >
                                            <Text
                                                className={`font-bold text-black ${isSmallPhone ? textXs : textBase}`}
                                            >
                                                {customerInitial}
                                            </Text>
                                        </View>

                                        <View className='flex-1'>
                                            <Text
                                                className={`font-semibold text-white ${isSmallPhone ? textSm : textLg}`}
                                                numberOfLines={1}
                                            >
                                                {reservation.customerName}
                                            </Text>
                                            <Text
                                                className={`text-zinc-400 ${isSmallPhone ? textXs : textBase}`}
                                                numberOfLines={1}
                                            >
                                                {reservation.peopleCount === 1 ? '1 person' : `${reservation.peopleCount} people`} • {reservation.time}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Status badge */}
                                    <View
                                        className={`rounded-full flex-shrink-0 ${isSmallPhone ? 'px-2 py-0.5' : 'px-3 py-1'}`}
                                        style={{ backgroundColor: statusColor.bg }}
                                    >
                                        <Text
                                            className={`font-semibold capitalize ${isSmallPhone ? textXs : textSm}`}
                                            style={{ color: statusColor.text }}
                                            numberOfLines={1}
                                        >
                                            {reservation.status}
                                        </Text>
                                    </View>
                                </View>

                                {/* Bottom row: tables + details */}
                                <View className={`flex-row items-center justify-between border-t border-white/5 ${isSmallPhone ? 'px-2 py-1.5' : 'px-4 py-2'}`}>

                                    {/* Table numbers */}
                                    <View
                                        className='flex-row items-center flex-wrap flex-1 mr-2'
                                        style={{ gap: size.padding.sm }}
                                    >
                                        <Text className={`text-yellow ${isSmallPhone ? textXs : textSm}`}>
                                            {hasMultipleTables ? 'Tables:' : 'Table:'}
                                        </Text>
                                        {tables.map((table, idx) => (
                                            <Text
                                                key={table.trim() + idx}
                                                className={`font-bold text-yellow ${isSmallPhone ? textXs : textBase}`}
                                                numberOfLines={1}
                                            >
                                                {table.trim()}
                                            </Text>
                                        ))}
                                    </View>

                                    {/* Details button */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedReservation(reservation)
                                            setIsDetailsOpen(true)
                                        }}
                                        className={`flex-row items-center rounded-md border border-yellow ${isSmallPhone ? 'px-2 py-1' : 'px-3 py-1.5'}`}
                                        style={{ gap: size.padding.sm }}
                                    >
                                        <Ionicons name='eye-outline' size={isSmallPhone ? iconXs : iconSm} color='yellow' />
                                        <Text className={`font-semibold text-yellow ${isSmallPhone ? textXs : textSm}`}>
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
                                <Text className='text-yellow text-base font-semibold'>Clear filters</Text>
                            </Pressable>
                        )}
                    </View>
                )}

                <ReservationDetailsModal
                    visible={isDetailsOpen}
                    reservation={selectedReservation}
                    onClose={() => {
                        setIsDetailsOpen(false)
                        setSelectedReservation(null)
                    }}
                    onOrderSuccess={handleOrderSuccess}
                />
            </View>
        </View>
    )
}