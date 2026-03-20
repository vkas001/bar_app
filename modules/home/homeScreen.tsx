import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { barTabs } from '../barTabs/data/barTab.data'

export default function HomeScreen() {
    const router = useRouter()
    const activeCount = barTabs.filter((tab) => tab.status === 'active').length
    const totalAmount = barTabs.reduce((sum, tab) => sum + tab.total, 0)

    return (
        <View className='flex-1 bg-card rounded-lg'>

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

            <View className='px-4 pb-4'>
                <View className='flex-row gap-2'>
                    <View className='flex-row items-center gap-1 rounded-lg bg-black/20 px-3 py-2'>
                        <Ionicons name='alert' size={16} color='yellow' />
                        <Text className='text-zinc-200'>
                            Active: {activeCount}
                        </Text>
                    </View>

                    <View className='flex-row items-center gap-1 rounded-lg bg-black/20 px-3 py-2'>
                        <Ionicons name='cash' size={16} color='green' />
                        <Text className='text-white'>
                            Total: Rs. {totalAmount}
                        </Text>
                    </View>
                </View>
            </View>

        </View>
    )
}