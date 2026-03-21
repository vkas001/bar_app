import AppInput from '@/components/input'
import ReservationDetailsMotal from '@/modules/home/components/ReservationDetailsMotal'
import { orders } from '@/modules/orders/data/order.data'
import { Ionicons } from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'

type ReservationStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed'
type ReservationStatusFilter = 'all' | ReservationStatus

type Reservation = {
    id: string
    customerName: string
    phone: string
    date: string
    tableNumber: string
    peopleCount: number
    time: string
    status: ReservationStatus
    orderItems: number
    orderStatus: string
    paymentStatus: 'Pending' | 'Paid'
    total: number
}

{/* orders data*/}

function mapOrderStatusToReservationStatus(status: string): ReservationStatus {
    const normalizedStatus = status.toLowerCase()

    if (normalizedStatus === 'completed') {
        return 'completed'
    }

    if (normalizedStatus === 'cancelled') {
        return 'cancelled'
    }

    if (normalizedStatus === 'pending') {
        return 'pending'
    }

    return 'confirmed'
}

const reservations: Reservation[] = orders.map((order) => {
    const [date, time] = order.date.split(' at ')

    return {
        id: String(order.id),
        customerName: order.customer ?? 'Guest',
        phone: '-',
        date: date ?? order.date,
        tableNumber: order.table,
        peopleCount: order.items,
        time: time ?? '-',
        status: mapOrderStatusToReservationStatus(order.status),
        orderItems: order.items,
        orderStatus: order.status,
        paymentStatus: order.paymentStatus,
        total: order.total,
    }
})

const statusStyles: Record<ReservationStatus, { bg: string; text: string }> = {
    confirmed: { bg: '#16351f', text: '#86efac' },
    pending: { bg: '#4c3a12', text: '#facc15' },
    cancelled: { bg: '#4c1d1d', text: '#fca5a5' },
    completed: { bg: '#1f2937', text: '#d1d5db' },
}

export default function ViewReservation() {
    const [query, setQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<ReservationStatusFilter>('all')
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [selectedReservation, setSelectedReservation] = useState<(typeof reservations)[number] | null>(null)

    const filteredReservations = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()
        return reservations.filter((reservation) => {
            const matchesQuery =
                !normalizedQuery ||
                reservation.customerName.toLowerCase().includes(normalizedQuery) ||
                reservation.tableNumber.toLowerCase().includes(normalizedQuery)

            const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter
            return matchesQuery && matchesStatus
        })
    }, [query, statusFilter])

    return (
        <View className=' bg-zinc-900 mt-4 rounded-lg'>
            <View className='flex-1 mt-8 ml-4 mr-4 mb-8'>
                <Text className='text-white text-bold text-xl'>
                    Today's Reservations

                </Text>
                <View className='mt-4'>
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
                    </View>

                {isFilterOpen ? (
                    <View className='absolute right-0 top-16 z-20 min-w-[170px] rounded-xl border border-white/10 bg-zinc-900 p-2'>
                        {(['all', 'confirmed', 'pending', 'cancelled', 'completed'] as ReservationStatusFilter[]).map((status) => {
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
                                    {isSelected ? <Ionicons name='checkmark' size={18} color='#fcd34d' /> : null}
                                </Pressable>
                            )
                        })}
                    </View>
                ) : null}

                <View className='mt-3 gap-3 mr-2 ml-2'>
                    {filteredReservations.map((reservation) => {
                        const statusColor = statusStyles[reservation.status]
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

                                    <View className='ml-3'>
                                        <Text className='text-lg font-semibold text-white'>
                                            {reservation.customerName}
                                        </Text>
                                        <Text className='text-base text-zinc-400'>
                                            {reservation.peopleCount} people • {reservation.time}
                                        </Text>
                                    </View>
                                </View>

                                <View className='w-20 shrink-0 items-center'>
                                    <Text className='text-lg text-yellow'>
                                        Table
                                    </Text>
                                    <Text className='text-lg font-bold text-yellow'>
                                        {reservation.tableNumber}
                                    </Text>
                                </View>

                                <View className='ml-auto w-28 shrink-0 items-end'>
                                    <View className='rounded-full px-2 py-1'
                                        style={{ backgroundColor: statusColor.bg }}
                                    >
                                        <Text className='text-base font-semibold capitalize'
                                            style={{ color: statusColor.text }}
                                        >
                                            {reservation.status}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedReservation(reservation)
                                            setIsDetailsOpen(true)
                                        }}
                                        className='mt-2 self-start flex-row items-center gap-2 rounded-md border border-yellow px-3 py-2'
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

                {filteredReservations.length === 0 ? (
                    <Text className='mt-3 text-center text-sm text-zinc-400'>
                        No reservations found for this filter.
                    </Text>
                ) : null}

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