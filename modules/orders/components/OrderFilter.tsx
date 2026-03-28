import { Ionicons } from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { Pressable, Text, useWindowDimensions, View } from 'react-native'
import {
    FilterKey,
    OrderFilterProps,
    PaymentFilter,
    StatusFilter,
} from '../types/orderFilter.types'

const useResponsive = () => {
    const { width, height } = useWindowDimensions();
    const isTablet = width >= 768;
    const isLargeTablet = width >= 1024;
    const isLandscape = width > height;

    return { width, isTablet, isLargeTablet, isLandscape };
};

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
    const { isTablet, isLargeTablet } = useResponsive();
    const [openMenu, setOpenMenu] = useState<FilterKey | null>(null)
    const [triggerHeight, setTriggerHeight] = useState(40)

    {/* Responsive */ }
    const px = isLargeTablet ? "px-8" : isTablet ? "px-6" : "px-4";
    const py = isLargeTablet ? "py-3" : isTablet ? "py-2" : "py-2";
    const labelSize = isLargeTablet ? "text-xl" : isTablet ? "text-lg" : "text-sm";
    const valueSize = isLargeTablet ? "text-lg" : isTablet ? "text-base" : "text-sm";
    const optionSize = isLargeTablet ? "text-xl" : isTablet ? "text-lg" : "text-base";
    const minTriggerWidth = isLargeTablet ? 180 : isTablet ? 150 : 120;
    const iconSize = isLargeTablet ? 20 : isTablet ? 18 : 16;
    const checkSize = isLargeTablet ? 22 : isTablet ? 20 : 18;
    const triggerPx = isLargeTablet ? "px-10" : isTablet ? "px-8" : "px-4";
    const triggerPy = isLargeTablet ? "py-3" : isTablet ? "py-2" : "py-2";
    const gap = isLargeTablet ? "gap-6" : isTablet ? "gap-4" : "gap-2";

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
            className={`w-full flex-row flex-wrap items-center justify-between ${px} ${py} ${gap}`}
            style={{ zIndex: 1000, elevation: 1000 }}
        >
            {filterConfigs.map((filter) => (
                <View
                    key={filter.key}
                    className="relative flex-row items-center"
                >
                    {/* Label */}
                    <Text className={`text-white font-bold ${labelSize}`}>
                        {filter.label}:
                    </Text>

                    {/* Dropdown trigger */}
                    <View className="relative ml-2">
                        <Pressable
                            onPress={() =>
                                setOpenMenu((prev) => (prev === filter.key ? null : filter.key))
                            }
                            onLayout={(e) => setTriggerHeight(e.nativeEvent.layout.height)}
                            className={`
                flex-row items-center justify-between
                rounded-lg border border-yellow-500
                ${triggerPx} ${triggerPy}
              `}
                            style={{
                                minWidth: minTriggerWidth,
                                width: triggerWidth,
                                backgroundColor: "#3a3a3a",
                            }}
                        >
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                className={`mr-3 flex-1 text-white font-bold ${valueSize}`}
                            >
                                {selectedMap[filter.key]}
                            </Text>

                            <Ionicons
                                name={openMenu === filter.key ? "chevron-up" : "chevron-down"}
                                size={iconSize}
                                color="white"
                            />
                        </Pressable>

                        {/* Dropdown menu */}
                        {openMenu === filter.key && (
                            <View
                                className="absolute left-0 rounded-lg p-2"
                                style={{
                                    minWidth: minTriggerWidth,
                                    top: triggerHeight + 4,
                                    backgroundColor: "#3a3a3a",
                                    zIndex: 1100,
                                    elevation: 1100,
                                }}
                            >
                                {optionsMap[filter.key].map((option) => {
                                    const isSelected = selectedMap[filter.key] === option;
                                    return (
                                        <Pressable
                                            key={`${filter.key}-${option}`}
                                            onPress={() => onSelect(filter.key, option)}
                                            className={`
                        mb-1.5 flex-row items-center justify-between
                        rounded-lg px-3
                        ${isLargeTablet ? "py-4" : isTablet ? "py-3" : "py-2"}
                        ${isSelected ? "bg-[#4a4a4a]" : ""}
                      `}
                                        >
                                            <Text className={`text-white font-bold ${optionSize}`}>
                                                {option}
                                            </Text>
                                            {isSelected && (
                                                <Ionicons
                                                    name="checkmark"
                                                    size={checkSize}
                                                    color="#fcd34d"
                                                />
                                            )}
                                        </Pressable>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                </View>
            ))}
        </View>
    )
}