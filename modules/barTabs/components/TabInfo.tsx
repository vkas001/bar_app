import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'

export default function TabInfo() {
    return (
        <View className="flex-row items-center gap-2">

            <View className='flex-row items-center gap-1 rounded-lg bg-card px-3 py-1.5'>
                <Ionicons name="alert" size={18} color="yellow" />

                <Text className="text-base text-zinc-200">
                    Active: 2
                </Text>
            </View>

            <View className='flex-row items-center gap-1 rounded-lg bg-card px-3 py-1.5'>
                <Ionicons name="cash" size={18} color="green" />

                <Text className="text-base text-white">
                    Total: Rs. 27180
                </Text>
            </View>
        </View>
    )
}