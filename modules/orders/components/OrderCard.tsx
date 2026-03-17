import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { order, orderStatus } from '../types/order.types';

interface Props {
    order: order;
    onPress: (order: order) => void;
}

const statusColors: Record<orderStatus, { backgroundColor: string; color: string }> = {
    Processing: { backgroundColor: '#4c3a12', color: '#facc15' },
    Completed: { backgroundColor: '#16351f', color: '#86efac' },
    Pending: { backgroundColor: '#3b2f4f', color: '#c4b5fd' },
    Cancelled: { backgroundColor: '#4c1d1d', color: '#fca5a5' },
}

const paymentColors: Record<string, { backgroundColor: string; color: string }> = {
    Paid: { backgroundColor: '#16351f', color: '#86efac' },
    Pending: { backgroundColor: '#4c3a12', color: '#facc15' },
    All: { backgroundColor: '#2d2d2d', color: '#d4d4d8' },
}

export default function OrderCard({ order, onPress }: Props) {
    const currentStatusColors = statusColors[order.status]
    const currentPaymentColors = paymentColors[order.paymentStatus]

    return (
        <Pressable
            onPress={() => onPress(order)}
        >
            <View
                className='my-2 rounded-[24px] border p-4'
                style={{
                    backgroundColor: '#222222',
                    borderColor: '#3f3f46',
                    shadowColor: '#000000',
                    shadowOpacity: 0.18,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 8 },
                    elevation: 6,
                }}
            >
                <View className='flex-row items-center'>
                    <View className='flex-1 items-center'>
                        <View className='bg-yellow gap-0 items-center justify-center rounded-lg px-4 py-4'>
                            <Text className='w-full text-center font-bold text-2xl uppercase tracking-[0.6px] text-black leading-none'>
                                Table:
                            </Text>
                            <Text className='w-full text-center text-xl font-bold text-black leading-none -mt-1'>
                                {order.table}
                            </Text>
                        </View>
                    </View>

                    <View className='flex-1 items-center'>
                        <Text className='text-center text-xl font-bold text-white'>
                            {order.customer || 'Walk-in'}
                        </Text>
                    </View>

                    <View className='flex-1 items-center'>
                        <View
                            className='rounded-full px-3 py-1'
                            style={{ backgroundColor: currentStatusColors.backgroundColor }}
                        >
                            <Text
                                className='text-xs font-semibold uppercase tracking-[1px]'
                                style={{ color: currentStatusColors.color }}
                            >
                                {order.status}
                            </Text>
                        </View>
                    </View>
                </View>

                <View className='mt-2 items-center'>
                    <Text className='text-sm text-white'>{order.id} / {order.type}</Text>
                </View>

                <View className='mt-4 flex-row items-center justify-between mb-2'>
                    <Text className='text-xm text-white'>{order.date}</Text>
                    <Text className='text-sm font-semibold text-white'>Items: {order.items}</Text>
                </View>

                <View
                    style={{
                        marginVertical: 12,
                        borderTopWidth: 0.8,
                        borderTopColor: '#ffffff',
                        opacity: 0.95,
                    }}
                />

                <View className='flex-row items-center justify-between'>
                    <Text className='text-lg font-bold text-white'>Total</Text>
                    <Text className='text-lg font-bold text-white'>Rs. {order.total.toFixed(2)}</Text>
                </View>

                <View className='mt-2 flex-row items-center justify-between'>
                    <Text className='text-sm font-medium text-white'>Payment</Text>
                    <View
                        className='rounded-full px-3 py-1'
                        style={{ backgroundColor: currentPaymentColors.backgroundColor }}
                    >
                        <Text
                            className='text-xs font-semibold uppercase tracking-[1px]'
                            style={{ color: currentPaymentColors.color }}
                        >
                            {order.paymentStatus}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}