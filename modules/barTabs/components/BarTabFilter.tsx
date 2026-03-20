import AppInput from '@/components/input'
import { Ionicons } from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { BarTabStatus } from '../types/barTab.types'

interface BarTabFilterProps {
    onPressNewTab: () => void
}

export default function BarTabFilter({ onPressNewTab }: BarTabFilterProps) {
    const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<'all' | BarTabStatus>('all')

    const statusOptions: Array<'all' | BarTabStatus> = ['all', 'active', 'closed', 'suspended']

    const selectedStatusLabel = useMemo(() => {
        if (selectedStatus === 'all') return 'All Status'
        return selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)
    }, [selectedStatus])

    return (
        <View className='w-full flex-row items-center gap-2 px-4 py-3' 
        style={{ zIndex: 20, elevation: 20 }}
        >
            <AppInput
                containerClassName='mb-0 flex-1'
                inputClassName='h-14'
                inputTextClassName='text-base'
                placeholder='Search by name or phone...'
                leftIcon={<Ionicons name='search' size={24} color='rgba(255,255,255,0.45)' />}
            />
            <View className='h-14 w-14 items-center justify-center rounded-lg bg-card'>
                <Ionicons name="filter" size={24} color="white" />
            </View>
            <View className='relative'>
                <Pressable
                    accessibilityRole='button'
                    onPress={() => setIsStatusMenuOpen((prev) => !prev)}
                    className='h-14 flex-row items-center gap-3 rounded-lg bg-card px-5'
                    style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
                >
                    <Text className='text-base font-semibold text-white'>
                        {selectedStatusLabel}
                    </Text>
                    <Ionicons name={isStatusMenuOpen ? 'chevron-up' : 'chevron-down'} size={24} color="white" />
                </Pressable>

                {isStatusMenuOpen ? (
                    <View
                        className='absolute right-0 top-16 min-w-[170px] rounded-lg bg-card p-2'
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
                                    }}
                                    className='mb-1 flex-row items-center justify-between rounded-md px-3 py-2.5'
                                    style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                                >
                                    <Text className='text-base text-white'>
                                        {label}
                                    </Text>
                                    {isSelected ? (
                                        <Ionicons name='checkmark' size={18} color='#fcd34d' />
                                    ) : null}
                                </Pressable>
                            )
                        })}
                    </View>
                ) : null}
            </View>
            <Pressable
                accessibilityRole='button'
                onPress={onPressNewTab}
                className='h-14 flex-row items-center justify-center gap-1 rounded-lg bg-yellow px-5'
                style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
            >
                <Ionicons name="add" size={24} color="black" />
                <Text className='text-base font-semibold text-black'>
                    New Tab
                </Text>
            </Pressable>

        </View>
    )
}