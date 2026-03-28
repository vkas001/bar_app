import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { BarTab } from '../types/barTab.types'

interface Props {
    tabs: BarTab[]
}

export default function TabInfo({ tabs }: Props) {
    const activeCount = tabs.filter(t => t.status === "active").length;
    const totalAmount = tabs.reduce((sum, t) => sum + t.total, 0);

    return (
        <View className="flex-row items-center gap-2">

            <View className='flex-row items-center gap-1 rounded-lg bg-card px-3 py-1.5'>
                <Ionicons name="bulb" size={18} color="yellow" />

                <Text className="text-base text-zinc-200">
                    Active: {activeCount}
                </Text>
            </View>

            <View className='flex-row items-center gap-1 rounded-lg bg-card px-3 py-1.5'>
                <Ionicons name="cash" size={18} color="green" />

                <Text className="text-base text-white">
                    Total: Rs. {totalAmount.toLocaleString('en-IN')}
                </Text>
            </View>
        </View>
    )
}