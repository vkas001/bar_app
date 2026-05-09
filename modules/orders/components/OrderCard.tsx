import { useResponsive } from '@/shared/hooks/useResponsive';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
    const {
        isSmallPhone,
        isTablet,
        isLargeTablet,
        textXs,
        textSm,
        textBase,
        textLg,
        textXl,
        text2xl,
        size,
    } = useResponsive()

    const currentStatusColors = statusColors[order.status]
    const currentPaymentColors = paymentColors[order.paymentStatus]

    const tableList = order.table.split(',').map(t => t.trim()).filter(Boolean)
    const groupedTables: string[][] = []
    for (let i = 0; i < tableList.length; i += 4) {
        groupedTables.push(tableList.slice(i, i + 4))
    }

    // Responsive tokens
    const cardPadding = isLargeTablet ? 20 : isTablet ? 16 : isSmallPhone ? 10 : 12
    const cardRadius = isLargeTablet ? 28 : isTablet ? 24 : 20
    const tablePx = isSmallPhone ? 'px-2 py-2' : isTablet ? 'px-5 py-5' : 'px-4 py-4'
    const tableLabelSize = isSmallPhone ? textSm : isTablet ? text2xl : textXl
    const tableValueSize = isSmallPhone ? textXs : isTablet ? textXl : textBase
    const customerSize = isSmallPhone ? textSm : isTablet ? textXl : textBase
    const statusTextSize = isSmallPhone ? 'text-[10px]' : 'text-[8px]'
    const badgePx = isSmallPhone ? 'px-2 py-0.5' : 'px-3 py-1'
    const metaTextSize = isSmallPhone ? textXs : textSm
    const totalTextSize = isSmallPhone ? textBase : textLg

    return (
        <TouchableOpacity onPress={() => onPress(order)} activeOpacity={0.75}>
            <View
                style={{
                    backgroundColor: '#222222',
                    borderColor: '#3f3f46',
                    borderWidth: 1,
                    borderRadius: cardRadius,
                    padding: cardPadding,
                    marginVertical: isSmallPhone ? 6 : 8,
                    shadowColor: '#000000',
                    shadowOpacity: 0.18,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 8 },
                    elevation: 6,
                }}
            >
                {/* Top Row: Table | Customer | Status */}
                <View className='flex-row items-center' style={{ gap: size.padding.sm }}>

                    {/* Table block */}
                    <View className='flex-1 items-center'>
                        <View className={`w-full items-center justify-center rounded-lg bg-yellow ${tablePx}`}>
                            <Text
                                className={`w-full text-center font-bold uppercase tracking-[0.6px] text-black leading-none ${tableLabelSize}`}
                            >
                                Table:
                            </Text>
                            {groupedTables.map((row, idx) => (
                                <Text
                                    key={idx}
                                    className={`w-full text-center font-bold text-black leading-none mt-1 ${tableValueSize}`}
                                >
                                    {row.join(', ')}
                                </Text>
                            ))}
                        </View>
                    </View>

                    {/* Customer */}
                    <View className='flex-1'>
                        <Text
                            className={`text-center font-bold text-white ${customerSize}`}
                            numberOfLines={2}
                        >
                            {order.customer}
                        </Text>
                    </View>

                    {/* Status badge */}
                    <View className='flex-1 items-center'>
                        <View
                            className={`rounded-full ${badgePx}`}
                            style={{ backgroundColor: currentStatusColors.backgroundColor }}
                        >
                            <Text
                                className={`font-semibold uppercase tracking-[1px] ${statusTextSize}`}
                                style={{ color: currentStatusColors.color }}
                                numberOfLines={1}
                            >
                                {order.status}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Order ID / Type */}
                <View className='mt-2 items-center'>
                    <Text className={`text-white ${metaTextSize}`}>
                        #{order.id} / {order.type}
                    </Text>
                </View>

                {/* Date / Items */}
                <View className='mt-3 flex-row items-center justify-between mb-2'>
                    <Text className={`text-white ${metaTextSize}`}>
                        {order.date}
                    </Text>
                    <Text className={`font-semibold text-white ${metaTextSize}`}>
                        {order.items} Items
                    </Text>
                </View>

                {/* Divider */}
                <View
                    style={{
                        marginVertical: isSmallPhone ? 8 : 12,
                        borderTopWidth: 0.8,
                        borderTopColor: '#ffffff',
                        opacity: 0.95,
                    }}
                />

                {/* Total */}
                <View className='flex-row items-center justify-between'>
                    <Text className={`font-bold text-white ${totalTextSize}`}>Total</Text>
                    <Text className={`font-bold text-white ${totalTextSize}`}>
                        Rs. {order.total.toFixed(2)}
                    </Text>
                </View>

                {/* Payment */}
                <View className='mt-2 flex-row items-center justify-between'>
                    <Text className={`font-medium text-white ${metaTextSize}`}>Payment</Text>
                    <View
                        className={`rounded-full ${badgePx}`}
                        style={{ backgroundColor: currentPaymentColors.backgroundColor }}
                    >
                        <Text
                            className={`uppercase tracking-[1px] ${metaTextSize}`}
                            style={{ color: currentPaymentColors.color }}
                        >
                            {order.paymentStatus}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}