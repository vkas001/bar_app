import { useResponsive } from '@/shared/hooks/useResponsive'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { BarTab } from '../types/barTab.types'

interface Props {
    tabs: BarTab[]
}

export default function TabInfo({ tabs }: Props) {
    const activeCount = tabs.filter(t => t.status === "active").length
    const totalAmount = tabs.reduce((sum, t) => sum + t.total, 0)

    const { isSmallPhone, isTablet, isLargeTablet, textSm, textBase, iconSm, size } = useResponsive()

    const badgePx = isLargeTablet ? 'px-4' : isTablet ? 'px-0.5' : isSmallPhone ? 'px-' : 'px-3'
    const badgePy = isLargeTablet ? 'py-2' : 'py-1'

    return (
        <View className="flex-row items-center gap-2">

            <View
                className={`flex-row items-center rounded-lg bg-card ${badgePx} ${badgePy}`}
                style={{ gap: size.padding.sm }}
            >
                <Ionicons name="bulb" size={iconSm} color="yellow" />
                <Text className={`text-zinc-200 ${isSmallPhone ? textSm : textBase}`}>
                    Active: {activeCount}
                </Text>
            </View>

            <View
                className={`flex-row items-center rounded-lg bg-card ${badgePx} ${badgePy}`}
                style={{ gap: size.padding.sm }}
            >
                <Ionicons name="cash" size={iconSm} color="green" />
                <Text className={`text-white ${isSmallPhone ? textSm : textBase}`}>
                    {isSmallPhone ? `Rs. ${totalAmount.toLocaleString('en-IN')}` : `Total: Rs. ${totalAmount.toLocaleString('en-IN')}`}
                </Text>
            </View>

        </View>
    )
}