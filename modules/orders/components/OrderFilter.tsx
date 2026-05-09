import { useResponsive } from '@/shared/hooks/useResponsive'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, Modal, Pressable, Text, View } from 'react-native'
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
    type OpenMenuKey = FilterKey | 'all'
    type MenuPosition = {
        top: number
        left: number
        width: number
    }

    const {
        isPhone,
        isTablet,
        isLargeTablet,
        textSm,
        textBase,
        textLg,
        textXl,
        iconSm,
        iconMd,
        px,
        py,
        size,
    } = useResponsive()

    const [openMenu, setOpenMenu] = useState<OpenMenuKey | null>(null)
    const [triggerHeight, setTriggerHeight] = useState(40)
    const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null)
    const triggerRefs = useRef<Partial<Record<FilterKey, any>>>({})

    const labelSize = isLargeTablet ? textXl : isTablet ? textLg : textBase
    const valueSize = isLargeTablet ? textLg : isTablet ? textBase : textSm
    const optionSize = isLargeTablet ? textXl : isTablet ? textLg : textBase
    const iconSize = isLargeTablet ? iconMd : iconSm
    const checkSize = isLargeTablet ? 22 : isTablet ? 20 : 18
    const minTriggerWidth = isLargeTablet ? 180 : isTablet ? 150 : 120
    const triggerPx = isLargeTablet ? 'px-8' : isTablet ? 'px-4' : 'px-2'
    const triggerPy = isLargeTablet ? 'py-3' : 'py-2'
    const optionPy = isLargeTablet ? 'py-4' : isTablet ? 'py-2' : 'py-2'
    const tabletGap = isLargeTablet ? 'gap-6' : 'gap-4'

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
            ...Object.values(optionsMap).flat().map((o) => o.length)
        )
        return Math.max(130, longestOptionLength * 10 + 48)
    }, [optionsMap])

    const activeTabletMenu = openMenu !== null && openMenu !== 'all' ? openMenu : null

    useEffect(() => {
        if (!activeTabletMenu) {
            setMenuPosition(null)
            return
        }

        const frame = requestAnimationFrame(() => {
            triggerRefs.current[activeTabletMenu]?.measureInWindow((x: number, y: number, width: number, height: number) => {
                setMenuPosition({
                    left: x,
                    top: y + height + 25,
                    width,
                })
            })
        })

        return () => cancelAnimationFrame(frame)
    }, [activeTabletMenu])

    // Phone: each filter is a full-width row (label left, dropdown right) 
    if (isPhone) {
        return (
            <View
                className={`w-full ${px} ${py}`}
                style={{ zIndex: 1000, elevation: 1000, gap: size.padding.md }}
            >
                {/* Single Filter trigger */}
                <Pressable
                    onPress={() => setOpenMenu((prev) => (prev === null ? 'all' : null))}
                    onLayout={(e) => setTriggerHeight(e.nativeEvent.layout.height)}
                    className={`flex-row items-center justify-between rounded-lg border${triggerPx} ${triggerPy}`}
                    style={{ backgroundColor: '#3a3a3a' }}
                >
                    <Text className={`font-bold text-white ${labelSize}`}>Filter</Text>
                    <Ionicons
                        name={openMenu !== null ? 'chevron-up' : 'chevron-down'}
                        size={iconSize}
                        color="white"
                    />
                </Pressable>

                {/* All 3 filter rows — visible when openMenu*/}
                {openMenu !== null && filterConfigs.map((filter) => (
                    <View key={filter.key} className='relative w-full flex-row items-center gap-8'>

                        <View className='w-[40%]'>
                            <Text className={`font-bold text-white ${labelSize}`}>
                                {filter.label}:
                            </Text>
                        </View>

                        <View className='relative flex-1 ml-8'>
                            <Pressable
                                onPress={() => setOpenMenu((prev) => (prev === filter.key ? 'all' : filter.key))}
                                onLayout={(e) => setTriggerHeight(e.nativeEvent.layout.height)}
                                className={`w-full flex-row items-center justify-between rounded-lg ${triggerPx} ${triggerPy}`}
                                style={{ backgroundColor: '#3a3a3a' }}
                            >
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                    className={`flex-1 font-bold text-white ${valueSize}`}
                                    style={{ marginRight: size.padding.sm }}
                                >
                                    {selectedMap[filter.key]}
                                </Text>
                                <Ionicons
                                    name={openMenu === filter.key ? 'chevron-up' : 'chevron-down'}
                                    size={iconSize}
                                    color='white'
                                />
                            </Pressable>

                            {openMenu === filter.key && (
                                <View
                                    style={{ position: 'absolute', left: 0, right: 0, top: triggerHeight + 4, zIndex: 1100, elevation: 1100 }}
                                    onStartShouldSetResponderCapture={() => true}
                                    onMoveShouldSetResponderCapture={() => true}
                                >
                                    <FlatList
                                        data={optionsMap[filter.key]}
                                        keyExtractor={(option) => `${filter.key}-${option}`}
                                        nestedScrollEnabled
                                        scrollEnabled
                                        showsVerticalScrollIndicator
                                        style={{ maxHeight: isLargeTablet ? 320 : isTablet ? 260 : 200, backgroundColor: '#3a3a3a', borderRadius: 8 }}
                                        contentContainerStyle={{ paddingVertical: 4, paddingHorizontal: 8 }}
                                        renderItem={({ item: option }) => {
                                            const isSelected = selectedMap[filter.key] === option
                                            return (
                                                <Pressable
                                                    onPress={() => {
                                                        onSelect(filter.key, option)
                                                        setOpenMenu('all')
                                                    }}
                                                    className={`mb-1 flex-row items-center justify-between rounded-lg px-3 ${optionPy} ${isSelected ? 'bg-[#4a4a4a]' : ''}`}
                                                >
                                                    <Text className={`font-bold text-white ${optionSize}`}>
                                                        {option}
                                                    </Text>
                                                    {isSelected && (
                                                        <Ionicons name='checkmark' size={checkSize} color='#fcd34d' />
                                                    )}
                                                </Pressable>
                                            )
                                        }}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        )
    }

    // Tablet: all three filters in one row
    return (
        <View
            className={` flex-row items-center ${px} ${py} ${tabletGap}`}
            style={{ zIndex: 1000, elevation: 1000 }}
        >
            {filterConfigs.map((filter) => (
                <View key={filter.key} className='flex-1 flex-row items-center'
                    style={{ gap: 4 }}
                >

                    <Text className={` text-white ${labelSize}`}>
                        {filter.label}:
                    </Text>

                    <View className='relative flex-1'>
                        <Pressable
                            ref={(node) => {
                                triggerRefs.current[filter.key] = node
                            }}
                            onPress={() => setOpenMenu((prev) => (prev === filter.key ? null : filter.key))}
                            onLayout={(e) => setTriggerHeight(e.nativeEvent.layout.height)}
                            className={` flex-row items-center rounded-lg border ${triggerPx} ${triggerPy}`}
                            style={{ backgroundColor: '#3a3a3a' }}
                        >
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                className={`flex-1 font-bold text-white ${valueSize}`}
                                style={{ marginRight: size.padding.sm }}
                            >
                                {selectedMap[filter.key]}
                            </Text>
                            <Ionicons
                                name={openMenu === filter.key ? 'chevron-up' : 'chevron-down'}
                                size={iconSize}
                                color='white'
                            />
                        </Pressable>

                    </View>
                </View>
            ))}

            <Modal transparent visible={activeTabletMenu !== null && menuPosition !== null}
                animationType="fade"
                onRequestClose={() => setOpenMenu(null)}
            >
                <Pressable style={{ flex: 1 }} onPress={() => setOpenMenu(null)}>
                    {activeTabletMenu && menuPosition && (
                        <View
                            style={{
                                position: 'absolute',
                                top: menuPosition.top,
                                left: menuPosition.left,
                                width: menuPosition.width,
                                maxHeight: isLargeTablet ? 320 : isTablet ? 260 : 200,
                                backgroundColor: '#3a3a3a',
                                borderRadius: 8,
                                zIndex: 2000,
                                elevation: 2000,
                            }}
                        >
                            <FlatList
                                data={optionsMap[activeTabletMenu]}
                                keyExtractor={(option) => `${activeTabletMenu}-${option}`}
                                nestedScrollEnabled
                                scrollEnabled
                                showsVerticalScrollIndicator
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={{ paddingVertical: 4, paddingHorizontal: 8 }}
                                renderItem={({ item: option }) => {
                                    const isSelected = selectedMap[activeTabletMenu] === option
                                    return (
                                        <Pressable
                                            onPress={() => onSelect(activeTabletMenu, option)}
                                            className={`mb-1 flex-row items-center justify-between rounded-lg px-3 ${optionPy} ${isSelected ? 'bg-[#4a4a4a]' : ''}`}
                                        >
                                            <Text className={`text-sm text-white ${optionSize}`}>
                                                {option}
                                            </Text>
                                            {isSelected && (
                                                <Ionicons name='checkmark' size={checkSize} color='#fcd34d' />
                                            )}
                                        </Pressable>
                                    )
                                }}
                            />
                        </View>
                    )}
                </Pressable>
            </Modal>
        </View>
    )
}