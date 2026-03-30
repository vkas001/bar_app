import { useBarTabs } from '@/modules/barTabs/hook/useBarTabs'
import { BarTabStatus } from '@/modules/barTabs/types/barTab.types'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Pressable, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'

const statusColors: Record<BarTabStatus, { bg: string; text: string }> = {
    active: { bg: '#16351f', text: '#86efac' },
    closed: { bg: '#2d2d2d', text: '#d4d4d8' },
    suspended: { bg: '#4c1d1d', text: '#fca5a5' },
}

const useResponsive = () => {
    const { width, height } = useWindowDimensions()
    const isTablet = width >= 768
    const isLargeTablet = width >= 1024
    const isLandscape = width > height
    return { isTablet, isLargeTablet, isLandscape }
}

export default function BarCard() {
    const router = useRouter()
    const { isTablet, isLargeTablet } = useResponsive()
    const { tabs, loading } = useBarTabs()  // ← real data

    const activeCount = tabs.filter((tab) => tab.status === 'active').length
    const totalAmount = tabs.reduce((sum, tab) => sum + tab.total, 0)
    const recentCount = isLargeTablet ? 3 : isTablet ? 2 : 1
    const recentActiveTabs = tabs.filter((tab) => tab.status === 'active').slice(0, recentCount)

    const cardPadding = isLargeTablet ? 'p-6' : isTablet ? 'p-5' : 'p-4'
    const headerIconSize = isLargeTablet ? 28 : isTablet ? 26 : 24
    const headerTextSize = isLargeTablet ? 'text-2xl' : isTablet ? 'text-xl' : 'text-lg'
    const viewAllTextSize = isLargeTablet ? 'text-lg' : isTablet ? 'text-base' : 'text-base'
    const statIconSize = isLargeTablet ? 24 : isTablet ? 22 : 20
    const statLabelSize = isLargeTablet ? 'text-base' : isTablet ? 'text-sm' : 'text-sm'
    const statValueSize = isLargeTablet ? 'text-4xl' : isTablet ? 'text-3xl' : 'text-3xl'
    const totalValueSize = isLargeTablet ? 'text-3xl' : isTablet ? 'text-2xl' : 'text-2xl'
    const sectionTitle = isLargeTablet ? 'text-2xl' : isTablet ? 'text-xl' : 'text-xl'
    const avatarSize = isLargeTablet ? 'h-16 w-16' : isTablet ? 'h-15 w-15' : 'h-14 w-14'
    const avatarText = isLargeTablet ? 'text-2xl' : isTablet ? 'text-xl' : 'text-xl'
    const tabNameSize = isLargeTablet ? 'text-xl' : isTablet ? 'text-lg' : 'text-lg'
    const tabIdSize = isLargeTablet ? 'text-base' : isTablet ? 'text-sm' : 'text-sm'
    const tabAmountSize = isLargeTablet ? 'text-xl' : isTablet ? 'text-lg' : 'text-lg'
    const tabStatusSize = isLargeTablet ? 'text-base' : isTablet ? 'text-sm' : 'text-sm'
    const showMoreSize = isLargeTablet ? 'text-xl' : isTablet ? 'text-lg' : 'text-lg'
    const sectionMx = isLargeTablet ? 'mx-6' : isTablet ? 'mx-5' : 'mx-4'
    const sectionMb = isLargeTablet ? 'mb-8' : isTablet ? 'mb-6' : 'mb-6'
    const tabListClass = isTablet ? 'flex-row flex-wrap gap-4 mt-4' : 'flex-col gap-3 mt-4'
    const tabCardClass = isLargeTablet ? 'w-[31%]' : isTablet ? 'w-[48%]' : 'w-full'

    return (
        <View className='flex-1 bg-zinc-900 rounded-lg mb-4'>

            {/* Header */}
            <View className={`flex-row items-center gap-4 ${cardPadding}`}>
                <Ionicons name="wine" size={headerIconSize} color="white" />
                <Text className={`ml-2 font-medium text-white ${headerTextSize}`}>
                    Bar Tabs
                </Text>
                <Pressable
                    onPress={() => router.push('/barTabs')}
                    className='ml-auto flex-row items-center gap-1'
                >
                    <Text className={`text-yellow font-bold ${viewAllTextSize}`}>View All</Text>
                    <Ionicons name='chevron-forward' size={isLargeTablet ? 22 : 18} color='yellow' />
                </Pressable>
            </View>

            {loading ? (
                <View className='py-10 items-center justify-center'>
                    <ActivityIndicator size="large" color="#facc15" />
                </View>
            ) : (
                <>
                    {/* Stat cards */}
                    <View className='pb-5'>
                        <View className='w-[90%] self-center flex-row justify-between'>
                            <View className='w-[48%] rounded-xl bg-black p-4'>
                                <View className='flex-row items-center gap-2'>
                                    <Ionicons name='time-outline' size={statIconSize} color='green' />
                                    <Text className={`font-semibold text-zinc-300 ${statLabelSize}`}>
                                        Active Tabs
                                    </Text>
                                </View>
                                <Text className={`mt-2 font-bold text-white ${statValueSize}`}>
                                    {activeCount}
                                </Text>
                            </View>

                            <View className='w-[48%] rounded-xl bg-black p-4'>
                                <View className='flex-row items-center gap-2'>
                                    <Ionicons name='cash' size={statIconSize} color='green' />
                                    <Text className={`font-semibold text-zinc-300 ${statLabelSize}`}>
                                        Total Amount
                                    </Text>
                                </View>
                                <Text className={`mt-2 font-bold text-white ${totalValueSize}`}>
                                    Rs. {totalAmount.toLocaleString('en-IN')}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Recent Active Tabs */}
                    <View className={`${sectionMx} ${sectionMb}`}>
                        <Text className={`text-white font-bold ${sectionTitle}`}>
                            Recent Active Tabs
                        </Text>

                        <View className={tabListClass}>
                            {recentActiveTabs.length === 0 ? (
                                <Text className='mt-4 text-base text-zinc-400'>No active tabs.</Text>
                            ) : (
                                recentActiveTabs.map((tab) => {
                                    const initial = tab.customerName.trim().charAt(0).toUpperCase() || '?'
                                    const tabStatus = statusColors[tab.status]

                                    return (
                                        <View
                                            key={tab.id}
                                            className={`flex-row items-center rounded-xl bg-black px-4 py-4 ${tabCardClass}`}
                                        >
                                            <View
                                                className={`shrink-0 items-center justify-center bg-yellow ${avatarSize}`}
                                                style={{ borderRadius: 999 }}
                                            >
                                                <Text className={`font-bold text-black ${avatarText}`}>
                                                    {initial}
                                                </Text>
                                            </View>

                                            <View className='ml-4 flex-1'>
                                                <Text numberOfLines={1} className={`text-white ${tabNameSize}`}>
                                                    {tab.customerName}
                                                </Text>
                                                <Text className={`text-zinc-400 ${tabIdSize}`}>
                                                    Tab #{tab.id}
                                                </Text>
                                            </View>

                                            <View className='items-end'>
                                                <Text className={`font-bold text-white ${tabAmountSize}`}>
                                                    Rs. {tab.total.toLocaleString('en-IN')}
                                                </Text>
                                                <View
                                                    className='mt-1 rounded-full px-2 py-1'
                                                    style={{ backgroundColor: tabStatus.bg }}
                                                >
                                                    <Text
                                                        className={`font-semibold capitalize ${tabStatusSize}`}
                                                        style={{ color: tabStatus.text }}
                                                    >
                                                        {tab.status}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            )}
                        </View>

                        <TouchableOpacity
                            onPress={() => router.push('/barTabs')}
                            className='mt-4 self-center flex-row items-center justify-center gap-1'
                        >
                            <Text className={`text-yellow font-bold ${showMoreSize}`}>Show More</Text>
                            <Ionicons name='chevron-forward' size={isLargeTablet ? 22 : 18} color='yellow' />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    )
}