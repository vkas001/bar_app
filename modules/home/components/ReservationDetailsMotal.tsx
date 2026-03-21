import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'

type ReservationStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed'

export interface ReservationDetailsData {
    id: string
    customerName: string
    phone?: string
    date?: string
    tableNumber: string
    peopleCount: number
    time: string
    status: ReservationStatus
    orderItems?: number
    orderStatus?: string
    paymentStatus?: 'Pending' | 'Paid'
    total?: number
}

interface Props {
    visible: boolean
    reservation: ReservationDetailsData | null
    onClose: () => void
}

const statusColors: Record<ReservationStatus, { bg: string; text: string }> = {
    confirmed: { bg: '#16351f', text: '#86efac' },
    pending: { bg: '#4c3a12', text: '#facc15' },
    cancelled: { bg: '#4c1d1d', text: '#fca5a5' },
    completed: { bg: '#1f2937', text: '#d1d5db' },
}

export default function ReservationDetailsMotal({ visible, reservation, onClose }: Props) {
    if (!reservation) return null

    const currentStatusColor = statusColors[reservation.status]
    const customerInitial = reservation.customerName.trim().charAt(0).toUpperCase() || '?'
    const formattedOrderId = reservation.id.startsWith('#') ? reservation.id : `#${reservation.id}`
    const totalAmount = reservation.total ?? 0
    const totalPaid = reservation.paymentStatus === 'Paid' ? totalAmount : 0
    const discount = 0
    const reservationTables = reservation.tableNumber
        .split(',')
        .map((table) => table.trim())
        .filter(Boolean)

    return (
        <Modal visible={visible} animationType='slide' transparent onRequestClose={onClose}>
            <View className='flex-1' pointerEvents='box-none'>
                <Pressable className='absolute inset-x-0 top-0 bottom-16 bg-black/45' onPress={onClose} />

                <View className='absolute inset-x-0 top-0 bottom-16 flex-row'>
                    <Pressable className='flex-1' onPress={onClose} />

                    <View className='w-[80%] rounded-l-2xl bg-black px-4 py-4'>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View className='flex-row items-center justify-between px-4 py-4'>
                                <Text className='text-3xl font-bold text-white'>Reservation Details</Text>

                                <Pressable onPress={onClose}>
                                    <Ionicons name='close' size={26} color='white' />
                                </Pressable>
                            </View>

                            {/* Reservation & Customer Info */}

                            <View className='px-4 mb-4'>
                                <View className='rounded-xl bg-zinc-900 p-4'>
                                    <View className='flex-row items-center justify-between'>
                                        <View className='flex-row items-center gap-2'>
                                            <Ionicons name='calendar' size={20} color='#facc15' />
                                            <Text className='text-xl font-bold text-white'>
                                                Reservation & Customer

                                            </Text>
                                        </View>

                                    </View>

                                    <View className='mt-3 rounded-lg px-4 py-3'>
                                        <View className='mb-2 flex-row items-center justify-between'>
                                            <Text className='text-lg text-zinc-300'>
                                                Name
                                            </Text>
                                            <Text className='text-lg text-white'>
                                                {reservation.customerName}
                                            </Text>
                                        </View>


                                        <View className='mb-2 flex-row items-center justify-between'>
                                            <Text className='text-lg text-zinc-300'>
                                                Phone
                                            </Text>
                                            <Text className='text-lg text-white'>
                                                {reservation.phone ?? '-'}
                                            </Text>
                                        </View>

                                        <View className='mb-2 h-[1px] bg-zinc-700' />

                                        <View className='mb-2 flex-row items-center justify-between'>
                                            <Text className='text-lg text-zinc-300'>
                                                Date
                                            </Text>
                                            <Text className='text-lg font-semibold text-white'>
                                                {reservation.date ?? '-'}
                                            </Text>
                                        </View>

                                        <View className='mb-2 flex-row items-center justify-between'>
                                            <Text className='text-lg text-zinc-300'>
                                                Time
                                            </Text>
                                            <Text className='text-lg text-white'>
                                                {reservation.time}
                                            </Text>
                                        </View>

                                        <View className='mb-2 flex-row items-center justify-between'>
                                            <Text className='text-lg text-zinc-300'>
                                                Guest
                                            </Text>
                                            <Text className='text-lg text-white'>
                                                {reservation.peopleCount}
                                            </Text>
                                        </View>

                                        <View className='mb-2 flex-row items-center justify-between'>
                                            <Text className='text-lg text-zinc-300'>
                                                Status
                                            </Text>
                                            <View className='rounded-full px-3 py-1'
                                                style={{ backgroundColor: currentStatusColor.bg }}
                                            >
                                                <Text className='text-base font-semibold capitalize'
                                                    style={{ color: currentStatusColor.text }}
                                                >
                                                    {reservation.status}
                                                </Text>
                                            </View>
                                        </View>

                                        <View className='mb-2 h-[1px] bg-zinc-700' />

                                        <View className='flex-row items-center justify-between'>
                                            <Text className='text-lg text-zinc-300'>
                                                Tables
                                            </Text>
                                            <View className='max-w-[75%] flex-row flex-wrap justify-end gap-2'>
                                                {reservationTables.map((table) => (
                                                    <View key={table} className='rounded-lg bg-yellow px-2 py-2'>
                                                        <Text className='text-lg text-black'>
                                                            {table}
                                                        </Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {/* Orders & Notes */}

                                <View className='mt-4 rounded-xl bg-zinc-900 p-4'>
                                    <View className='flex-row items-center gap-2'>
                                        <Ionicons name='restaurant' size={20} color='#facc15' />
                                        <Text className='text-2xl font-bold text-white'>
                                            Orders
                                        </Text>
                                    </View>

                                    <View className='mt-3 rounded-lg bg-black p-3'>
                                        <View className='flex-row items-start justify-between'>
                                            <View>
                                                <Text className='text-xl font-bold text-yellow'>
                                                    Order {formattedOrderId}
                                                </Text>
                                                <Text className='mt-1 text-lg text-zinc-300'>
                                                    Items: {reservation.orderItems ?? reservation.peopleCount}
                                                </Text>
                                            </View>

                                            <View className='items-end'>
                                                <Text className='text-lg text-zinc-300'>
                                                    {reservation.orderStatus ?? '-'} / {reservation.paymentStatus ?? '-'}
                                                </Text>
                                                <Text className='mt-1 text-lg font-semibold text-white'>
                                                    Rs {reservation.total?.toLocaleString() ?? '-'}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View className='mt-4 rounded-xl bg-card p-4'>
                                    <View className='flex-row items-center gap-2'>
                                        <Ionicons name='document-text' size={20} color='#facc15' />
                                        <Text className='text-xl font-bold text-white'>
                                            Notes
                                        </Text>
                                    </View>
                                    <Text className='mt-3 text-lg text-zinc-300'>
                                        No additional notes for this reservation.
                                    </Text>
                                </View>
                            </View>

                            {/* Total Amount */}

                            <View className='mx-4 rounded-xl bg-zinc-900 p-4'>
                                <View className='flex-row items-center gap-2'>
                                    <Ionicons name='cash-outline' size={20} color='#facc15' />
                                    <Text className='text-2xl font-bold text-white'>
                                        Total Amount
                                    </Text>
                                </View>

                                <View className='mt-3 rounded-lg bg-black p-3'>
                                    <View className='mb-2 flex-row items-center justify-between'>
                                        <Text className='text-lg text-zinc-300'>
                                            Total Amount
                                        </Text>
                                        <Text className='text-lg font-semibold text-white'>
                                            Rs {totalAmount.toLocaleString()}
                                        </Text>
                                    </View>

                                    <View className='mb-2 flex-row items-center justify-between'>
                                        <Text className='text-lg text-zinc-300'>
                                            Total Paid
                                        </Text>
                                        <Text className='text-lg font-semibold text-white'>
                                            Rs {totalPaid.toLocaleString()}
                                        </Text>
                                    </View>

                                    <View className='mb-2 flex-row items-center justify-between'>
                                        <Text className='text-lg text-zinc-300'>
                                            Discount
                                        </Text>
                                        <Text className='text-lg font-semibold text-white'>
                                            Rs {discount.toLocaleString()}
                                        </Text>
                                    </View>

                                    <View className='flex-row items-center justify-between'>
                                        <Text className='text-lg text-zinc-300'>
                                            Payment Status
                                        </Text>
                                        <Text className='text-lg font-semibold text-white'>
                                            {reservation.paymentStatus ?? '-'}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Actions */}

                            <View className='bg-zinc-900 mt-4 px-4 pb-4'>
                                <View className='py-6'>
                                    <Text className='text-white font-bold text-xl'>
                                        Resercation Actions
                                    </Text>

                                </View>
                                <View className='flex-row items-stretch gap-2'>
                                    <TouchableOpacity className='flex-1 flex-row items-center justify-center rounded-lg bg-yellow py-4'>
                                        <Ionicons name='add' size={20} color='black' />
                                        <Text className='ml-2 text-center text-lg font-bold text-black'>
                                            Add Order
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity className='flex-1 flex-row items-center justify-center rounded-lg bg-blue py-4'>
                                        <Ionicons name='refresh' size={20} color='white' />
                                        <Text className='ml-2 text-center text-lg font-bold text-white'>
                                            Change Table
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={onClose} className='mt-2 flex-row items-center justify-center rounded-lg bg-red py-4 mb-4'>
                                    <Ionicons name='close' size={20} color='white' />
                                    <Text className='ml-2 text-center text-lg font-bold text-white'>
                                        Cancel Reservation
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    )
}