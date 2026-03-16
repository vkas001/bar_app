import { Ionicons } from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import {
    FilterKey,
    OrderFilterProps,
    PaymentFilter,
    StatusFilter,
} from '../types/orderFilter.types'

export default function OrderFilter({
    statusValue,
    paymentValue,
    tableValue,
    statusOptions,
    paymentOptions,
    tableOptions,
    onStatusChange,
    onPaymentChange,
    onTableChange,
}: OrderFilterProps) {
    const [openMenu, setOpenMenu] = useState<FilterKey | null>(null)
    const [triggerHeight, setTriggerHeight] = useState(40)

    const optionsMap = {
        status: statusOptions,
        payment: paymentOptions,
        table: tableOptions,
    }

    const selectedMap = {
        status: statusValue,
        payment: paymentValue,
        table: tableValue,
    }

    const onSelect = (type: FilterKey, value: string) => {
        if (type === 'status') onStatusChange(value as StatusFilter)
        if (type === 'payment') onPaymentChange(value as PaymentFilter)
        if (type === 'table') onTableChange(value)
        setOpenMenu(null)
    }

    const filterConfigs: Array<{ key: FilterKey; label: string }> = [
        { key: 'status', label: 'Status' },
        { key: 'payment', label: 'Payment' },
        { key: 'table', label: 'Table' },
    ]

    const triggerWidth = useMemo(() => {
        const longestOptionLength = Math.max(
            ...Object.values(optionsMap)
                .flat()
                .map((option) => option.length)
        )

        return Math.max(130, longestOptionLength * 10 + 48)
    }, [optionsMap])

    return (
        <View
            className='w-full flex-row items-center justify-between px-4 py-2'
            style={{ zIndex: 1000, elevation: 1000 }}
        >
            {filterConfigs.map((filter) => (
                <View
                    key={filter.key}
                    className='relative flex-row items-center'
                >
                    <Text className='text-white font-bold text-lg'>{filter.label}:</Text>
                    <View className='relative ml-2'>
                        <Pressable
                            onPress={() =>
                                setOpenMenu((prev) => (prev === filter.key ? null : filter.key))
                            }
                            onLayout={(event) => setTriggerHeight(event.nativeEvent.layout.height)}
                            className='min-w-[130px] flex-row items-center justify-between rounded-md border border-yellow-500 px-8 py-2 rounded-lg'
                            style={{ width: triggerWidth, backgroundColor: '#3a3a3a' }}
                        >
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                className='mr-3 flex-1 text-white font-bold text-base'
                            >
                                {selectedMap[filter.key]}
                            </Text>

                            <Ionicons
                                name={openMenu === filter.key ? 'chevron-up' : 'chevron-down'}
                                size={16}
                                color='white'
                            />
                        </Pressable>

                        {openMenu === filter.key && (
                            <View
                                className='absolute left-0 rounded-lg p-2'
                                style={{
                                    minWidth: triggerWidth,
                                    top: triggerHeight + 4,
                                    backgroundColor: '#3a3a3a',
                                    zIndex: 1100,
                                    elevation: 1100,
                                }}
                            >
                                {optionsMap[filter.key].map((option) => {
                                    const isSelected = selectedMap[filter.key] === option
                                    return (
                                        <Pressable
                                            key={`${filter.key}-${option}`}
                                            onPress={() => onSelect(filter.key, option)}
                                            className='mb-1.5 flex-row items-center justify-between rounded-lg px-3 py-3'
                                        >
                                            <Text className={'text-white font-bold text-xl'}>
                                                {option}
                                            </Text>
                                            {isSelected && (
                                                <Ionicons name='checkmark' size={18} color='#fcd34d' />
                                            )}
                                        </Pressable>
                                    )
                                })}
                            </View>
                        )}
                    </View>
                </View>
            ))}
            
        </View>
    )
}