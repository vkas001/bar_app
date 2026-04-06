import AppInput from '@/components/input'
import { useResponsive } from '@/shared/hooks/useResponsive'
import { Ionicons } from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { BarTabStatus } from '../types/barTab.types'

interface BarTabFilterProps {
    onPressNewTab: () => void
    onSearchChange: (text: string) => void
    onstatusCchange: (status: 'all' | BarTabStatus) => void
}

export default function BarTabFilter({
    onPressNewTab,
    onSearchChange,
    onstatusCchange
}: BarTabFilterProps) {
    const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<'all' | BarTabStatus>('all')

    const {
        isTablet,
        isLargeTablet,
        isSmallPhone,
        textBase,
        textSm,
        iconSm,
        iconMd,
        size,
    } = useResponsive()

    const statusOptions: Array<'all' | BarTabStatus> = ['all', 'active', 'closed', 'suspended']

    const selectedStatusLabel = useMemo(() => {
        if (selectedStatus === 'all') return isSmallPhone ? 'All' : 'All Status'
        return selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)
    }, [selectedStatus, isSmallPhone])

    // Responsive sizing
    const btnHeight = isLargeTablet ? 'h-16' : isTablet ? 'h-15' : 'h-14'
    const btnPx = isLargeTablet ? 'px-6' : isTablet ? 'px-5' : isSmallPhone ? 'px-3' : 'px-4'
    const iconBtnSize = isLargeTablet ? 'h-16 w-16' : isTablet ? 'h-15 w-15' : 'h-14 w-14'
    const dropdownWidth = isSmallPhone ? 'min-w-[140px]' : 'min-w-[170px]'

    return (
        <View
            className='w-full flex-row items-center gap-2 px-4 py-3'
            style={{ zIndex: 20, elevation: 20 }}
        >
            {/* Search Input */}
            <AppInput
                containerClassName='mb-0 flex-1'
                inputClassName={btnHeight}
                inputTextClassName={textBase}
                placeholder={isSmallPhone ? 'Search...' : 'Search by name or phone...'}
                onChangeText={onSearchChange}
                leftIcon={<Ionicons name='search' size={iconMd} color='rgba(255,255,255,0.45)' />}
            />

            {/* Filter Icon Button */}
            <View className={`${iconBtnSize} items-center justify-center rounded-lg bg-card`}>
                <Ionicons name="filter" size={iconMd} color="white" />
            </View>

            {/* Status Dropdown */}
            <View className='relative'>
                <Pressable
                    accessibilityRole='button'
                    onPress={() => setIsStatusMenuOpen((prev) => !prev)}
                    className={`${btnHeight} flex-row items-center rounded-lg bg-card ${btnPx}`}
                    style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, gap: size.padding.sm })}
                >
                    <Text className={`font-semibold text-white ${isSmallPhone ? textSm : textBase}`}>
                        {selectedStatusLabel}
                    </Text>
                    <Ionicons
                        name={isStatusMenuOpen ? 'chevron-up' : 'chevron-down'}
                        size={iconSm}
                        color="white"
                    />
                </Pressable>

                {isStatusMenuOpen && (
                    <View
                        className={`absolute right-0 top-16 ${dropdownWidth} rounded-lg bg-card p-2`}
                        style={{ zIndex: 30, elevation: 30 }}
                    >
                        {statusOptions.map((status) => {
                            const label = status === 'all'
                                ? 'All Status'
                                : status.charAt(0).toUpperCase() + status.slice(1)
                            const isSelected = selectedStatus === status

                            return (
                                <Pressable
                                    key={status}
                                    onPress={() => {
                                        setSelectedStatus(status)
                                        setIsStatusMenuOpen(false)
                                        onstatusCchange(status)
                                    }}
                                    className='mb-1 flex-row items-center justify-between rounded-md px-3 py-2.5'
                                    style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                                >
                                    <Text className={`text-white ${textBase}`}>{label}</Text>
                                    {isSelected && (
                                        <Ionicons name='checkmark' size={iconSm} color='#fcd34d' />
                                    )}
                                </Pressable>
                            )
                        })}
                    </View>
                )}
            </View>

            {/* New Tab Button */}
            <Pressable
                accessibilityRole='button'
                onPress={onPressNewTab}
                className={`${btnHeight} flex-row items-center justify-center rounded-lg bg-yellow ${btnPx}`}
                style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, gap: size.padding.sm })}
            >
                <Ionicons name="add" size={iconMd} color="black" />
                {/* Hide "New Tab" text on small phones, show only icon */}
                {!isSmallPhone && (
                    <Text className={`font-semibold text-black ${textBase}`}>
                        New Tab
                    </Text>
                )}
            </Pressable>
        </View>
    )
}