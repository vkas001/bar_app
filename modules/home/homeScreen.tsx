import React from 'react'
import { View } from 'react-native'
import { BarTab } from '../barTabs/types/barTab.types'
import { order } from '../orders/types/order.types'
import BarCard from './components/BarCard'
import ViewReservation from './components/ViewReservation'

interface HomeScreenProps {
    orders: order[]
    ordersLoading: boolean
    ordersError: string | null
    refetchOrders: () => Promise<void>
    tabs: BarTab[]
    tabsLoading: boolean
    tabsError: string | null
    refreshBarTabs: () => Promise<void>
}

export default function HomeScreen({
    orders,
    ordersLoading,
    ordersError,
    refetchOrders,
    tabs,
    tabsLoading,
    tabsError,
    refreshBarTabs,
}: HomeScreenProps) {
    return (
        <View className='mx-2 gap-4'>
            <BarCard
                tabs={tabs}
                loading={tabsLoading}
                error={tabsError}
                onRetry={refreshBarTabs}
            />
            <ViewReservation
                orders={orders}
                loading={ordersLoading}
                error={ordersError}
                refetch={refetchOrders}
            />
        </View>
    )
}