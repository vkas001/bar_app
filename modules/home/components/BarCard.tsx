import { barTabs } from '@/modules/barTabs/data/barTab.data'
import { BarTabStatus } from '@/modules/barTabs/types/barTab.types'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'

const statusColors: Record<BarTabStatus, { bg: string; text: string }> = {
    active: { bg: '#16351f', text: '#86efac' },
    closed: { bg: '#2d2d2d', text: '#d4d4d8' },
    suspended: { bg: '#4c1d1d', text: '#fca5a5' },
}

export default function BarCard() {
    const router = useRouter()
    const activeCount = barTabs.filter((tab) => tab.status === 'active').length
    const totalAmount = barTabs.reduce((sum, tab) => sum + tab.total, 0)
    const recentActiveTabs = barTabs.filter((tab) => tab.status === 'active').slice(0, 1)

    return (
        <View className='flex-1 bg-zinc-900 rounded-lg mb-4'>

            <View className='flex-row items-center gap-4 p-4'>
                <Ionicons name="wine" size={24} color="white" />
                <Text className='ml-2 text-lg font-medium text-white'>
                    Bar Tabs
                </Text>
                <Pressable
                    onPress={() => router.push('/barTabs')}
                    className='ml-auto flex-row items-center gap-1'
                >
                    <Text className='text-yellow font-bold text-base'>
                        View All
                    </Text>
                    <Ionicons name='chevron-forward' size={18} color='yellow' />
                </Pressable>
            </View>

            <View className='pb-5'>
                <View className='w-[90%] self-center flex-row justify-between'>
                    <View className='w-[48%] rounded-xl bg-black p-4'>
                        <View className='flex-row items-center gap-2'>
                            <Ionicons name='time-outline' size={20} color='green' />
                            <Text className='text-sm font-semibold text-zinc-300'>Active Tabs</Text>
                        </View>
                        <Text className='mt-2 text-3xl font-bold text-white'>
                            {activeCount}
                        </Text>
                    </View>

                    <View className='w-[48%] rounded-xl bg-black p-4'>
                        <View className='flex-row items-center gap-2'>
                            <Ionicons name='cash' size={20} color='green' />
                            <Text className='text-sm font-semibold text-zinc-300'>Total Amount</Text>
                        </View>
                        <Text className='mt-2 text-2xl font-bold text-white'>
                            Rs. {totalAmount}
                        </Text>
                    </View>
                </View>
            </View>
            <View className='ml-8 mr-8 mb-8'>
                <View className='flex-row items-center justify-between'>
                    <Text className='text-white font-bold text-xl'>
                        Recent Active Tabs
                    </Text>

                </View>
                <View className='flex-row gap-4 mt-4'>
                    {recentActiveTabs.map((tab) => {
                        const initial = tab.customerName.trim().charAt(0).toUpperCase() || '?'
                        const tabStatus = statusColors[tab.status]

                        return (
                            <View
                                key={tab.id}
                                className='w-[80%] flex-row items-center rounded-xl bg-black px-4 py-4'
                            >
                                <View
                                    className='h-14 w-14 shrink-0 items-center justify-center rounded-full bg-yellow'
                                    style={{ borderRadius: 999 }}
                                >
                                    <Text className='text-xl font-bold text-black'>{initial}</Text>
                                </View>

                                <View className='ml-4 flex-1'>
                                    <Text numberOfLines={1} className='text-xl text-white'>
                                        {tab.customerName}
                                    </Text>
                                    <Text className='text-base text-zinc-400'>
                                        Tab #{tab.id}
                                    </Text>

                                </View>


                                <View className='items-end'>
                                    <Text className='text-xl font-bold text-white'>
                                        Rs. {tab.total}
                                    </Text>
                                    <View
                                        className='mt-1 rounded-full px-2 py-1'
                                        style={{ backgroundColor: tabStatus.bg }}
                                    >
                                        <Text className='text-lg font-semibold capitalize'
                                            style={{ color: tabStatus.text }}
                                        >
                                            {tab.status}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                        )
                    })}
                    <TouchableOpacity
                        onPress={() => router.push('/barTabs')}
                        className='mt-4 self-center flex-row items-center justify-center gap-1'
                    >
                        <Text className='text-yellow font-bold text-lg'>
                            Show More
                        </Text>
                        <Ionicons name='chevron-forward' size={18} color='yellow' />
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    )
}